import DefaultButton from "../../../common/DefaultButton";
import instance from "../../../../utils/axios";
import { toast } from "react-toastify";

const CartButton = (props) => {

    const {data, session, stocks} = props;

    // 옵션을 담는 세션
    const addOptions = () => {

        let sessionOptions = {
            itemId: data?.id,
            options: data?.options
        }

        console.log("sessionOptions", sessionOptions);

        let storageOpitons = localStorage.getItem("options");
        storageOpitons = storageOpitons ? JSON.parse(storageOpitons) : [];

        let validItemId = storageOpitons.find(options =>
            sessionOptions.itemId === options.itemId)

        if (!validItemId) {
            storageOpitons.push(sessionOptions);
            localStorage.setItem("options", JSON.stringify(storageOpitons));
        }
    }

    // 비로그인 회원 장바구니 담기
    const addCart = () => {
        const itemList = session; // 추가하려는 상품 리스트
        let isSuccess = false;

        if (session.length > 0) {
            // localStorage에서 cart 데이터를 가져오기
            let storageCart = localStorage.getItem("cart");
            storageCart = storageCart ? JSON.parse(storageCart) : []; // JSON 파싱 또는 빈 배열로 초기화
        
            // itemList를 순회하여 storageCart에 추가 또는 업데이트
            itemList.forEach((item) => {
                const existingItemIndex = storageCart.findIndex(
                    (cartItem) =>
                        cartItem.cartItemId === item.cartItemId && cartItem.option_name === item.option_name
                );
        
                if (existingItemIndex !== -1) {
                    // 동일한 itemId와 optionId가 있을 경우 count 업데이트
                    storageCart[existingItemIndex].count += item.count;
                } else {
                    // 새로운 항목일 경우 추가
                    storageCart.push(item);
                }
            });
        
            // 업데이트된 storageCart를 다시 localStorage에 저장
            localStorage.setItem("cart", JSON.stringify(storageCart));
            addOptions();

            return isSuccess
        } else {
            // toast.error("옵션을 먼저 선택해주세요")
            isSuccess = false;
            return isSuccess;
        }
    
    };

    // post 통신
    const handlePostCart = () => {
        const data = stocks;
        let error = 0;

        if (data.length > 0) {
            data.map((v, i) => {
                instance({
                    url: "/cart/add",
                    method: "post",
                    data: v
                }).then(res=>{

                }).catch(err=>{
                    console.log(err);
                    error = error + 1;
                })
            })
            return error;       
        } else {
           error = 1;
           return error; 
        }
    }

    const getCartValidation = () => {
        const errorCount = handlePostCart() > 0;
        const checkSuccess = addCart();

        if (errorCount) { 
            if (!checkSuccess) { toast.error("옵션을 먼저 선택해주세요."); }
            else {toast.error("장바구니에 담는 중에 오류가 발생했습니다.");}
        } else { toast.success("장바구니에 담았습니다!"); }
    }


    return (
        <DefaultButton className={"default long"} onClick={() => {
            getCartValidation();
        }}>
            장바구니
        </DefaultButton>
    )
}

export default CartButton;