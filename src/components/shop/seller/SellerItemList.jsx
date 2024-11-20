import { useEffect, useState } from "react";
import instance from "../../../utils/axios";
import '../../../assets/styles/shop/sellerItemList.scss'
import Pagination from "../../board/Pagination";
import { useLocation, useNavigate, Link } from "react-router-dom";


const SellerItemList = () => {

    const [itemList, setItemList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1;

    const getItemList = async (page) => {
        try {
            const response = await instance({
                url: `/seller/item/select?page=${page}`,
                method: "get",
            });
    
            setItemList(response.data.itemDTOLists);
            setTotalCount(response.data.total_count);
    
        } catch (error) {
            console.error('데이터 에러 발생:', error);
            alert('데이터를 불러오지 못했습니다.');
        }
    };

    useEffect(() => {
        getItemList(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        navigate(`/seller/item/list?page=${newPage}`);
    };

    const handleDeleteItemData = async (itemId) => {
        try {
            const response = await instance({
                url: `/seller/item/delete/${itemId}`,
                method: "delete",
            });
    
            // 성공적으로 데이터가 삭제된 경우
            console.log('삭제 성공:', response.data);
            alert('상품이 삭제되었습니다.');
            
            getItemList(currentPage);
            navigate(`/seller/item/list?page=${currentPage}`);
    
        } catch (error) {
            // 에러가 발생한 경우
            console.error('삭제 에러 발생:', error);
            alert('상품 삭제에 실패했습니다.');
        }
    };

    return(
        <div>
            <h2>상품 등록 목록</h2>
            
            <ul>
                {itemList.map((item) => (
                    <div className="sellerItemContainer" key={item.id}>
                        <div>상품 번호 {item.id}</div>
                        <img src={item.thumbnail_url[0]} style={{width: '60px', height: '60px', objectFit: 'cover' }}/>
                        <div>상품명 {item.name}</div>
                        <div>가격 {item.options[0].price}</div>
                        <div>동물 {item.species}</div>
                        <div>상품 {item.category}</div>
                        <Link to={`/seller/item/edit/${item.id}`}>
                            <div>
                                <button>수정</button>
                            </div>
                        </Link>
                        <div onClick={() => {
                            handleDeleteItemData(item.id);
                        }}>
                            <button>삭제</button>
                        </div>
                    </div>
                )
            )}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPost={totalCount}
                handlePageChange={handlePageChange}
            />

        </div>
    )
}

export default SellerItemList;