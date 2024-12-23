import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import instance from "../../../utils/axios"
import axios from "axios";
import {dogWikiBreeds, catWikiBreeds} from "../../../utils/petOptions";
import DefaultButton from "../../common/DefaultButton";
import catIcon from "../../../assets/img/catIcon.svg"

const WikiInput = (props) => {
    
    const {postData, setPostData} = props;
    console.log("postData", postData);

    const dogBreeds = dogWikiBreeds;
    const catBreeds = catWikiBreeds;

    const [species, setSpecies] = useState("dog");
    const [file, setFile] = useState("");
    console.log("file", file);

    const getSelect = () => {
        const findCatIndex = catBreeds.findIndex(cat => cat === postData?.breedName);

        if (findCatIndex !== -1){ setSpecies("cat") } 
    }

    useEffect(() => {
        getSelect();
    }, [postData])

    const handlePostData = (field, value) => {
        setPostData((prevData) => {
            return (
                {...prevData,
                [field]: value}
            )
        })
    }

    const handleSubmit = async () => {
    
        // JSON 데이터를 추가
        const wikiDTO = {
            breedName: postData.breedName,
            overview: postData.overview,
            appearance: postData.appearance,
            temperament: postData.temperament,
            attachmentUrl: postData.attachmentUrl
        };

        try {
            const response = await instance.post('/wiki/register', wikiDTO);
            console.log('handleSubmit 성공:', response.data);
        } catch (error) {
            console.error('handleSubmit Error:', error);
        }
    };

    const handlePatch = async () => {

        // JSON 데이터를 추가
        const wikiDTO = {
            breedName: postData.breedName,
            overview: postData.overview,
            appearance: postData.appearance,
            temperament: postData.temperament,
            attachmentUrl: postData.attachmentUrl
        };

        try {
            const response = await instance.patch(`wiki/update/${postData.id}`, wikiDTO);
            console.log('handlePatch', response.data);
        } catch (error) {
            console.error('handleSubmit Error:', error);
        }
    };

    const handleDelete = async () => {

        try {
            const response = await instance.delete(`wiki/delete/${postData.id}`);
            console.log('handleDelete 성공:', response.data);
        } catch (error) {
            console.error('handhandleDeletelePatch Error:', error);
        }
    };

    return (
        <div>
            <div>
                <h2>종 선택</h2>
                <div>
                    <select value={species} onChange={(e) => setSpecies(e.target.value)}>
                        <option value="dog">강아지</option>
                        <option value="cat">고양이</option>
                    </select>
                    <select value={postData.breedName} onChange={(e) => handlePostData("breedName", e.target.value)}>
                        {species === "dog" ?
                            dogBreeds.map((breed, index) => {
                                return (
                                    <option value={breed} key={index}>{breed}</option>
                                )
                            }) : catBreeds.map((breed, index) => {
                                    return (
                                        <option value={breed} key={index}>{breed}</option>
                                    )
                                })
                        }
                    </select>                      
                </div>
            </div>
            <div>
                <h2>개요</h2>
                <textarea
                    placeholder="개요를 작성해주세요"
                    value={postData?.overview || ''}
                    onChange={(e) => handlePostData("overview", e.target.value)}
                />
            </div>
            <div>
                <h2>외모</h2>
                <textarea
                    placeholder="외모를 작성해주세요"
                    value={postData?.appearance || ''}
                    onChange={(e) => handlePostData("appearance", e.target.value)}
                />
            </div>
            <div>
                <h2>성격</h2>
                <textarea
                    placeholder="성격을 작성해주세요"
                    value={postData?.temperament || ''}
                    onChange={(e) => handlePostData("temperament", e.target.value)}
                />
            </div>
            <div>
                <h2>대표 이미지</h2>
                <input 
                    value={postData?.attachmentUrl || ''}
                    onChange={(e) => handlePostData("attachmentUrl", e.target.value)}
                />
                {postData?.id &&
                    <img src={postData?.attachmentUrl || 'https://placehold.co/250x250'}
                        style={{width: "200px"}}
                    />                
                }
            </div>

            {postData.id ? 
                <div>
                    <Link to="/admin/seller">
                        <DefaultButton onClick={handlePatch}>수정</DefaultButton>
                    </Link>
                    <Link to="/admin/seller">
                        <DefaultButton onClick={handleDelete}>삭제</DefaultButton>
                    </Link>                
                </div> : 
                <Link to="/admin/seller">
                    <DefaultButton onClick={handleSubmit}>제출</DefaultButton>
                </Link>                   
            }
        </div>
    )
}

export default WikiInput;