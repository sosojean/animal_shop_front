import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import axios from "axios";

const InputImage = ({imagePath}) =>{

    const [image, setImage] = useState("")
    const imageUrl = "http://localhost:8080/file/image-print?filename=";

    const ImgUploadHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        if (file != null) {
            formData.append('image', new Blob([file], {type: 'multipart/form-data'}), file.name);

            axios({
                url: `http://localhost:8080/file/${imagePath}`,
                method: 'POST',
                data: formData,
            }).then((response) => {
                console.log(response.data);
                setImage(response.data);


            }).catch((error) => {
                console.log(error)
            })
        }
    }


    const deleteImage = (e) => {
        e.preventDefault();
        setImage("");
    }


    return(
        <>
            <div className="img-section">
                <label className="input-file-button" htmlFor="input-file"><FontAwesomeIcon
                    icon={faImage}/></label>
                <div className="images">
                    {image ?(<>
                        <img className="review-image" src={imageUrl + image} alt=""/>
                        <button className="delete-image"
                                onClick={(e) => deleteImage(e)}>x</button>
                        </>):
                        <span>placeholder</span>
                    }
                </div>
            </div>
            <input id="input-file" onChange={(e) => ImgUploadHandler(e)} type="file"
                   accept="image/*"/>
        </>
    )
}
export default InputImage;