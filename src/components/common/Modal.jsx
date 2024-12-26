
import "../../assets/styles/shop/product/modal.scss"
import {useRef} from "react";
const Modal = ({modalOpen, setModalOpen ,children, easyClose}) => {

    const content = useRef(null);

    const modalClose = (e)=>{
        if (easyClose&&!content.current.contains(e.target)){
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
            </div>
        }</>
    );
};

export default Modal