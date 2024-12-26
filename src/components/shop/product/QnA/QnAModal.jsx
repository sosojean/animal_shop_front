import {useRef, useState} from "react";
import Selector from "../../../common/Selector";
import instance from "../../../../utils/axios";
import {useParams} from "react-router-dom";
import Modal from "../../../common/Modal";
import "../../../../assets/styles/shop/product/qnaModal.scss";
import {toast} from "react-toastify";




const QnAModal = ({data,modalOpen, setModalOpen,isEdited, setIsEdited}) => {

    const [option, setOption] = useState();
    const [userQuestionInput, setUserQuestionInput] = useState({
        item_id :data.id,
        option_name : "",
        option_price : "",
        contents : ""
    })

    const handleSubmit = () => {
        instance({
            url:`${process.env.REACT_APP_API}/item/query/new`,
            method:"POST",
            data:userQuestionInput

        }).then((res) => {
            setIsEdited(!isEdited);
            toast.success("문의를 등록하였습니다.")
            modalClose()
        }).catch((err) => {
            console.log(err)
        })
    }

    //선택옵션 추가핸들러
    const handleSelectChange = (_,val) => {
        // console.log(event.target.value)
        console.log(val);
        let index = val;
        console.log(index);


        setOption(index);
        //
        const optionName  = data.options[index].name
        const optionPrice  = data.options[index].price
        handleInputChange({
            option_name: optionName,
            option_price: optionPrice,
        });
    };


    const handleInputChange = (updates) => {
        setUserQuestionInput((prevState) => ({
            ...prevState,
            ...updates,
        }));
    };

    const modalClose = (e)=>{
            setModalOpen(false);
    }


    const trimOptionText = (option, priceTrimmer)=>{
        return  `${option.name} ${option.price}`;

    }

    return (
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className={'qna-form-container'}>
                <form action="">
                    <Selector optionItems={data.options}
                              handleSelectChange={handleSelectChange}
                              trimOptionText={trimOptionText}
                              value={data.option_name}
                              name={data.option_name}
                        // selectedValue =
                    />


                    <textarea cols="30" rows="10"
                              onChange={e => handleInputChange({contents: e.target.value})}>
                </textarea>
                </form>
                <div className={"buttons"}>
                <button onClick={handleSubmit}>
                    등록
                </button>
                <button className="modal-close" onClick={() => setModalOpen(false)}>
                    닫기
                </button>
                </div>
            </div>


        </Modal>

    );
};

export default QnAModal