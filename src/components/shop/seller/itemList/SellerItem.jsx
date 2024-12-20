import {Link} from "react-router-dom";
import ItemDelButton from "./itemDelButton";
import Modal from "../../../common/Modal";
import SellerDiscount from "../SellerDiscount";
import DefaultButton from "../../../common/DefaultButton";
import { allItemCategory, dogItemCategory, sellStatusCategory } from "../../../../utils/categoryOption";
import { useState } from "react";

const SellerItem = (props) => {
    
    const { item ,navigateUrl,getItemList, currentPage, getRefreshData, pageType} = props
    
    const [modalOpen, setModalOpen] = useState(false);
    const [suspendOpen, setSuspendOpen] = useState(false);

    const getConvertedStatus = () => {
        const status = item.sell_status;
        const statusIndex = sellStatusCategory.findIndex(v => v.name === status);

        if (statusIndex > -1){
            const convert = sellStatusCategory[statusIndex].convert;
            return convert;
        } else {
            return " ";
        }
    }

    const getConvertedMain = () => {
        const main = item.category;
        const mainIndex = dogItemCategory.findIndex(v => v.main.name === main);

        if (mainIndex > -1){
            const convert = dogItemCategory[mainIndex].main.convert;
            return convert;
        } else {
            return " ";
        }
    }

    const getConvertedName = () => {
        const detail = item.detailed_category;
        const detailIndex = allItemCategory.findIndex(v => v.name === detail);

        console.log(detailIndex);

        if (detailIndex > -1){
            const convert = allItemCategory[detailIndex].convert;
            return convert;
        } else {
            return " ";
        }
    }

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
                <div className='SellerItemPrice'>{item.options[0]?.price.toLocaleString()} 원</div>
                <div className='SellerItemSpecies'>{item.species === "dog" ? "강아지" : "고양이"}</div>
                <div className='SellerItemCategory'>{getConvertedMain()}</div>

                <div className='SellerItemCategory'>{getConvertedName()}</div>
                <div className='SellerItemCategory'>{getConvertedStatus()}</div>
                {pageType === "suspending" &&
                    <div>
                        <button onClick={() => setSuspendOpen(true)}>사유</button>
                    </div>                
                }
                <div>
                    <DefaultButton onClick={() => setModalOpen(true)}>할인</DefaultButton>
                </div>
                <Link to={`/seller/item/edit/${item.id}`}>
                    <div className="SellerItemDelete">
                        <DefaultButton style={{marginRight: '10px'}}>수정</DefaultButton>
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