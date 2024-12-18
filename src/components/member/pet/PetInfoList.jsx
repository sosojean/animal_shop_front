import React, {useEffect, useState} from 'react';
import instance from "../../../utils/axios";
import PetInfo from "./PetInfo";
import Card from "../../common/Card";
import PetInfoDetail from "./PetInfoDetail";
import {Link} from "react-router-dom";

const PetInfoList = (props) => {

    const {setSelectedPet, data ,isEdited, setIsEdited, dogBreedOptions, catBreedOptions} = props;

    return (<>
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