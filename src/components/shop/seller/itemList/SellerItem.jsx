import {Link} from "react-router-dom";
import ItemDelButton from "../itemDelButton";

const SellerItem = ({item ,navigateUrl,getItemList, currentPage }) => {
    return(
        <>
            <li className="sellerItemContainer" key={item.id}>
                <div className="SellerItemId">{item.id}</div>
                <div className="SellerItemImage">
                    <img src={item.thumbnail_url[0]}/>
                </div>
                <div className='SellerItemName'>
                    <Link to={`/shop/detail/${item.id}`}>{item.name}</Link>
                </div>
                <div className='SellerItemPrice'>{item.options[0].price} 원</div>
                <div className='SellerItemSpecies'>{item.species}</div>
                <div className='SellerItemCategory'>{item.category}</div>
                <Link to={`/seller/item/edit/${item.id}`}>
                    <div className="SellerItemDelete">
                        <button style={{marginRight: '10px'}}>수정</button>
                    </div>
                </Link>
                <ItemDelButton itemId={item.id} url={navigateUrl} getItemList={() => getItemList(currentPage)}/>
            </li>
        </>
    )
}
export default SellerItem