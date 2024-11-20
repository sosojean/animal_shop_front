import { useEffect, useState } from "react";
import instance from "../../../utils/axios";


const SellerItemList = () => {

    const [itemList, setItemList] = useState([]);

    const getItemList = async () => {
        try {
            const response = await instance({
                url: `/seller/item/select?page=1`,
                method: "get",
            });
    
            console.log('데이터 성공: ', response.data);
            setItemList(response.data.itemDTOLists);
    
        } catch (error) {
            console.error('데이터 에러 발생:', error);
            alert('데이터를 불러오지 못했습니다.');
        }
    };

    useEffect(() => {
        getItemList();
    }, [])

    return(
        <div>
            Seller Item List Test
            
            <ul>
                {itemList.map((item) => (
                    <div key={item.id}>
                        <img src={item.thumbnail_url[0]} style={{width: '200px', height: '200px', objectFit: 'cover' }}/>
                        <div>상품명 {item.name}</div>
                        <div>가격 {item.options[0].price}</div>
                        <div>동물 {item.species}</div>
                        <div>상품 {item.category}</div>
                        <div>
                            <button>수정</button>
                        </div>
                        <div>
                            <button>삭제</button>
                        </div>
                    </div>
                )
            )}
            </ul>

        </div>
    )
}

export default SellerItemList;