import { useEffect, useState } from "react";
import instance from "../../../utils/axios";
import '../../../assets/styles/shop/sellerItemList.scss'
import Pagination from "../../board/Pagination";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ItemDelButton from "./itemDelButton";


const SellerItemList = () => {

    const [itemList, setItemList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1;
    const navigateUrl = `/seller/item/list?page=${currentPage}`

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
                        <ItemDelButton itemId={item.id} url={navigateUrl} getItemList={() => getItemList(currentPage)}/>
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