import {Link} from "react-router-dom";
import ItemDelButton from "./itemDelButton";
import Modal from "../../../common/Modal";
import SellerDiscount from "../SellerDiscount";
import { useState } from "react";

const SellerItem = (props) => {
    
    const { item ,navigateUrl,getItemList, currentPage, getRefreshData, pageType} = props
    
    const [modalOpen, setModalOpen] = useState(false);
    const [suspendOpen, setSuspendOpen] = useState(false);

    console.log("item", item);

    return(
        <>
            {item&&<>
            <li className="sellerItemContainer" key={item.id}>
                <div className="SellerItemId">{item.id}</div>
                <div className="SellerItemImage">
                    <img src={item.thumbnail_url[0]}/>
                </div>
                <div className='SellerItemName'>
                    <Link to={`/shop/detail/${item.id}`}>{item.name}</Link>
                </div>
                <div className='SellerItemPrice'>{item.options[0]?.price} 원</div>
                <div className='SellerItemSpecies'>{item.species === "dog" ? "강아지" : "고양이"}</div>
                <div className='SellerItemCategory'>{item.category}</div>
                {pageType === "suspending" &&
                    <div>
                        <button onClick={() => setSuspendOpen(true)}>사유</button>
                    </div>                
                }
                <div>
                    <button onClick={() => setModalOpen(true)}>할인</button>
                </div>
                <Link to={`/seller/item/edit/${item.id}`}>
                    <div className="SellerItemDelete">
                        <button style={{marginRight: '10px'}}>수정</button>
                    </div>
                </Link>
                <ItemDelButton itemId={item.id} url={navigateUrl} getItemList={() => getItemList(currentPage)}/>
            </li>

            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <SellerDiscount data={item}/>
            </Modal>
            <Modal modalOpen={suspendOpen} setModalOpen={setSuspendOpen}>
                <div style={{backgroundColor:"white", width:"200px", height:"200px"}}>
                    <p>{item.suspensionReason}</p>
                </div>
            </Modal>
            </>
            }
        </>
    )
}
export default SellerItem