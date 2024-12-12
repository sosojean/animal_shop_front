import React, {useEffect, useState} from 'react';
import AdminMenu from "../../../components/shop/admin/AdminMenu";
import SellerMenu from "../../../components/shop/seller/SellerMenu";
import instance from "../../../utils/axios";
import SellerItemList from "../../../components/shop/seller/itemList/SellerItemList";
import SellerItem from "../../../components/shop/seller/itemList/SellerItem";
import '../../../assets/styles/shop/sellerItemList.scss'

const SellerSuspendingItems = () => {

    const [data, setData] = useState();
    const pageType = "suspending";

    useEffect(() => {
        instance({
            url:"/seller/stop-item/select",
            method:"get",
        }).then(res=>{
            setData(res.data.itemDTOLists)
        }).catch(err=>{
            console.log(err)
        })
    }, []);

    return (
        <div>

            <SellerMenu/>
            <div className="sellerItemListContainer">

                <div className='SellerItemListHeaderContainer'>
                    <div className='SellerItemId'>상품번호</div>
                    <div className='SellerItemImage'>대표 이미지</div>
                    <div className='SellerItemName'>상품명</div>
                    <div className='SellerItemPrice'>가격</div>
                    <div className='SellerItemSpecies'>동물</div>
                    <div className='SellerItemCategory'>상품</div>
                    <div>중단사유</div>
                    <div>할인</div>
                    <div className='SellerItemUpdate'>수정</div>
                    <div className='SellerItemDelete'>삭제</div>
                </div>
                {data && data.map(item => {
                        return (<SellerItem item={item} navigateUrl={"#"} pageType={pageType}
                                            getItemList={function () {
                                            }} currentPage={1}/>)
                    }
                )}

            </div>
        </div>
    );
};

export default SellerSuspendingItems;