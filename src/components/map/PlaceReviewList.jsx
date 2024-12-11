import React, {useEffect, useState} from 'react';
import instance from "../../utils/axios";
import PlaceReview from "./PlaceReview";
import ReviewEditor from "../shop/order/reviewEditor";
import PlaceReviewEditor from "./PlaceReviewEditor";

const PlaceReviewList = ({mapId}) => {
    const [data, setData] = useState()
    const [reviewWriting, setReviewWriting] = useState(false)
    const [isEdited, setIsEdited] = useState(false)

    useEffect(() => {
        console.log(mapId);
        instance({
            url:`/map/comment/select?mapId=${mapId}`,
            method:"Get",

        }).then(res => {
            setData(res.data)
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [isEdited]);



    return (
        <div>
            <span>리뷰</span>

            {data &&<>
                <span>{data.total_count}</span>
                {data.comments.map((item, index) => (
                        <PlaceReview item={item} key={index}/>
                    )
                )}
                {data.comments.length===0?
                    <div>
                        <span>작성된 리뷰가 없습니다.</span>
                    </div>:""}

            </>}

            {reviewWriting ? <PlaceReviewEditor setIsEdited={setIsEdited} isEdited={isEdited} mapId={mapId} setReviewWriting={setReviewWriting}/> :
                <button onClick={() => setReviewWriting(true)}>리뷰작성</button>}

        </div>
    );
};

export default PlaceReviewList;