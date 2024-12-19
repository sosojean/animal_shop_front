import React, {useEffect, useState} from 'react';
import axios from "axios";
import BlogResultItem from "./BlogResultItem";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PlaceSearchResult = ({mapId, query}) => {
    const [data, setData] = useState()

    useEffect(() => {
        axios({
            url:"https://dapi.kakao.com/v2/search/blog",
            method:"GET",
            headers: {
                Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`
            },
            params:{
                query:query,
                size:7
            }
        }).then(res => {
            setData(res.data.documents)
        }).catch(err=>{
            console.log(err)
        })
    }, [mapId, query]);
    return (
        <div>
            <hr/>
            <h3 className={"sub-header"}>블로그 검색결과 <FontAwesomeIcon icon={faMagnifyingGlass}/></h3>

            <div className="place-search-container">

            {data&&data.map((item, index) => (
                <BlogResultItem key={index} item={item} />
                ))

            }
            {data&&data.length===0?<span>검색 결과가 없습니다.</span>:""}
            </div>
        </div>
    );
};

export default PlaceSearchResult;