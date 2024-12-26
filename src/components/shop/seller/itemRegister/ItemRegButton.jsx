import instance from "../../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultButton from "../../../common/DefaultButton";

const ItemRegButton = ({getRegisterData, itemId, options, nameCount, thumnailsUrls}) => {

    const navigate = useNavigate();
    const defaultPrice = options[0].price;

    // 상품 등록, 수정, 삭제
    const handleItemRegister = async () => {

        const data = getRegisterData();
        console.log("등록 데이터", data);

        if (data.stock_number === 0) {
            toast.warn("재고는 1개 이상이어야 합니다.")
        } else {
            try {
                const response = await instance({
                    url: "/seller/item/new",
                    method: "post",
                    data: data
                });

                // 성공적으로 데이터가 저장된 경우
                // console.log('등록 성공:', response.data);
                toast.success("성공적으로 상품이 등록됐습니다.");
                navigate('/seller');

            } catch (error) {
                // 에러가 발생한 경우
                console.log('에러 발생:', error);
                toast.error("상품 등록 중에 오류가 발생됐습니다.")
            }            
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
            // console.log('수정 성공:', response.data);
            toast.success("성공적으로 상품이 수정됐습니다.");
            navigate('/seller');

        } catch (error) {
            // 에러가 발생한 경우
            toast.error("수정 등록 중에 오류가 발생했습니다.");
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
            // console.log('삭제 성공:', response.data);
            toast.success("성공적으로 상품이 판매종료 됐습니다.");
            navigate('/seller'); // 삭제 후 홈으로 이동

        } catch (error) {
            // 에러가 발생한 경우
            console.error('삭제 에러 발생:', error);
            toast.error("상품 판매종료 중에 오류가 발생했습니다.");
        }
    };

    const validatePostData = () => {
        const price = parseFloat(defaultPrice);
        console.log("thumnailesurls", thumnailsUrls);

        if (isNaN(price) || price < 9) {
          toast.warn("기본 가격은 10원 이상이어야 합니다.");
          return false;
        } else if (nameCount < 1) {
            toast.warn("상품명은 1자 이상이어야 합니다.");
            return false;
        } else if (!thumnailsUrls || thumnailsUrls.length < 1) {
            toast.warn("대표 이미지는 1개 이상이어야 합니다.");
            return false;
        }
        return true;
      };

    return (
        <div className='ItemRegButton'>
            {itemId ?
                <div>
                    <DefaultButton className="long primary" onClick={() => {
                        if (validatePostData()){handlePatchItemData();}}}>
                            수정
                    </DefaultButton>
                    <DefaultButton className="long primary" onClick={handleDeleteItemData}>단종(품절)</DefaultButton>
                </div>
                : <DefaultButton className="long primary" onClick={() => {
                    if (validatePostData()){handleItemRegister();}}}>
                        등록
                  </DefaultButton>
            }
        </div>
    )
}

export default ItemRegButton;