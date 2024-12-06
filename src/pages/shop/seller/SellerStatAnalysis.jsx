import React, {useEffect, useState} from 'react';
import NextPrevButton from "../../../components/common/NextPrevButton";
import StatAnalysisTable from "../../../components/shop/admin/StatAnalysisTable";
import instance from "../../../utils/axios";
import SellerChart from "../../../components/shop/seller/SellerChart";
import TestComp from "./testComp";
import getDate, {getLastYearFirstDate} from "../../../utils/getDate";

const SellerStatAnalysis = () => {

    //
    const now = new Date();
    const [from, setFrom] = useState({
        year: now.getFullYear()- (now.getMonth()+1 === 12 ? 0 : 1),
        month: now.getMonth()+ 1 ===12?1:now.getMonth() + 1,
        day: 1,
    })
    const [to, setTo] = useState({
        year: now.getFullYear(),
        month: now.getMonth()+ 1,
        day: now.getDay(),
    })


    const generateDateList = () => {
        const startDate = new Date(from.year, from.month - 1); // 'from'을 Date 객체로 변환
        const endDate = new Date(to.year, to.month - 1); // 'to'를 Date 객체로 변환

        const dateList = [];

        let currentDate = new Date(startDate); // 시작 날짜를 currentDate로 설정

        // 월별로 반복
        while (currentDate <= endDate) {
            // 'yyyy-mm' 형식으로 날짜를 문자열로 변환
            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
            dateList.push(formattedDate);

            // 다음 달로 이동
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return dateList;
    };

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [itemData, setItemData] = useState()
    const [cartData, setCartData] = useState()
    const [dateList, setDateList] = useState(generateDateList)
    const [itemPriceData, setItemPriceData] = useState()

    // const [isDaySum, setIsDaySum] = useState(false)



    useEffect(() => {
        console.log(itemData)
    },[itemData])


    useEffect(() => {
        instance({
            url: `/seller/total-item-info`,
            method:"get",
            params:{
                time:"month",
                start:`${from.year}-${from.month}-${from.day}`,
                end:`${to.year}-${to.month}-${to.day}`,
            }
        }).then(res => {
            console.log(res);
            // trimData(res.data)
            setItemData(trimData(res.data))
        }).catch(err => {
            console.log(err)
        })


        instance({
            url: `/seller/entire-ci-info`,
            method:"get",
            params:{
                time:"month",
                start:`${from.year}-${from.month}-${from.day}`,
                end:`${to.year}-${to.month}-${to.day}`,
            }
        }).then(res => {
            console.log(res);
            // trimData(res.data)
            setCartData(trimData(res.data))
        }).catch(err => {
            console.log(err)
        })
        setDateList(()=>generateDateList())


    },[from,to])


    useEffect(() => {


        const url = `/seller/profit-item-info?year=${2024}&month=${2}`;
        instance({
            url:url,
            method:"GET",
        }).then((res) => {



            const data = res.data.itemProfitInfoList;
            setItemPriceData(priceDataTrimmer(data))
        })
    }, [selectedIndex]);



    const trimData = (data) => {
        const months = generateDateList();
        const dates = [];
        const points = [];

        months.forEach(month => {
            const existingData = data.find(item => item.date === month);

            if (existingData) {
                dates.push(existingData.date);
                points.push(existingData.point);
            } else {
                dates.push(month);
                points.push(0);
            }
        });

        return {
            data: points,
            categories: dates
        };
    };


    const applyDate = (func, key, value) => {
        if (key === 'month') {
            // 월은 1-12 사이로 순회
            value = value > 12 ? 1 : (value < 1 ? 12 : value);
        }

        if (key === 'year') {
            // 현재 연도 이상으로 설정 금지
            if (func === setTo && value > now.getFullYear()) return;
            if (func === setFrom && value > now.getFullYear()) return;
        }

        func((prev) => ({
            ...prev,
            [key]: value
        }));
    };





    const priceDataTrimmer = (data) => {
        let trimmedItems = data.map(item => {
            let newOptions = item["profitDTOList"].reduce((acc, optionItem) => {
                acc[optionItem.optionName] = optionItem.point;
                return acc;
            }, {});

            return {
                name: item["itemName"],
                options: newOptions,
                totalPoint: Object.values(newOptions).reduce((sum, point) => sum + point, 0)
            };
        });

        return trimmedItems.sort((a, b) => b.totalPoint - a.totalPoint);
    }



    return (
        <div>

            <div>

                <button onClick={() => {
                    applyDate(setFrom, "year", from.year + 1)
                }}>{"->"}</button>
                {from.year}
                <button onClick={() => {
                    applyDate(setFrom, "year", from.year - 1)
                }}>{"<-"}</button>
                <button onClick={() => {
                    applyDate(setFrom, "month", from.month + 1)
                }}>{"->"}</button>
                {from.month}
                <button onClick={() => {
                    applyDate(setFrom, "month", from.month - 1)
                }}>{"<-"}</button>


                <button onClick={() => {
                    applyDate(setTo, "year", to.year + 1)
                }}>{"->"}</button>
                {to.year}
                <button onClick={() => {
                    applyDate(setTo, "year", to.year - 1)
                }}>{"<-"}</button>
                <button onClick={() => {
                    applyDate(setTo, "month", to.month + 1)
                }}>{"->"}</button>
                {to.month}
                <button onClick={() => {
                    applyDate(setTo, "month", to.month - 1)
                }}>{"<-"}</button>


                {/*<button>{"->"}</button>*/}
                {/*{from.day}*/}
                {/*<button>{"<-"}</button>*/}


            </div>


            <div className="stat-analysis-table">
                {itemData && cartData &&
                    <SellerChart data={itemData.data} data2={cartData.data} categories={generateDateList(from, to)}
                                 setSelectedIndex={setSelectedIndex}/>}
                {/*{trimmedData&&<TestComp data={trimmedData}/>}*/}

            </div>
        </div>
    );
};

export default SellerStatAnalysis;