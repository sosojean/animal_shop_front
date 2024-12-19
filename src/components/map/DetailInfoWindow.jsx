import React, {useState} from 'react';
import Card from "../common/Card";
import "../../assets/styles/map/detailInfoWindow.scss"
import PlaceReviewList from "./PlaceReviewList";
import PlaceSearchResult from "./PlaceSearchResult";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCar,
    faLocationDot,
    faMapLocationDot, faPersonShelter,
    faTreeCity,
    faUpRightFromSquare
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";


import instance from "../../utils/axios";

const DetailInfoWindow = ({item ,selectedItemId,setSelectedItemId, isEdited, setIsEdited}) => {

  function addHeart() {
    instance({
      url:`map/add/like?mapId=${selectedItemId}`,
      method:"GET",
    }).then((res) => {
      console.log(res);
      setIsEdited(!isEdited);
    }).catch((error) => {
      console.log(error);
    })
  }

  function deleteHeart() {
    instance({
      url:`map/delete/like?mapId=${selectedItemId}`,
      method:"GET",
    }).then((res) => {
      console.log(res);
      setIsEdited(!isEdited);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
        <Card className="bottom-flat detail-info-window">
            <button onClick={() => setSelectedItemId(null)}> 뒤로</button>

            <div className={"place-header"}>
              <div className={"place-title"}>
                <span>{item.facility_name}</span>
                <span>{item.place_description}</span>
              </div>
              {item.like ?
                  <button onClick={deleteHeart}><FontAwesomeIcon
                      icon={solidHeart}/>
                  </button> :
                  <button onClick={addHeart}><FontAwesomeIcon
                      icon={regularHeart}/>
                  </button>}
            </div>


          <span><FontAwesomeIcon icon={faLocationDot}/>{item.road_address}</span>

            <span><FontAwesomeIcon icon={faCar} />{item.parking_available == "Y" ? "주차가능" : "주차불가"}</span>

            {/*<span>{item.latitude}</span>*/}
            {/*<span>{item.longitude}</span>*/}

            {item.additional_pet_fee !== "없음" && <span>추가입장료 {item.additional_pet_fee}</span>}
            {item.admission_fee !== "없음" && <span>입장료 {item.admission_fee}</span>}

            {item.allowed_pet_size !== "모두 가능" && <span>{item.allowed_pet_size}</span>}

            {/*<span>{item.category}</span>*/}

            <span>{item.indoor_available == "Y" ? "" : "실내 불가능"}</span>
            <span> {item.outdoor_available == "Y" ? "" : "야외 불가능"}</span>

            <span>영업시간 {item.operating_hours}</span>
            <span>휴무일 {item.closed_days}</span>
            {item.pet_restrictions !== "해당없음" &&
                item.pet_restrictions !== "제한사항 없음" &&
                <span>{item.pet_restrictions}</span>}
            {<span>연락처 {item.phone_number}</span>}
            {item.homepage !== "정보없음" &&
                <a href={item.homepage}> <FontAwesomeIcon icon={faUpRightFromSquare}/> 홈페이지</a>}

            {/*<span>{item.rating}</span>*/}
            {/*<span>{item.comment_count}</span>*/}
            <hr/>

            <PlaceReviewList mapId={selectedItemId}/>
            <PlaceSearchResult mapId={selectedItemId} query={item.facility_name}/>

        </Card>
    );
};

export default DetailInfoWindow;