import React, { useEffect, useState } from 'react';
import SellerMenu from "../../../components/shop/seller/SellerMenu";
import instance from "../../../utils/axios";
import HistoryItem from "../../../components/shop/seller/HistoryItem";
import StatAnalysisTable from "../../../components/shop/admin/StatAnalysisTable";
import Title from "../../../components/common/Title";
import "../../../assets/styles/shop/seller/sellerPointHistory.scss"

const SellerPointHistory = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        instance({
            url: `/seller/point-time-info`,
            method: "get",
            params: {
                time: "day"
            }
        })
        .then(res => setData(res.data))
        .catch(err => {
            console.error(err);
        });

    }, []);
    const totalPoints = data.reduce((sum, item) => sum + (item.point || 0), 0);

    return (
        <div>
            <SellerMenu/>
            <Title>판매수익</Title>

            <div className="seller-point-history">
                <div className="stat-analysis-table">
                    {data && <StatAnalysisTable data={data} colName1={"date"} colName2={"point"}/>}
                </div>
                <div className="total-point">
                    <span className="title">정산 예정 금액</span>
                    <span className="point">{totalPoints.toLocaleString()} 원</span>
                </div>

            </div>

        </div>
    );
};

export default SellerPointHistory;