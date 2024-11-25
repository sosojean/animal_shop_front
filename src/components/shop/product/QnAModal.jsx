import {useRef, useState} from "react";
import OptionSelector from "./OptionSelector";
import instance from "../../../utils/axios";
import {useParams} from "react-router-dom";

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
            // console.log(userQuestionInput)

            // console.log(res.data)

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
        <>{modalOpen &&
                <div className={'modal-container'}>
                    <div className={'modal-content'}>
                        <form action="">
                            <OptionSelector optionItem={data.options} handleSelectChange={handleSelectChange} priceTrimmer={priceTrimmer}/>
                            <textarea cols="30" rows="10"
                                      onChange={e => handleInputChange({contents: e.target.value})}>
                            </textarea>
                        </form>
                    </div>
                    <button onClick={handleSubmit}>
                        등록
                    </button>

                    <button onClick={modalClose}>
                        x
                    </button>
                </div>}</>
    );
};

export default QnAModal