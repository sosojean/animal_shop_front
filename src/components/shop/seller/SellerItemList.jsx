import { useEffect, useState } from "react";
import instance from "../../../utils/axios";
import '../../../assets/styles/shop/sellerItemList.scss'
import Pagination from "../../board/Pagination";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ItemDelButton from "./itemDelButton";


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
        <div className="sellerItemListContainer">
            <div className='SellerItemListHeaderContainer'>
                <div className='SellerItemId'>상품번호</div>
                <div className='SellerItemImage'>대표 이미지</div>
                <div className='SellerItemName'>상품명</div>
                <div className='SellerItemPrice'>가격</div>
                <div className='SellerItemSpecies'>동물</div>
                <div className='SellerItemCategory'>상품</div>
                <div className='SellerItemUpdate'>수정</div>
                <div className='SellerItemDelete'>삭제</div>
            </div>
            
            <ul>
                {itemList.map((item) => (
                    <li className="sellerItemContainer" key={item.id}>
                        <div className="SellerItemId">{item.id}</div>
                        <div className="SellerItemImage">
                            <img src={item.thumbnail_url[0]}/>
                        </div>
                        <div className='SellerItemName'>
                            <Link to={`/shop/detail/${item.id}`}>{item.name}</Link>
                        </div>
                        <div className='SellerItemPrice'>{item.options[0].price} 원</div>
                        <div className='SellerItemSpecies'>{item.species}</div>
                        <div className='SellerItemCategory'>{item.category}</div>
                        <Link to={`/seller/item/edit/${item.id}`}>
                            <div className="SellerItemDelete">
                                <button style={{marginRight:'10px'}}>수정</button>
                            </div>
                        </Link>
                        <ItemDelButton itemId={item.id} url={navigateUrl} getItemList={() => getItemList(currentPage)}/>
                    </li>
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