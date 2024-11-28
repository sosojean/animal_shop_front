import { useState } from 'react';
import '../../../assets/styles/shop/order/cartModal.scss'
import CartOption from './CartOption';
import instance from '../../../utils/axios';

const CartModal = ({modalData, refreshCartList}) => {

    console.log("CartModal", modalData);

    const lastIndex = modalData?.options.length-1;
    const optionItem = modalData ? modalData.options : [];

    const [selectedIndex, setSelectedIndex] = useState();
    const [stock, setStock] = useState(1);

    const handleUpdateCart = () => {

        const data = {
            cartItemId : modalData.cartItemId,
            optionId : optionItem[selectedIndex].optionId,
            count : stock
        }

        instance({
            url: `/cart/update/${modalData.cartItemId}`,
            method: "patch",
            data: data,
          })
            .then((res) => {
              console.log("handleUpdateCart 성공 ", res.data);
              alert("장바구니가 수정됐습니다");

              // 부모 컴포넌트 데이터 갱신
              refreshCartList();
            })
            .catch((err) => {
              console.log("handleUpdateCart 실패 ", err);
            });
    }

    return (
        <div className='cart-modal-container'>
            <div className='header-container'>
                <div className='header'>
                    <img src={modalData?.cartItemImg}/>
                    <div>
                        <h1>{modalData?.cartItemName}</h1>
                        <h2>{modalData?.options[lastIndex].price} 원</h2>
                    </div>
                </div>
                <div className='option'>
                    <select defaultValue="placeholder" value={selectedIndex} 
                        onChange={(e) => { setSelectedIndex(e.target.value) }}>
                        <option value="placeholder" disabled hidden>옵션 선택</option>
                        {optionItem.map((option, index) => {
                            return (
                                <option value={index}>
                                    {option.name + " " + option.price + "원"}
                                </option>
                            )
                        })}
                    </select>
                    {selectedIndex &&
                        <CartOption
                            name = {optionItem[selectedIndex].name}
                            price = {optionItem[selectedIndex].price}
                            stock = {stock}
                            setStock = {setStock}
                        />
                    }
                </div>
            </div>
            <div className='footer-container'>
                <div className='total-price'>
                    
                </div>
                <div className='buttons'>
                    <button onClick={handleUpdateCart}>수정</button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
