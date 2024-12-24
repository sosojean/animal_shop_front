import React, {useEffect, useState} from 'react';
import Chart from "../../../components/common/Chart";
import instance from "../../../utils/axios";
import StatAnalysisTable from "../../../components/shop/admin/StatAnalysisTable";
import AdminMenu from "../../../components/shop/admin/AdminMenu";
import "../../../assets/styles/shop/admin/statAnalysisTable.scss"
import Title from "../../../components/common/Title";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import DefaultButton from "../../../components/common/DefaultButton";
import "../../../assets/styles/shop/admin/adminStatAnalysis.scss"

const AdminStatAnalysis = () => {

    const now = new Date();
    const [currentDate, setCurrentDate] = useState(new Date(now.getFullYear(), now.getMonth())); // 현재 연도를 기준으로 초기화

    const [data, setData] = useState([])
    const [sellerData, setSellerData] = useState([])
    const [firstDate, setFirstDate] = useState()

    const [trimmedData, setTrimmedData] = useState({})
    const [trimmedSellerData, setTrimmedSellerData] = useState({})
    const [isDaySum, setIsDaySum] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const dates=[];
    const points=[];

    const sellerPoints=[];
    const sellerNames=[];

    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const url = isDaySum
            ? `/point/day-sum-total?year=${year}&&month=${month}`
            : `/point/month-sum-total?year=${year}`;

        instance({
            url: url,
            method: "GET",
        }).then((res) => {
            console.log(res);
            const filledData = isDaySum
                ? fillMissingDates(res.data.pointTotalDTOList, year, month)
                : fillMissingMonths(res.data.pointTotalDTOList, year);
            setData(filledData);
            setFirstDate(res.data["first_date"]);
            trimData(filledData);
            setSelectedIndex(filledData.length-1);
        });
    }, [currentDate, isDaySum]);

    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const url = isDaySum
            ? `/point/day-sum-seller?year=${year}&month=${month}&day=${selectedIndex + 1}`
            : `/point/month-sum-seller?year=${year}&month=${selectedIndex + 1}`;

        instance({
            url: url,
            method: "GET",
        }).then((res) => {
            console.log("point", res);
            setSellerData(res.data);
            trimSellerData(res.data);
        });
    }, [selectedIndex, currentDate, isDaySum]);

    const fillMissingDates = (data, year, month) => {
        const now = new Date();
        const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1;
        const daysInMonth = isCurrentMonth ? now.getDate() : new Date(year, month, 0).getDate(); // 현재 달은 오늘까지만
        const dateMap = data.reduce((acc, item) => {
            acc[item.date] = item.point;
            return acc;
        }, {});

        const filledData = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            filledData.push({
                date: date,
                point: dateMap[date] || 0,
            });
        }
        return filledData;
    };

    const fillMissingMonths = (data, year) => {
        const now = new Date();
        const isCurrentYear = year === now.getFullYear();
        const currentMonth = isCurrentYear ? now.getMonth() + 1 : 12; // 현재 연도면 현재 월까지, 아니면 12월까지

        const monthMap = data.reduce((acc, item) => {
            const [itemYear, itemMonth] = item.date.split("-");
            if (parseInt(itemYear) === year) {
                acc[itemMonth] = item.point;
            }
            return acc;
        }, {});

        const filledData = [];
        for (let month = 1; month <= currentMonth; month++) {
            const monthString = `${year}-${String(month).padStart(2, "0")}`;
            filledData.push({
                date: monthString,
                point: monthMap[String(month).padStart(2, "0")] || 0,
            });
        }
        return filledData;
    };

    const trimData = (data) => {
        data.map((item) => {
            dates.push(item.date)
            points.push(item.point)
        })
        setTrimmedData({
            data: points,
            categories: dates
        });
    };

    const trimSellerData = (data) => {
        data.sort(function (a, b) {
            return a.point > b.point ? -1 : 1;
        });

        data.map((item) => {
            sellerPoints.push(item.point);
            sellerNames.push(item["sellerNickname"]);
        });

        console.log("pas", sellerPoints, sellerNames);
        setTrimmedSellerData({
            series: sellerPoints,
            labels: sellerNames
        });
    };

    const handlePrev = () => {
        const newDate = new Date(currentDate);
        if (isDaySum) {
            newDate.setMonth(currentDate.getMonth() - 1);
        } else {
            newDate.setFullYear(currentDate.getFullYear() - 1);
        }
        setCurrentDate(newDate);
    };

    const handleNext = () => {
        const now = new Date();
        const newDate = new Date(currentDate);
        if (isDaySum) {
            newDate.setMonth(currentDate.getMonth() + 1);
        } else {
            newDate.setFullYear(currentDate.getFullYear() + 1);
        }
        if (isDaySum) {
            if (newDate <= new Date(now.getFullYear(), now.getMonth())) {
                setCurrentDate(newDate);
            }
        } else {
            if (newDate.getFullYear() <= now.getFullYear()) {
                setCurrentDate(newDate);
            }
        }
    };

    return (
        <div className="admin-stat-analysis">
            <AdminMenu/>
            <Title>사이트 통계</Title>

            <div className="admin-table-controller">
                <div className="row">
                    <DefaultButton className={isDaySum?"default lg":"selected lg primary"} onClick={() => setIsDaySum(false)}>연간</DefaultButton>
                    <DefaultButton className={!isDaySum?"default lg":"selected lg primary"} onClick={() => setIsDaySum(true)}>월간</DefaultButton>
                </div>
                <div className="row">
                    <button className={"prev-next"} onClick={handlePrev}><FontAwesomeIcon icon={faAngleLeft}/></button>
                    <div className="date-container">
                    <span>{isDaySum ? `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월` : `${currentDate.getFullYear()}년`}</span>
                    </div>
                    <button className={"prev-next"} onClick={handleNext}><FontAwesomeIcon icon={faAngleRight}/></button>
                </div>
            </div>
            {trimmedData && trimmedSellerData.series &&
                <Chart data={trimmedData?.data} categories={trimmedData?.categories}
                       series={trimmedSellerData?.series} labels={trimmedSellerData?.labels}
                       setSelectedIndex={setSelectedIndex}/>}

            {data && sellerData && <div className="stat-analysis-table">
                <StatAnalysisTable data={data} colName1="date" colName2="point"/>
                {sellerData.length<1?
                    <div className={"table-contents"} >
                        <span className={"no-contents"}>
                            선택 시점의 데이터가 없습니다.
                        </span>
                    </div>
                    :<StatAnalysisTable data={sellerData} colName1="sellerNickname" colName2="point"/>}
            </div>
            }

        </div>
    );
};

export default AdminStatAnalysis;
