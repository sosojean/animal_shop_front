import React, { useEffect, useState } from 'react';
import SellerMenu from "../../../components/shop/seller/SellerMenu";
import instance from "../../../utils/axios";
import HistoryItem from "../../../components/shop/seller/HistoryItem";
import StatAnalysisTable from "../../../components/shop/admin/StatAnalysisTable";
import Title from "../../../components/common/Title";

const SellerPointHistory = () => {
    const [data, setData] = useState([]);
    const [prevIndex, setPrevIndex] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        // 종료 날짜 계산
// 종료 날짜 계산
        const end = new Date();
        if (prevIndex === 0) {
            // 이번 달이면 오늘 날짜
            end.setDate(end.getDate());
        } else {
            // 이전 달이면 마지막 날짜
            end.setMonth(end.getMonth() - prevIndex + 1);
            end.setDate(0); // 이전 달의 마지막 날
        }

// 시작 날짜 계산
        const start = new Date(end);
        start.setDate(1); // 월의 첫째 날

        setStartDate(start);
        setEndDate(end);

        setData([])
        // API 호출
        instance({
            url: `/point/entire-sum-seller`,
            method: "get",
            params: {
                time: "day",
                start: `${start.getFullYear()}-${(start.getMonth() + 1).toString().padStart(2, "0")}-${start.getDate().toString().padStart(2, "0")}`,
                end: `${end.getFullYear()}-${(end.getMonth() + 1).toString().padStart(2, "0")}-${end.getDate().toString().padStart(2, "0")}`
            }
        })
        .then(res => setData(res.data))
        .catch(err => {
            console.error(err);
        });

    }, [prevIndex]);
    const totalPoints = data.reduce((sum, item) => sum + (item.point || 0), 0);

    return (
        <div>
            <SellerMenu/>
            <Title>판매수익</Title>

            <div className="row">
                <button onClick={() => setPrevIndex(
                    prev => prev + 1)}>{"<"}</button>
                <span>{`${startDate.getFullYear()}
                -${(startDate.getMonth() + 1).toString().padStart(2, "0")}
                -${startDate.getDate().toString().padStart(2, "0")}`}</span>
                <span> ~ </span>
                <span>{`${endDate.getFullYear()}
                -${(endDate.getMonth() + 1).toString().padStart(2, "0")}
                -${endDate.getDate().toString().padStart(2, "0")}`}</span>
                <button onClick={() => setPrevIndex(
                    prev => Math.max(prev - 1, 0))}>{">"}</button>
            </div>
            test
            <div className="stat-analysis-table">
                {data && <StatAnalysisTable data={data} colName1={"date"} colName2={"point"}/>}
            </div>
            <p>정산 예정 금액 {totalPoints}</p>

        </div>
    );
};

export default SellerPointHistory;