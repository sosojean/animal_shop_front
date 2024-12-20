import instance from "../../../../utils/axios";
import DefaultButton from "../../../common/DefaultButton";
import { useNavigate } from "react-router-dom";

// delete api url에 사용할 itemId
// navigate에 사용할 url
// 페이지 정보를 다시 불러올 get api 함수
const ItemDelButton = ({itemId, url, getItemList}) => {

    const navigate = useNavigate();

    const handleDeleteItemData = async (itemId) => {
        try {
            const response = await instance({
                url: `/seller/item/discontinue/${itemId}`,
                method: "PATCH",
            });
    
            // 성공적으로 데이터가 삭제된 경우
            console.log('삭제 성공:', response.data);
            alert('상품이 판매종료 됐습니다.');
            
            getItemList();
            navigate(url); // 리다이렉트할 url String 입력
    
        } catch (error) {
            // 에러가 발생한 경우
            console.error('삭제 에러 발생:', error);
            alert('상품 판매종료에 실패했습니다.');
        }
    };

    return (
        <div onClick={() => {handleDeleteItemData(itemId);}}>
            <DefaultButton>삭제</DefaultButton>
        </div>
    )
}

export default ItemDelButton;