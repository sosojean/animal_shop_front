import '../../../assets/styles/shop/seller/sellerItemListHeader.scss'

const SellerItemListHeader = () => {

    return(
        <div className='SellerItemListHeaderContainer'>
            <div className='SellerItemId'>상품번호</div>
            <div className='SellerItemImage'>대표 이미지</div>
            <div className='SellerItemName'>상품명</div>
            <div className='SellerItemPrice'>가격</div>
            <div className='SellerItemSpecies'>동물</div>
            <div className='SellerItemCategory'>상품</div>
            <div className='SellerItemUpdate'>수정</div>
            <div className='SellerItemDelete'>삭제</div>
        </div>
    )
}

export default SellerItemListHeader;