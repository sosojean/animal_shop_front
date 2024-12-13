import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import instance from "../../../utils/axios"
import {dogWikiBreeds, catWikiBreeds} from "../../../utils/petOptions";
import DefaultButton from "../../common/DefaultButton";
import catIcon from "../../../assets/img/catIcon.svg"

const WikiInput = () => {

    const dogBreeds = dogWikiBreeds;
    const catBreeds = catWikiBreeds;

    const [species, setSpecies] = useState("dog");
    const [postData, setPostData] = useState({});
    const [file, setFile] = useState(null);

    // 이미지 미리보기
    const [imgPath, setImgPath] = useState("");
    const imgRef = useRef(null);

    // console.log("postData", postData);
    console.log("file", file);

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

    const handlePreviewImage = () => {
        if (imgRef.current && imgRef.current.files) {
          const img = imgRef.current.files[0];
          
          //이미지 미리보기 기능
          const reader = new FileReader();
          reader.readAsDataURL(img);
          reader.onload = () => {
            setImgPath(reader.result);
          };
        }
      };

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
                    onChange={(e) => handlePostData("overview", e.target.value)}
                />
            </div>
            <div>
                <h2>외모</h2>
                <textarea
                    placeholder="외모를 작성해주세요"
                    onChange={(e) => handlePostData("appearance", e.target.value)}
                />
            </div>
            <div>
                <h2>성격</h2>
                <textarea
                    placeholder="성격을 작성해주세요"
                    onChange={(e) => handlePostData("temperament", e.target.value)}
                />
            </div>
            <div>
                <h2>대표 이미지</h2>
                <input type="file"
                    onChange={() => {
                        handleFileChange();
                        handlePreviewImage();
                    }}
                    accept="image/*"
                    id="photo"
                    ref={imgRef}
                />
                <label htmlFor="photo">
                    <img
                        src={imgPath ? imgPath : catIcon}
                        alt="이미지 업로드"
                        style={{width: "200px", height: "200px"}}
                    />
                </label>
            </div>
            <Link to="/admin/seller">
                <DefaultButton onClick={handleSubmit}>제출</DefaultButton>
            </Link>
            
        </div>
    )
}

export default WikiInput;