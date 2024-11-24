import instance from "../../../utils/axios";

const ItemRegButton = ({getRegisterData}) => {

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

            // navigate('/seller');

        } catch (error) {
            // 에러가 발생한 경우
            console.log('에러 발생:', error);
        }
    }

    // const handlePatchItemData = () => {
    //     const markdown = editorRef.current.getInstance().getMarkdown(); // contents 가져오기
    //     console.log("handlePatchItemData");
    //     console.log(markdown);

    //     const data = {
    //         "id": itemId,
    //         "option": options,
    //         "name": itemName,
    //         "item_detail": markdown,
    //         "stock_number": itemStock,
    //         "sell_status": sellStatus,
    //         "species": itemSpecies,
    //         "category": itemType,
    //         "thumbnailUrls": thumnailsUrls,
    //         "imageUrl": detailImageUrl
    //     }

    //     console.log(data)

    //     try {
    //         const response = instance({
    //             url: "/seller/item/update",
    //             method: "patch",
    //             data: data
    //         });

    //         // 성공적으로 데이터가 저장된 경우
    //         console.log('수정 성공:', response.data);

    //         navigate('/');

    //     } catch (error) {
    //         // 에러가 발생한 경우
    //         console.log('에러 발생:', error);
    //     }
    // }

    // const handleDeleteItemData = async () => {
    //     try {
    //         const response = await instance({
    //             url: `/seller/item/delete/${itemId}`,
    //             method: "delete",
    //         });

    //         // 성공적으로 데이터가 삭제된 경우
    //         console.log('삭제 성공:', response.data);
    //         alert('상품이 삭제되었습니다.');
    //         navigate('/'); // 삭제 후 홈으로 이동

    //     } catch (error) {
    //         // 에러가 발생한 경우
    //         console.error('삭제 에러 발생:', error);
    //         alert('상품 삭제에 실패했습니다.');
    //     }
    // };

    return (
        <div className='ItemRegButton'>
            {/* {itemId ?
                <div>
                    <button onClick={handlePatchItemData}>수정</button>
                    <button onClick={handleDeleteItemData}>삭제</button>
                </div>
                : <button onClick={handleItemRegister}>등록</button>
            } */}
            <button onClick={handleItemRegister}>등록</button>
        </div>
    )
}

export default ItemRegButton;