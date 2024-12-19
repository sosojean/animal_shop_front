import React, {useEffect, useState} from 'react';
import instance from "../../utils/axios";
import PlaceReview from "./PlaceReview";
import ReviewEditor from "../shop/order/reviewEditor";
import PlaceReviewEditor from "./PlaceReviewEditor";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import DefaultButton from "../common/DefaultButton";

const PlaceReviewList = ({mapId}) => {
    const [data, setData] = useState()
    const [reviewWriting, setReviewWriting] = useState(false)
    const [isEdited, setIsEdited] = useState(false)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        console.log(mapId);
        instance({
            url:`/map/comment/select?mapId=${mapId}&page=1`,
            method:"get",

        }).then(res => {
            setData(res.data.comments)
            // console.log(res.data)
            setTotalCount(res.data.total_count)
            setPage(1)
            setIsEdited(!isEdited)
        }).catch((error) => {
            console.log(error)
        })
    }, [isEdited,mapId]);


    const loadMoreData = () => {
        instance({
            url:`/map/comment/select?mapId=${mapId}&page=${page+1}`,
            method:"get",

        }).then(res => {
            setData((prev)=>
                [...prev, ...res.data.comments]
            )
            console.log(data)
            setPage((prev)=>(prev+1))
            // setIsEdited(!isEdited)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>

            {data && <div className={"reviews"}>

                        <h3 className="sub-header row reviews-header">
                            <div>
                                <span>리뷰</span>
                                <span>{totalCount}</span>
                            </div>
                            <DefaultButton className={"primary  review-write-btn"} onClick={() => setReviewWriting(true)}>
                                리뷰작성
                                <FontAwesomeIcon icon={faPen}/>
                            </DefaultButton>
                        </h3>


                    {/*</div>*/}



                {data.map((item, index) => (
                    <PlaceReview item={item} key={index} mapId={mapId}
                                     isEdited={isEdited} setIsEdited={setIsEdited}/>
                    )
                )}
                {totalCount === 0 ?
                    <div className={"no-contents-thin"}>
                        <span>작성된 리뷰가 없습니다.</span>
                    </div> : ""}

            </div>}

            {totalCount > 7 && (totalCount/7)>page&& <button onClick={loadMoreData}>더보기</button>}
            {reviewWriting &&<PlaceReviewEditor setIsEdited={setIsEdited} isEdited={isEdited} mapId={mapId} setReviewWriting={setReviewWriting}/>
               }


        </div>
    );
};

export default PlaceReviewList;