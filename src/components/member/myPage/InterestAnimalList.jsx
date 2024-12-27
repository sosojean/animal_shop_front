import React, { useEffect, useState, useRef } from "react";
import instance from "../../../utils/axios";
import Title from "../../common/Title";
import Card from "../../common/Card";
import InterestAnimal from "./items/InterestAnimal";
import "../../../assets/styles/member/myPage/InterestAnimal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const InterestAnimalList = () => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 아이템 인덱스
    const itemWidth = 300; // 각 아이템의 너비
    const intervalRef = useRef(null); // 자동 이동 타이머 참조
    const [isHovered, setIsHovered] = useState(false); // hover 상태
    const [update, setUpdate] = useState(false); 

    const selectedUrl = "/abandoned_animal/list-interest";

    // 데이터 가져오기
    useEffect(() => {
        instance({
            url: selectedUrl,
            method: "get",
        })
            .then((res) => {
                setData(res.data.interestAnimalDTOList || []);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [update]);

    // 자동 이동 관리
    useEffect(() => {
        if (!isHovered) {
            intervalRef.current = setInterval(() => {
                handleMove("right");
            }, 5000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current); // 컴포넌트 언마운트 시 정리
    }, [isHovered, currentIndex]);

    // 리스트 이동 핸들러
    const handleMove = (direction) => {
        const maxIndex = Math.max(data.length - 3, 0); // 마지막 인덱스

        if (direction === "right") {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1)); // 마지막이면 처음으로
        } else if (direction === "left") {
            setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1)); // 처음이면 마지막으로
        }
    };

    return (
        <>
        <Title>나의 관심 동물</Title>
        <div onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
            <Card className={"default-card interest-animal-list-container"}>
                <div className="link-container">
                    <Link to={"/adoption/interest"}>
                        <span>관심동물 더보기 <FontAwesomeIcon icon={faAngleRight}/></span>
                    </Link>

                </div>
                <div className="row">
                {/* 왼쪽 버튼 */}
                <button
                    className="left-right-control"
                    onClick={() => handleMove("left")}>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                </button>
                {data?.length === 0 && (
                    <div className="no-contents">
                        <span>등록된 관심 동물이 없습니다.</span>
                    </div>
                )}


                {/* 리스트 */}


                    {data?.length >0&& <div className="interest-animal-list">

                        <div className="list-wrapper"
                             style={{
                                 transform: `translateX(-${currentIndex * itemWidth}px)`,
                                 width: `${itemWidth * data.length}px`
                             }}>
                            {data?.map((item, index) => (
                                <InterestAnimal key={index} data={item} update={update} setUpdate={setUpdate}/>
                            ))}

                        </div>
                    </div>}

                {/* 오른쪽 버튼 */}
                <button
                    className="left-right-control"
                    onClick={() => handleMove("right")}
                >
                    <FontAwesomeIcon icon={faAngleRight}/>
                </button>
                </div>
            </Card>
        </div>
        </>
    );
};

export default InterestAnimalList;
