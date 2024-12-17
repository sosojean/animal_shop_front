import React, {useEffect, useState} from 'react';
import instance from "../../../utils/axios";
import PetInfo from "./PetInfo";
import Card from "../../common/Card";
import PetInfoDetail from "./PetInfoDetail";
import {Link} from "react-router-dom";

const PetInfoList = ({setSelectedPet, data ,isEdited, setIsEdited}) => {


    return (<>
            {/*<button onClick={changeLeaderHandler}>대표 동물 변경하기</button>*/}
                <div className={"pet-profile-container"}>
                    {data && data.map((item, index) => {
                        return <PetInfo setSelectedPet={setSelectedPet}
                                        index ={index} key={item.id}
                                        item={item} setIsEdited={setIsEdited} isEdited={isEdited}/>
                        }
                    )}
                    <Card className={"default-card pet-info"}>
                        <Link to={"/pet/register"}>
                        반려동물 추가하기 ->
                        </Link>

                    </Card>
                </div>


        </>
    );
};

export default PetInfoList;