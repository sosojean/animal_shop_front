import React from 'react';
import DefaultButton from "../../common/DefaultButton";
import {Link, useSearchParams} from "react-router-dom";

const MyActivity = () => {
    const species = localStorage.getItem("species");
    const [searchParams, setSearchParams] = useSearchParams();
    const selected = searchParams.get("selected");
    return (
        <>
            <div className={"info-container"}>
                <h3>🛒 스토어 활동정보</h3>
                <ul>
                    <li className={selected === "orders"?"selected":""}>
                        <Link to={"?selected=orders"}>주문 내역</Link>
                    </li>
                    <li className={selected === "inquiries" ? "selected" : ""}>
                        <Link to={"?selected=inquiries"}>작성한 문의사항</Link>
                    </li>

                    <li className={selected === "reviews" ? "selected" : ""}>
                        <Link to={"?selected=reviews"}>작성한 상품 리뷰</Link>
                    </li>
                </ul>
                <h3> {species == "dog" ? "🐕" : "🐈"} 유틸리티 활동정보</h3>
                <ul>
                    <li className={selected === "favorites" ? "selected" : ""}>
                        <Link to={"?selected=favorites"}>나의 관심 장소</Link>
                    </li>
                    <li className={selected === "interest-animal" ? "selected" : ""}>
                        <Link to={"?selected=interest-animal"}>나의 관심 동물</Link>
                    </li>
                    <li className={selected === "animal-reply" ? "selected" : ""}>
                        <Link to={"?selected=animal-reply"}>나의 동물 댓글</Link>
                    </li>
                </ul>
            </div>
            <div className={"info-container"}>
                <h3> 💬 커뮤니티 활동정보</h3>
                <ul>
                    <li className={selected === "posts" ? "selected" : ""}>
                        <Link to={"?selected=posts"}>작성한 게시물</Link>
                    </li>
                    <li className={selected === "comments" ? "selected" : ""}>
                        <Link to={"?selected=comments"}>작성한 댓글</Link>
                    </li>
                    <li className={selected === "liked-posts" ? "selected" : ""}>
                        <Link to={"?selected=liked-posts"}>좋아요한 게시글</Link>
                    </li>
                    <li className={selected === "liked-comments" ? "selected" : ""}>
                        <Link to={"?selected=liked-comments"}>좋아요한 댓글</Link>
                    </li>

                </ul>


            </div>


        </>
    );
};

export default MyActivity;