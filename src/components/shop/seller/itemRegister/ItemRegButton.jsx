import instance from "../../../../utils/axios";
import { useNavigate } from "react-router-dom";

const ItemRegButton = ({getRegisterData, itemId, options}) => {

    const navigate = useNavigate();
    const defaultPrice = options[0].price;

    // 상품 등록, 수정, 삭제
    const handleItemRegister = async () => {
        console.log("handleItemRegister");

        const data = getRegisterData();
        console.log("등록 데이터", data);

        try {
            const response = await instance({
                url: "/seller/item/new",
                method: "post",
                data: data
            });

            // 성공적으로 데이터가 저장된 경우
            console.log('등록 성공:', response.data);

            navigate('/seller');

        } catch (error) {
            // 에러가 발생한 경우
            console.log('에러 발생:', error);
        }
    }

    const handlePatchItemData = async () => {
        console.log("handlePatchItemData");

        const data = getRegisterData();

        try {
            const response = await instance({
                url: "/seller/item/update",
                method: "patch",
                data: data
            });

            // 성공적으로 데이터가 저장된 경우
            console.log('수정 성공:', response.data);
            alert('상품이 수정되었습니다.');

            navigate('/seller');

        } catch (error) {
            // 에러가 발생한 경우
            console.log('수정 에러 발생:', error);
        }
    }

    const handleDeleteItemData = async () => {
        try {
            const response = await instance({
                url: `/seller/item/discontinue/${itemId}`,
                method: "PATCH",
            });

            // 성공적으로 데이터가 삭제된 경우
            console.log('삭제 성공:', response.data);
            alert('상품이 판매종료 되었습니다.');
            navigate('/seller'); // 삭제 후 홈으로 이동

        } catch (error) {
            // 에러가 발생한 경우
            console.error('삭제 에러 발생:', error);
            alert('상품 판매종료에 실패했습니다.');
        }
    };

    return (
        <div className='ItemRegButton'>
            {itemId ?
                <div>
                    <button onClick={() => {
                        if (defaultPrice !== '' && defaultPrice !== '0') {
                            handlePatchItemData();
                        } else {
                            alert("가격을 작성해주세요!")
                        }}}>
                            수정
                    </button>
                    <button onClick={handleDeleteItemData}>판매종료</button>
                </div>
                : <button onClick={() => {
                    if (defaultPrice !== '' && defaultPrice !== '0') {
                        handleItemRegister();
                    } else {
                        alert("가격을 작성해주세요!")
                    }}}>
                        등록
                  </button>
            }
        </div>
    )
}

export default ItemRegButton;