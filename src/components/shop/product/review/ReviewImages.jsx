import {useState} from "react";
import Modal from "../../../common/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

const ReviewImages = ({images})=>{
    // console.log(images);
    const url = `${process.env.REACT_APP_API}/file/image-print?filename=`;
    const imageContainerLength = 10
    const [modal, setModal] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)




    // images.length >= 10 ? images.length

    const getPrevImage = () => {
        if (imageIndex!=0){
            setImageIndex(imageIndex-1)
        }


    }

    const getNextImage = () => {
        if ( imageIndex!=(images.length-1)){
            setImageIndex(imageIndex+1)

        }

    }

    const imgClickHandler = (e) => {
        console.log(imageIndex)
        let index = parseInt(e.target.id);

        setImageIndex(index)

        setModal(true)
    }

    return(<div className="review-images">
        <Modal modalOpen={modal} setModalOpen={setModal} easyClose={true}>
            <div className="modal-images-controller">
                <button className="image-switch" onClick={getPrevImage} disabled={imageIndex==0} ><FontAwesomeIcon icon={faAngleLeft}/></button>
                <img src={url + images[imageIndex]} className="modal-image" alt=""/>
                <button className="image-switch" onClick={getNextImage}  disabled={ imageIndex==(images.length-1)}  ><FontAwesomeIcon icon={faAngleRight}/></button>
            </div>
        </Modal>
        {images.slice(0, imageContainerLength)
            .map((image, i) => {
                const returnImage = (i != imageContainerLength-1)?
                <button key={image} onClick={(e)=>{imgClickHandler(e)}}>
                    <img src={url + image} className="review-image" id={i} alt=""/>
                </button> :
                <button key={image} onClick={(e)=>{imgClickHandler(e)}} className="last-image">
                    <span id={i} className={"count-text"}>{ `+${images.length-10}`}</span>
                    <img src={url + image} className="review-image dark" id={i} alt=""/>
                </button>
                return returnImage
            })}
        {/*  todo  10개까지 슬라이스 해서 보여주고 나서 나머지는 디테일 모달에서 보여주기*/}
    </div>)
}
export default ReviewImages;