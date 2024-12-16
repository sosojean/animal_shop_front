import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import instance from "../../../utils/axios"
import axios from "axios";
import {dogWikiBreeds, catWikiBreeds} from "../../../utils/petOptions";
import DefaultButton from "../../common/DefaultButton";
import catIcon from "../../../assets/img/catIcon.svg"

const WikiInput = (props) => {
    
    const {postData, setPostData} = props;

    const dogBreeds = dogWikiBreeds;
    const catBreeds = catWikiBreeds;

    const [species, setSpecies] = useState("dog");
    const [file, setFile] = useState(postData?.attachmentUrl || null);
    console.log("file", file);

    // 이미지 미리보기
    const [imgPath, setImgPath] = useState("");
    const imgRef = useRef(null);

    // 이미지 경로 테스트
    const [detailImageUrl, setDetailImageUrl] = useState("");

    const handlePostData = (field, value) => {
        setPostData((prevData) => {
            return (
                {...prevData,
                [field]: value}
            )
        })
    }

    const handleFileChange = () => {
        setFile(imgRef.current.files[0]);
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        
        // 파일 추가
        if (file) {
            formData.append('file', file);
        }
    
        // JSON 데이터를 추가
        const wikiDTO = {
            breedName: postData.breedName,
            overview: postData.overview,
            appearance: postData.appearance,
            temperament: postData.temperament
        };
    
        // JSON 데이터를 Blob으로 변환하여 추가
        const wikiDTOBlob = new Blob([JSON.stringify(wikiDTO)], {
            type: 'application/json'
        });
        formData.append('wikiDTO', wikiDTOBlob);

        try {
            const response = await instance.post('/wiki/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('handleSubmit 성공:', response.data);
        } catch (error) {
            console.error('handleSubmit Error:', error);
        }
    };

    const handleUploadDetailImage = async () => {
        const file = imgRef.current.files[0];
        console.log(file.name);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post('http://localhost:8080/file/item-image-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // 업로드 후 서버에서 받은 파일명 출력
            console.log('업로드 성공:', response.data);
            const fileName = response.data;
            setImgPath(`http://localhost:8080/file/image-print?filename=${fileName}`);
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
        }

    }

    return (
        <div>
            <div>
                <h2>종 선택</h2>
                <div>
                    <select onChange={(e) => setSpecies(e.target.value)}>
                        <option value="dog">강아지</option>
                        <option value="cat">고양이</option>
                    </select>
                    <select onChange={(e) => handlePostData("breedName", e.target.value)}>
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
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        // 파일이 선택되지 않았을 경우 아무 작업도 하지 않음
                        if (!e.target.files || e.target.files.length === 0) {return;}
                        handleFileChange();
                        handleUploadDetailImage();}}
                    ref={imgRef}
                    id="photo"
                />
                <label htmlFor="photo">
                    <img
                        src={imgPath ? imgPath : catIcon}
                        alt="이미지 업로드"
                        style={{width: "200px", height: "200px"}}
                    />
                </label>
            </div>
            <img src={postData.attachmentUrl}/>

            <Link to="/admin/seller">
                <DefaultButton onClick={handleSubmit}>제출</DefaultButton>
            </Link>
            
        </div>
    )
}

export default WikiInput;