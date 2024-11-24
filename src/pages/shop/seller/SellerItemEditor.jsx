import '../../../assets/styles/shop/seller/sellerItemRegister.scss'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import instance from '../../../utils/axios';
import SellerNameRegister from '../../../components/shop/seller/SellerNameRegister';
import SellerItemStock from '../../../components/shop/seller/SellerItemStock';
import SellerItemStatus from '../../../components/shop/seller/SellerItemStatus'
import SellerItemCategory from '../../../components/shop/seller/SellerItemCategory';
import SellerItemOption from '../../../components/shop/seller/SellerItemOption';
import SellerDetailImage from '../../../components/shop/seller/SellerDetailImage';
import SellerThumbnails from '../../../components/shop/seller/SellerThumbnails';
import SellerDescription from '../../../components/shop/seller/SellerDescription';
import ItemRegButton from '../../../components/shop/seller/ItemRegButton';

const SellerItemEditor = () => {

    // SellerNameRegister
    const [itemName, setItemName] = useState(""); // 상품명
    const [nameCount, setNameCount] = useState(0); // 글자수

    // SellerItemStock
    const [itemStock, setItemStock] = useState(); // 상품재고

    // SellerItemStatus
    const [sellStatus, setSellStatus] = useState("SELL"); // 상품상태

    // SellerItemCategory
    const [itemSpecies, setItemSpecies] = useState("강아지"); // 동물종류
    const [itemType, setItemType] = useState("간식"); // 상품종류

    // SellerItemOption
    const [options, setOptions] = useState([]); // 옵션
    const [newOption, setNewOption] = useState({ name: '', price: '' }); // 옵션 추가용 state

    // SellerDetailImage
    const [detailImageUrl, setDetailImageUrl] = useState(""); // 상세 이미지

    // SellerThumbnails
    const [thumnailsUrls, setThumnailsUrls] = useState([]); // 썸네일 이미지

    const editorRef = useRef(null);

    const navigate = useNavigate();
    const { itemId } = useParams();

    const getRegisterData = () => {
        const markdown = editorRef.current.getInstance().getMarkdown(); // contents 가져오기
        console.log("getRegisterData");
        console.log(markdown);

        const data = {
            "option": options,
            "name": itemName,
            "item_detail": markdown,
            "stock_number": itemStock,
            "sell_status": sellStatus,
            "species": itemSpecies,
            "category": itemType,
            "thumbnailUrls": thumnailsUrls,
            "imageUrl": detailImageUrl
        }

        return data;
    }

    // 수정할 상품의 정보를 가져오기
    useEffect(() => {
        if (itemId) {
            getItemData();
        }
    }, [itemId]);

    const getItemData = async () => {
        try {
            const response = await instance.get(`/seller/item/select/${itemId}`);
            const item = response.data;
            console.log(item);

            setItemName(item.name);
            setItemSpecies(item.species);
            setItemType(item.category);
            setSellStatus(item.sell_status);
            setItemStock(item.stock_number);
            setDetailImageUrl(item.image_url);
            setThumnailsUrls(item.thumbnail_url);
            setOptions(item.options);
            // 에디터에 기존 상품 설명 로드
            editorRef.current.getInstance().setMarkdown(item.item_detail);
        } catch (error) {
            console.error('상품 정보 로드 실패:', error);
            alert('상품 정보 로드 실패');
        }
    }

    return (
        <div className='itemRegContainer'>
            <h1>SellerItemRegister 모듈화 테스트 페이지</h1>

            <h1>{itemId ? '상품 수정' : '상품 등록'}</h1>

            <SellerNameRegister itemName={itemName} setItemName={setItemName} nameCount={nameCount} setNameCount={setNameCount}/>
            <SellerItemStock itemStock={itemStock} setItemStock={setItemStock}/>
            <SellerItemStatus sellStatus={sellStatus} setSellStatus={setSellStatus}/>
            <SellerItemCategory itemSpecies={itemSpecies} setItemSpecies={setItemSpecies} itemType={itemType} setItemType={setItemType} />
            <SellerItemOption options={options} setOptions={setOptions} newOption={newOption} setNewOption={setNewOption}/>
            <SellerDetailImage detailImageUrl={detailImageUrl} setDetailImageUrl={setDetailImageUrl}/>
            <SellerThumbnails thumnailsUrls={thumnailsUrls} setThumnailsUrls={setThumnailsUrls}/>
            <SellerDescription ref={editorRef}/>
            <ItemRegButton getRegisterData={getRegisterData}/>

        </div>
    )
}

export default SellerItemEditor;