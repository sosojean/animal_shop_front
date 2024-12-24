import React, { useEffect, useState } from "react";
import AdminMenu from "../admin/AdminMenu";
import instance from "../../../utils/axios";
import StatAnalysisTableCol4 from "../admin/StatAnalysisTableCol4";
import Title from "../../common/Title";
import "../../../assets/styles/shop/seller/sellerWithdraw.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import DefaultButton from "../../common/DefaultButton";

const Withdraw = () => {
    const [isAvailable, setIsAvailable] = useState(true)

    const getToday = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // 이번 달 첫날 계산
    const getFirstDayOfMonth = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        return `${year}-${month}-01`;
    };

    const getLastDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
        const lastDay = new Date(year, month, 0).getDate(); // 다음 달의 0일은 현재 달의 마지막 날
        return `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
    };

    const [startDate, setStartDate] = useState(getFirstDayOfMonth());
    const [endDate, setEndDate] = useState(getToday());
    const [data, setData] = useState([]);

    const isCurrentMonth = () => {
        const today = new Date();
        const start = new Date(startDate);

        return (
            today.getFullYear() === start.getFullYear() &&
            today.getMonth() === start.getMonth()
        );
    };



    // 날짜 조정 함수
    const adjustDate = (months) => {
        const start = new Date(startDate);
        const end = new Date(startDate); // 종료 날짜는 시작 날짜 기준으로 조정

        // 월 조정
        start.setMonth(start.getMonth() + months);
        end.setMonth(end.getMonth() + months);

        // 시작 날짜는 항상 해당 달의 첫째 날
        setStartDate(`${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}-01`);

        // 종료 날짜는 해당 달의 마지막 날
        setEndDate(getLastDayOfMonth(end));
    };


    // 데이터 가져오기
    useEffect(() => {
        setData([])
        instance({
            url: `/point/entire-sum-seller`,
            method: "get",
            params:{
                time:"month",
                start:startDate,
                end:endDate,
                state:isAvailable?"AVAILABLE":"WITHDRAWN"
            }
        })
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [startDate, endDate,isAvailable]);




    return (
        <div>
            <AdminMenu />
            <Title>판매자 정산</Title>

            {/* 날짜 조정 버튼 */}
            <div className="with-draw-container">

                <div className="row date-controls">
                    <div className="row">
                        <DefaultButton className={isAvailable ? "default lg" : "selected lg primary"}
                                       onClick={() => setIsAvailable(false)}>정산완료</DefaultButton>
                        <DefaultButton className={!isAvailable ? "default lg" : "selected lg primary"}
                                       onClick={() => setIsAvailable(true)}>미정산</DefaultButton>
                    </div>
                    <button className="prev-next" onClick={() => adjustDate(-1)}>
                        <FontAwesomeIcon icon={faAngleLeft}/>
                    </button>
                    <div className="date-container">
                        <span>
                            {startDate} ~ {endDate}
                        </span>
                    </div>
                    <button className="prev-next" onClick={() => adjustDate(1)} disabled={isCurrentMonth()}>
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </button>

                </div>

                {/* 데이터 테이블 */}
                {data.length < 1 ? <div className="no-contents">
                        <span>해당 월의 정산 데이터가 없습니다.</span>
                    </div>

                    : <div className="stat-analysis-table">
                        <StatAnalysisTableCol4
                            data={data}
                            colName1={"date"}
                            colName2={"sellerNickname"}
                            colName3={"point"}
                            colName4={"환급"}
                            disabled={!isAvailable}

                        />
                </div>}
            </div>
        </div>
    );
};

export default Withdraw;
