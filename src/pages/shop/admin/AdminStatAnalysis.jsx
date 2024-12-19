import React, {useEffect, useState} from 'react';
import Chart from "../../../components/common/Chart";
import instance from "../../../utils/axios";
import NextPrevButton from "../../../components/common/NextPrevButton";
import StatAnalysisTable from "../../../components/shop/admin/StatAnalysisTable";
import AdminMenu from "../../../components/shop/admin/AdminMenu";
import "../../../assets/styles/shop/admin/statAnalysisTable.scss"
import Title from "../../../components/common/Title";

const AdminStatAnalysis = () => {

    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());

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
        });
    }, [year, month, isDaySum]);

    useEffect(() => {
        const url = isDaySum?`/point/day-sum-seller?year=${year}&month=${month}&day=${selectedIndex+1}`
            :`/point/month-sum-seller?year=${year}&month=${selectedIndex+1}`;
        instance({
            url:url,
            method:"GET",
        }).then((res) => {
            console.log("point",res);
            setSellerData(res.data);
            trimSellerData(res.data);
        })
    }, [selectedIndex]);

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
            data:points,
            categories:dates
        })
    }

    const trimSellerData = (data) => {
        data.sort(function (a, b) {
            return  a.point > b.point ? -1 : 1;
        })

        data.map((item) => {
            sellerPoints.push(item.point)
            sellerNames.push(item["sellerNickname"])
        })

        console.log("pas",sellerPoints,sellerNames)
        setTrimmedSellerData({
            series:sellerPoints,
            labels:sellerNames
        })
    }



    return (
        <div>
            <AdminMenu/>
            <Title>사이트 통계</Title>

            <div>
                <NextPrevButton value={year} setValue={setYear} start ={2024} stop={2024}/>
                <NextPrevButton value={month} setValue={setMonth} start ={1} stop={12}/>

                <button onClick={()=>setIsDaySum(false)}>월별</button>
                <button onClick={()=>setIsDaySum(true)}>일별</button>
            </div>

            {trimmedData && trimmedSellerData.series &&
                <Chart data={trimmedData?.data} categories={trimmedData?.categories}
                       series={trimmedSellerData?.series} labels={trimmedSellerData?.labels}
                       setSelectedIndex={setSelectedIndex}/>}

            {data &&sellerData&& <div className="stat-analysis-table">
                <StatAnalysisTable data={data} colName1="date" colName2="point"/>
                <StatAnalysisTable data={sellerData} colName1="sellerNickname" colName2="point"/>
            </div>
            }





        </div>
    );
};

export default AdminStatAnalysis;