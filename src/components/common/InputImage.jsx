import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import axios from "axios";
import "../../assets/styles/common/inputImage.scss"
import animalPlaceholder from "../../../src/assets/img/animalPlaceholder.svg"
import DefaultButton from "./DefaultButton";

const InputImage = ({imageUploadPath, setImage,image,objName}) =>{

    const [file, setFile] = useState()
    const [fileKey, setFileKey] = useState(Date.now());

    const imageUrl = `${process.env.REACT_APP_API}/file/image-print?filename=`;

    const ImgUploadHandler = async (e) => {
        console.log("img upload")

        const file = e.target.files[0];
        setFile(file)
        const formData = new FormData();
        if (file != null) {
            formData.append('image', new Blob([file], {type: 'multipart/form-data'}), file.name);

            axios({
                url: `${process.env.REACT_APP_API}/file/${imageUploadPath}`,
                method: 'POST',
                data: formData,
            }).then((response) => {
                console.log(response.data);
                console.log(objName,response)
                setImage(objName,response.data);


            }).catch((error) => {
                console.log(error)
            })
        }
    }


    const deleteImage = (e) => {
        e.preventDefault();

        setFileKey(Date.now()); // 고유한 key 값을 변경하여 리렌더링

        setImage(objName,"");
    }


    return(
        <div>
            <div className="img-section">

                <div className="images">
                    {image ? <div>
                            <div className="image-container">
                                <img className="review-image" src={imageUrl + image} alt=""/>
                            </div>
                            <DefaultButton className="default delete-image"
                                    onClick={(e) => deleteImage(e)}>
                                등록 사진 변경
                            </DefaultButton>
                        </div> :
                        <div className="image-container">

                            <div>
                                <label className="input-file-button" htmlFor="input-file">
                                    <img className="review-image" src={animalPlaceholder} alt=""/>
                                    반려동물의 대표 사진을 등록하세요!
                                </label>
                                <input key={fileKey} id="input-file" className={"input-file"} onChange={(e) => ImgUploadHandler(e)} type="file"
                                       accept="image/*"/>
                            </div>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}
export default InputImage;