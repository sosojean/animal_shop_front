import React, {useEffect, useState} from 'react';
import SellerMenu from "../../../components/shop/seller/SellerMenu";
import instance from "../../../utils/axios";
import HistoryItem from "../../../components/shop/seller/HistoryItem";
import StatAnalysisTable from "../../../components/shop/admin/StatAnalysisTable";

const SellerPointHistory = () => {
    const [data, setData] = useState()

    useEffect(() => {
        instance({
            url: `/seller/point-time-info?time=${"day"}&page=${1}`,
            method:"get"
        }).then(res => {
            setData(res.data);
        }).catch(err => console.log(err));

    }, []);


    return (
        <div>
            <SellerMenu/>
            test
            <div className="stat-analysis-table">
            {data&&<StatAnalysisTable data={data} colName1={"date"} colName2={"point"}/>}
            </div>



        </div>
    );
};

export default SellerPointHistory;