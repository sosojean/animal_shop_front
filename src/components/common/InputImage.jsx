import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import axios from "axios";
import "../../assets/styles/common/inputImage.scss"
import animalPlaceholder from "../../../src/assets/img/animalPlaceholder.svg"

const InputImage = ({imageUploadPath, setImage,image,objName}) =>{

    const [file, setFile] = useState()
    const imageUrl = "http://localhost:8080/file/image-print?filename=";

    const ImgUploadHandler = async (e) => {
        console.log("img upload")

        const file = e.target.files[0];
        setFile(file)
        const formData = new FormData();
        if (file != null) {
            formData.append('image', new Blob([file], {type: 'multipart/form-data'}), file.name);

            axios({
                url: `http://localhost:8080/file/${imageUploadPath}`,
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
        setImage(objName,"");
    }


    return(
        <div>
            <div className="img-section">

                <div className="images">
                    {image ? (<div>
                            <div className="image-container">
                                <img className="review-image" src={imageUrl + image} alt=""/>
                            </div>
                            <button className="delete-image"
                                    onClick={(e) => deleteImage(e)}>x
                            </button>
                        </div>) :




                        <div className="image-container">
                            <img className="review-image" src={animalPlaceholder} alt=""/>
                        </div>
                    }
                </div>
            </div>
            <label className="input-file-button" htmlFor="input-file">
                파일
            </label>
            <input id="input-file" onChange={(e) => ImgUploadHandler(e)} type="file"
                   accept="image/*"/>
        </div>
    )
}
export default InputImage;