import '../../../../assets/styles/shop/seller/sellerItemRegister.scss'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import instance from '../../../../utils/axios';
import SellerNameRegister from './SellerNameRegister';
import SellerItemStock from './SellerItemStock';
import SellerItemStatus from './SellerItemStatus'
import SellerItemCategory from './SellerItemCategory';
import SellerItemOption from './SellerItemOption';
import SellerDetailImage from './SellerDetailImage';
import SellerThumbnails from './SellerThumbnails';
import SellerDescription from './SellerDescription';
import ItemRegButton from './ItemRegButton';

const SellerItemEditor = () => {

    // 수정할 데이터 받아오기 위해 필요
    const { itemId } = useParams();

    // SellerNameRegister
    const [itemName, setItemName] = useState(""); // 상품명
    const [nameCount, setNameCount] = useState(0); // 글자수

    // SellerItemStock
    const [itemStock, setItemStock] = useState(); // 상품재고

    // SellerItemStatus
    const [sellStatus, setSellStatus] = useState("SELL"); // 상품상태

    // SellerItemCategory
    const [itemSpecies, setItemSpecies] = useState("dog"); // 동물종류
    const [itemType, setItemType] = useState("food"); // 상품종류
    const [detailedType, setDetailedType] = useState("");

    // SellerItemOption
    const [options, setOptions] = useState([{ name: 'default', price: '' }]); // 옵션
    const [defaultPrice, setDefaultPrice] = useState();
    // console.log("options", options); 
    const [newOption, setNewOption] = useState({ name: '', price: ''}); // 옵션 추가용 state

    // SellerDetailImage
    const [detailImageUrl, setDetailImageUrl] = useState(""); // 상세 이미지

    // SellerThumbnails
    const [thumnailsUrls, setThumnailsUrls] = useState([]); // 썸네일 이미지

    // SellerDescription
    const editorRef = useRef(null);

    // 서버에 송신할 데이터
    const getRegisterData = () => {
        const markdown = editorRef.current.getInstance().getMarkdown(); // contents 가져오기
        console.log("getRegisterData");

        // 공통 데이터 정의
        const data = {
            option: options,
            name: itemName,
            item_detail: markdown,
            stock_number: itemStock,
            sell_status: sellStatus,
            species: itemSpecies,
            category: itemType,
            detailed_category: detailedType,
            thumbnailUrls: thumnailsUrls,
            imageUrl: detailImageUrl
        };

        console.log("Data", data);

        // `itemId`가 있는 경우 `id` 속성 추가
        return itemId ? { ...data, id: itemId } : data;
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
            setDetailedType(item.detailed_category);
            setSellStatus(item.sell_status);
            setItemStock(item.stock_number);
            setDetailImageUrl(item.image_url);
            setThumnailsUrls(item.thumbnail_url);
            setOptions(item.options);
            setDefaultPrice(item.options[0].price);
            // 에디터에 기존 상품 설명 로드
            editorRef.current.getInstance().setMarkdown(item.item_detail);
        } catch (error) {
            console.error('상품 정보 로드 실패:', error);
            alert('상품 정보 로드 실패');
        }
    }

    return (
        <div className='itemRegContainer'>
            
            <h1>{itemId ? '상품 수정' : '상품 등록'}</h1>

            <SellerNameRegister itemName={itemName} setItemName={setItemName} nameCount={nameCount} setNameCount={setNameCount}/>
            <SellerItemStock itemStock={itemStock} setItemStock={setItemStock}/>
            <SellerItemStatus sellStatus={sellStatus} setSellStatus={setSellStatus}/>
            <SellerItemCategory itemSpecies={itemSpecies} setItemSpecies={setItemSpecies} itemType={itemType} setItemType={setItemType}
                detailedType={detailedType} setDetailedType={setDetailedType}/>
            <SellerItemOption options={options} setOptions={setOptions} newOption={newOption} setNewOption={setNewOption}
                defaultPrice={defaultPrice} setDefaultPrice={setDefaultPrice}/>
            <SellerDetailImage detailImageUrl={detailImageUrl} setDetailImageUrl={setDetailImageUrl}/>
            <SellerThumbnails thumnailsUrls={thumnailsUrls} setThumnailsUrls={setThumnailsUrls}/>
            <SellerDescription ref={editorRef}/>

            <ItemRegButton getRegisterData={getRegisterData} itemId={itemId} options={options}/>
        </div>
    )
}

export default SellerItemEditor;