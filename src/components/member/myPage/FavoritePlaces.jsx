import React, {useEffect, useState} from 'react';
import Title from "../../common/Title";
import instance from "../../../utils/axios";
import FavoritePlace from "./items/FavoritePlace";
import "../../../assets/styles/member/favoritePlaces.scss"
import Card from "../../common/Card";


const FavoritePlaces = () => {
    const [data, setData] = useState()

    const selectedUrl = "/mypage/"+"like-place"
    useEffect(() => {
        instance({
            url :selectedUrl,
            method:"get"
        }).then((res) => {
            setData(res.data.mapPositionDTOList)
            console.log(res.data);

        }).catch((error) => {
            console.log(error);
        })
    }, []);


    return (
        <div className="favorite-places">
            <Title>나의 관심 장소</Title>
            <Card className="default-card">
            {data&&data.map(item=>
                <FavoritePlace item={item}/>
            )}</Card>
        </div>
    );
};

export default FavoritePlaces;