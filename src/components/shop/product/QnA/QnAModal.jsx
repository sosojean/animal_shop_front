import {useRef, useState} from "react";
import OptionSelector from "../option/OptionSelector";
import instance from "../../../../utils/axios";
import {useParams} from "react-router-dom";
import Modal from "../../../common/Modal";

const QnAModal = ({data,modalOpen, setModalOpen,isEdited, setIsEdited}) => {

    const [option, setOption] = useState();
    const [userQuestionInput, setUserQuestionInput] = useState({
        item_id :data.id,
        option_name : "",
        option_price : "",
        contents : ""
    })

    const handleSubmit = () => {
        // console.log(userQuestionInput)

        instance({
            url:"http://localhost:8080/item/query/new",
            method:"POST",
            data:userQuestionInput

        }).then((res) => {
            setIsEdited(!isEdited);
            modalClose()
        }).catch((err) => {
            console.log(err)
        })
    }

    //선택옵션 추가핸들러
    const handleSelectChange = (event) => {
        // console.log(event.target.value)
        let index = event.target.value;
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
    const priceTrimmer = (optionPrice)=> {
        const trimmedPrice = optionPrice.toLocaleString() + "원";
        return trimmedPrice;
    }

    return (
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <form action="">
                <OptionSelector optionItem={data.options}
                                handleSelectChange={handleSelectChange}
                                priceTrimmer={priceTrimmer}/>
                <textarea cols="30" rows="10"
                          onChange={e => handleInputChange({contents: e.target.value})}>
                </textarea>
            </form>

            <button onClick={handleSubmit}>
                등록
            </button>
        </Modal>

    );
};

export default QnAModal