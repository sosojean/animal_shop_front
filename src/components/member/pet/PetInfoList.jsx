import React, {useEffect, useState} from 'react';
import instance from "../../../utils/axios";
import PetInfo from "./PetInfo";
import Card from "../../common/Card";
import PetInfoDetail from "./PetInfoDetail";
import {Link} from "react-router-dom";
import DefaultButton from "../../common/DefaultButton";
import Title from "../../common/Title";

const PetInfoList = (props) => {

    const {page,setPage,totalCount,setSelectedPet, data ,isEdited, setIsEdited, dogBreedOptions, catBreedOptions} = props;

    function loadMoreData() {
        setPage(prev=>prev+1)
    }

    return (<div className={"pet-info-list"}>
            {/*<button onClick={changeLeaderHandler}>대표 동물 변경하기</button>*/}
                <div className={"pet-profile-container"}>
                    {data && data.map((item, index) => {
                        return <PetInfo setSelectedPet={setSelectedPet}
                                        index ={index} key={item.id}
                                        item={item} setIsEdited={setIsEdited} isEdited={isEdited}
                                        dogBreedOptions={dogBreedOptions} catBreedOptions={catBreedOptions}
                                        />
                        }
                    )}

                    {totalCount>5 && (totalCount/5)>page &&
                        <DefaultButton className={"wd100 primary load-more"} onClick={loadMoreData}>더보기</DefaultButton>}

                    <Card className={"default-card pet-info"}>

                        <Link to={"/pet/register"}>
                        반려동물 추가하기 ->
                        </Link>

                    </Card>
                </div>


        </div>
    );
};

export default PetInfoList;