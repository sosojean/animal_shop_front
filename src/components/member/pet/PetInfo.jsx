import React, {useState} from 'react';
import Card from "../../common/Card";
import instance from "../../../utils/axios";
import {useNavigate} from "react-router-dom";
import {weightOptions,catBreedOptions,dogBreedOptions,ageOptions} from "../../../utils/petOptions";
import "../../../assets/styles/member/petInfo.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrown, faPen, faX} from "@fortawesome/free-solid-svg-icons";
import animalPlaceholder from "../../../assets/img/animalPlaceholder.svg";

const PetInfo = (props) => {

    const {item, index, setIsEdited, isEdited, setSelectedPet, dogBreedOptions, catBreedOptions} = props;

    // console.log("petInfo", item);
    const navigate = useNavigate();

    const url = item.profileImageUrl?`${process.env.REACT_APP_API}/file/image-print?filename=${item.profileImageUrl
        }`:animalPlaceholder;

    const handleEdit = () => {
        navigate(`/pet/edit/${item.id}` ,{state : item});
    }

    const handleDelete = () => {
        instance({
            url : `/pet/delete/${item.id}`,
            method: "DELETE"
        }).then((response) => {
            console.log(response)
            setIsEdited(!isEdited);

        }).catch((error) => {
            console.log(error)
        })
    }

    const handleSelect = () =>{
        setSelectedPet(index)
        console.log(index)
    }

    return (
        <Card onClick={handleSelect} className={"default-card pet-info"}>
            <div className={"row info-image-container"}>
                <img className={"pet-profile"} src={url} alt=""/>
                <div className={"info-section"}>
                    <h2 className={"name-section"}>
                        {item.isLeader && <FontAwesomeIcon className="icon" icon={faCrown}/>}
                        <div className={"row pet-info-header"}>
                            <div>
                                <h2 className={"name"}>{" " + item.name}</h2>
                                <span className={"age"}> {item.age} 살</span>
                            </div>


                            <div className={"button-section"}>

                                <button className={"edit-btn"} onClick={handleEdit}>
                                    <FontAwesomeIcon icon={faPen}/>
                                </button>
                                <button className={"delete-btn"} onClick={handleDelete}>
                                    <FontAwesomeIcon icon={faX}/>
                                </button>

                            </div>

                        </div>

                    </h2>
                    <div className={"info-detail-section"}>
                        <p>
                            <span className={"highlight"}>품종</span>
                            <span>{item.breed}</span>

                        </p>
                        <p>
                            <span className={"highlight"}>성별</span>
                            <span>{item.gender === "FEMALE" ? "여아" : "남아"}</span>
                        </p>
                        <p>
                            <span className={"highlight"}>체중</span>
                            <span>{weightOptions[parseInt(item.weight)]}</span>
                        </p>
                    </div>

                    {/*<span>{item["is_neutered"]}</span>*/}
                </div>

            </div>

        </Card>
    );
};

export default PetInfo;