import React, {useEffect, useState} from 'react';
import NextPrevButton from "../../../components/common/NextPrevButton";
import StatAnalysisTable from "../../../components/shop/admin/StatAnalysisTable";
import instance from "../../../utils/axios";
import SellerChart from "../../../components/shop/seller/SellerChart";
import TestComp from "./testComp";

const SellerStatAnalysis = () => {


    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [trimmedData, setTrimmedData] = useState()



    useEffect(() => {
        const url = `/seller/profit-item-info?year=${2024}&month=${2}`;
        instance({
            url:url,
            method:"GET",
        }).then((res) => {



            const data = res.data.itemProfitInfoList;
            setTrimmedData(dataTrimmer(data))
        })
    }, [year,month]);


    const dataTrimmer = (data) =>{
        let trimmedItems = [];
        let options = {}

        let itemInfo = {
            name:"", options
        }

        data.map(item=>{
            let newOptions = {}
            let newItem = {...itemInfo};
            item["profitDTOList"].map(

                optionItem=>{
                    newOptions[optionItem.optionName] = optionItem.point
                }
            )
            newItem.name=item["itemName"];
            newItem.options=newOptions;
            trimmedItems.push(newItem);
            }
        )

        return(trimmedItems);
    }







    return (
        <div>



            <div className="stat-analysis-table">
                <TestComp />

                <SellerChart/>
            </div>



        </div>
    );
};

export default SellerStatAnalysis;