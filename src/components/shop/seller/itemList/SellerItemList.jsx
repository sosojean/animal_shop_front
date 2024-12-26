import { useEffect, useState } from "react";
import instance from "../../../../utils/axios";
import '../../../../assets/styles/shop/sellerItemList.scss'
import Pagination from "../../../board/Pagination";
import { useLocation, useNavigate, Link } from "react-router-dom";
import SellerItem from "./SellerItem";
import SellerMenu from "../SellerMenu";
import SellerItemSearch from "./SellerItemSearch";
import Title from "../../../common/Title";


const SellerItemList = ({navigateUrl}) => {

    const [itemList, setItemList] = useState([]); // 아이템 리스트
    const [totalCount, setTotalCount] = useState(0); // 아이템 개수
    const [params, setParams] = useState({}); // 검색 PARAMS

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1; // 현재 페이지 확인

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

    const getSearchList = async(page) => {
        try {
            const response = await instance({
                url: `/seller/search?page=${page}`,
                method: "get",
                params: {...params}
            });
    
            setItemList(response.data.itemDTOLists);
            setTotalCount(response.data.total_count);
    
        } catch (error) {
            console.error('데이터 에러 발생:', error);
            alert('데이터를 불러오지 못했습니다.');
        }
    }

    const getRefreshData = () => {
        getSearchList(currentPage);
    }

    useEffect(() => {
        // getItemList(currentPage);
        getSearchList(currentPage);
    }, [currentPage, params]);

    const handlePageChange = (newPage) => {
        navigate(`/seller/item/list?page=${newPage}`); // 페이지 변화
    };

    return(<>
        <SellerMenu/>
        <Title>상품관리</Title>
        <SellerItemSearch params={params} setParams={setParams}
            getRefreshData={getRefreshData} totalCount={totalCount}/>
        <div className="sellerItemListContainer">
            <div className='SellerItemListHeaderContainer'>
                <div className='SellerItemId'>상품번호</div>
                <div className='SellerItemImage'>대표 이미지</div>
                <div className='SellerItemName'>상품명</div>
                <div className='SellerItemPrice'>가격</div>
                <div className='SellerItemSpecies'>동물</div>
                <div className='SellerItemCategory'>상품</div>
                <div className='SellerItemCategory'>세부</div>
                <div>상태</div>
                <div>할인</div>
                <div className='SellerItemUpdate'>수정</div>
                <div className='SellerItemDelete'>삭제</div>
            </div>
            
            <ul>
                {itemList.map((item) => (
                    <SellerItem
                        key={item.id}
                        item={item}
                        navigateUrl={navigateUrl}
                        getItemList={getItemList}
                        currentPage={currentPage}
                        getRefreshData={getRefreshData}
                    />
                )
            )}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPost={totalCount}
                handlePageChange={handlePageChange}
            />
        </div>
    </>)
}

export default SellerItemList;