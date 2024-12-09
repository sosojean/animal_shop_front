import React, {useEffect, useState} from 'react';
import SellerMenu from "./SellerMenu";
import AdminMenu from "../admin/AdminMenu";
import instance from "../../../utils/axios";
import WithdrawItem from "./WithdrawItem";
import StatAnalysisTable from "../admin/StatAnalysisTable";
import StatAnalysisTableCol3 from "../admin/StatAnalysisTableCol3";

const Withdraw = () => {

    const [data, setData] = useState()

    useEffect(() => {
        instance({
            url:`/point/entire-sum-seller?time=${"month"}&start=${"2024-12-01"}&end=${"2024-12-10"}`,
            method:"get"
        }).then(res => {
            console.log(res)
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, []);



    return (
        <div>
            <AdminMenu/>
            정산금 조회

            {/*{data&&<>*/}
            {/*    {data.map((item, index) => (*/}
            {/*        <WithdrawItem item={item}/>*/}
            {/*    ))}*/}
            {/*</>}*/}


            <div className={"stat-analysis-table"}>
            <StatAnalysisTableCol3 data={data} colName1={"date"} colName2={"sellerNickname"} colName3={"point"}/>
            </div>
        </div>
    );
};

export default Withdraw;