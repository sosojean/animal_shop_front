import React, {useEffect, useState} from 'react';
import SellerMenu from "../../../components/shop/seller/SellerMenu";
import instance from "../../../utils/axios";
import HistoryItem from "../../../components/shop/seller/HistoryItem";

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

            {data&&data.map(item=>{
                return (<HistoryItem item={item}/>)
            })}


        </div>
    );
};

export default SellerPointHistory;