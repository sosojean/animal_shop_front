import instance from "../../../../utils/axios";
import DefaultButton from "../../../common/DefaultButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ItemDelButton = ({itemId, url, getItemList, getRefreshData}) => {

    const navigate = useNavigate();

    const handleDeleteItemData = async (itemId) => {
        try {
            const response = await instance({
                url: `/seller/item/discontinue/${itemId}`,
                method: "PATCH",
            });
    
            // 성공적으로 데이터가 삭제된 경우
            console.log('삭제 성공:', response.data);
            toast.success('상품이 품절처리 됐습니다.');
            
            getRefreshData();
            navigate(url); // 리다이렉트할 url String 입력
    
        } catch (error) {
            // 에러가 발생한 경우
            console.error('삭제 에러 발생:', error);
            toast.error('상품 품절처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <div onClick={() => {handleDeleteItemData(itemId);}}>
            <DefaultButton>삭제</DefaultButton>
        </div>
    )
}

export default ItemDelButton;