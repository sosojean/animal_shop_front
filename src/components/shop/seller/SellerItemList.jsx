import { useEffect, useState } from "react";
import instance from "../../../utils/axios";
import '../../../assets/styles/shop/sellerItemList.scss'
import Pagination from "../../board/Pagination";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ItemDelButton from "./itemDelButton";
import SellerItemListHeader from "./SellerItemListHeader";


const SellerItemList = ({navigateUrl}) => {

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

    return(
        <div>

            <SellerItemListHeader/>
            
            <ul>
                {itemList.map((item) => (
                    <div className="sellerItemContainer" key={item.id}>
                        <div className="SellerItemId">{item.id}</div>
                        <img className="SellerItemImage" src={item.thumbnail_url[0]} style={{width: '60px', height: '60px', objectFit: 'cover' }}/>
                        <div>{item.name}</div>
                        <div>{item.options[0].price} 원</div>
                        <div>{item.species}</div>
                        <div>{item.category}</div>
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