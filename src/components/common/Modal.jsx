
import "../../assets/styles/shop/product/qnaModal.scss"
import {useRef} from "react";
const Modal = ({modalOpen, setModalOpen ,children}) => {

    const content = useRef(null);

    const modalClose = (e)=>{
        if (!content.current.contains(e.target)){
             setModalOpen(false);
        }
    }
    // easyClose easyClose?

    return (
        <>{modalOpen &&
            <div onClick={e=> {
                modalClose(e)}} className={'modal-container'}>
                <div ref={content} className={'modal-content'} id = {"content"}>
                    {children}
                </div>

                <button  onClick={modalClose}>x</button>
            </div>
        }</>
    );
};

export default Modal