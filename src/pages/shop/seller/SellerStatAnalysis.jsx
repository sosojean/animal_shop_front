import React, { useEffect, useState } from "react";
import SellerChart from "../../../components/shop/seller/SellerChart";
import TestComp from "./testComp";
import SellerAnalysisTable from "../../../components/shop/seller/SellerAnalysisTable";
import SellerItemAnalysisTable from "../../../components/shop/seller/SellerItemAnalysisTable";
import instance from "../../../utils/axios";
import "../../../assets/styles/shop/seller/sellerStatAnalysis.scss"

const SellerStatAnalysis = () => {
    const now = new Date();
    const [from, setFrom] = useState({
        year: now.getFullYear() - (now.getMonth() + 1 === 12 ? 0 : 1),
        month: now.getMonth() + 1 === 12 ? 1 : now.getMonth() + 1,
        day: 1,
    });
    const [to, setTo] = useState({
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
    });

    const generateDateList = () => {
        const startDate = new Date(from.year, from.month - 1);
        const endDate = new Date(to.year, to.month - 1);
        const dateList = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                .toString()
                .padStart(2, "0")}`;
            dateList.push(formattedDate);
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return dateList;
    };

    const [selectedIndex, setSelectedIndex] = useState(11);
    const [itemData, setItemData] = useState();
    const [cartData, setCartData] = useState();
    const [dateList, setDateList] = useState(generateDateList);
    const [itemPriceData, setItemPriceData] = useState();
    const [selectedMonth, setSelectedMonth] = useState(12)

    useEffect(() => {
        const start = `${from.year}-${String(from.month).padStart(2, "0")}-${String(from.day).padStart(2, "0")}`;
        const end = `${to.year}-${String(to.month).padStart(2, "0")}-${String(to.day).padStart(2, "0")}`;

        instance({
            url: `/seller/total-item-info`,
            method: "get",
            params: { time: "month", start, end },
        })
            .then((res) => {
                setItemData(trimData(res.data))
            })
            .catch(console.log);

        instance({
            url: `/seller/entire-ci-info`,
            method: "get",
            params: { time: "month", start, end },
        })
            .then((res) => {
                console.log(res)

                setCartData(trimData(res.data))
            })
            .catch(console.log);

        setDateList(generateDateList());
    }, [from, to]);

    useEffect(() => {
        const month = dateList[selectedIndex].slice(5, 7);
        const year = dateList[selectedIndex].slice(0, 4);
        const url = `/seller/profit-item-info?year=${year}&month=${month}`;

        instance({
            url,
            method: "GET",
        }).then((res) => {
            const data = res.data.itemProfitInfoList;
            console.log(res.data)
            setSelectedMonth(month)

            setItemPriceData(priceDataTrimmer(data));

        });
    }, [selectedIndex]);

    const trimData = (data) => {
        const months = generateDateList();
        const dates = [];
        const points = [];

        months.forEach((month) => {
            const existingData = data.find((item) => item.date === month);

            if (existingData) {
                dates.push(existingData.date);
                points.push(existingData.point);
            } else {
                dates.push(month);
                points.push(0);
            }
        });

        return { data: points, categories: dates };
    };

    const applyYearChange = (delta) => {
        setFrom((prev) => ({ ...prev, year: prev.year + delta }));
        setTo((prev) => ({ ...prev, year: prev.year + delta }));
    };

    const priceDataTrimmer = (data) => {
        return data
            .map((item) => {
                const newOptions = item["profitDTOList"].reduce((acc, optionItem) => {
                    acc[optionItem.optionName] = optionItem.point;
                    return acc;
                }, {});

                return {
                    name: item["itemName"],
                    options: newOptions,
                    totalPoint: Object.values(newOptions).reduce((sum, point) => sum + point, 0),
                };
            })
            .sort((a, b) => b.totalPoint - a.totalPoint);
    };

    return (
        <div className="seller-stat-analysis">
            <div  className="btn-container row">
                {/*<button>월별 조회 하기</button>*/}
                <button
                    onClick={() => applyYearChange(-1)}
                    disabled={from.year - 1 < 2000}
                >
                    지난해로 이동
                </button>
                <div>
                    <h3>
                        조회
                        기간: {from.year}.{String(from.month).padStart(2, "0")} - {to.year}.{String(to.month).padStart(2, "0")}
                    </h3>
                </div>
                <button
                    onClick={() => applyYearChange(1)}
                    disabled={to.year + 1 > now.getFullYear()}
                >
                    다음 해로 이동
                </button>

            </div>


            <div style={{width: "1080px", display: "flex", justifyContent: "space-between"}}>
                {itemData && cartData && (
                    <SellerChart
                        data={itemData.data}
                        data2={cartData.data}
                        categories={generateDateList(from, to)}
                        setSelectedIndex={setSelectedIndex}
                    />
                )}
                {itemPriceData && <TestComp selectedMonth={selectedMonth} data={itemPriceData}/>}
            </div>

            <div
                className="stat-analysis-table"
                style={{width: "1080px", display: "flex", justifyContent: "space-between"}}
            >
                {itemData && (
                    <SellerAnalysisTable
                        data1={itemData.categories}
                        data2={itemData.data}
                        colName1="date"
                        colName2="point"
                    />
                )}

                {itemPriceData && itemPriceData.length !== 0?
                    <SellerItemAnalysisTable itemPriceData={itemPriceData}/>:
                    <div className="no-contents">
                        <span>
                            {selectedMonth<10?selectedMonth?.replace(0,""):selectedMonth}
                            월의 판매 정보가 없습니다.
                        </span>
                    </div>}
            </div>
        </div>
    );
};

export default SellerStatAnalysis;
