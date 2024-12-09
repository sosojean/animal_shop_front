import React, {useEffect, useState} from 'react';
import Chart from "../../../components/common/Chart";
import instance from "../../../utils/axios";
import NextPrevButton from "../../../components/common/NextPrevButton";
import StatAnalysisTable from "../../../components/shop/admin/StatAnalysisTable";
import AdminMenu from "../../../components/shop/admin/AdminMenu";
import "../../../assets/styles/shop/admin/statAnalysisTable.scss"

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
        const url = isDaySum?
            `/point/day-sum-total?year=${year}&&month=${month}`:
            `/point/month-sum-total?year=${year}`;

        instance({
            url:url,
            method:"GET",
        }).then((res) => {
            console.log(res);
            setData(res.data.pointTotalDTOList);
            setFirstDate(res.data["first_date"])
            trimData(res.data.pointTotalDTOList);
        })
    }, [year,month,isDaySum]);

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