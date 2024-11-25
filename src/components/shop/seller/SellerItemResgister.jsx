import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useState, useRef, useEffect } from 'react';
import '../../../assets/styles/shop/seller/sellerItemRegister.scss'
import instance from '../../../utils/axios'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SellerMenu from "./SellerMenu";

const SellerItemResigter = () => {
    const navigate = useNavigate();
    const { itemId } = useParams();
    const editorRef = useRef(null);
    const detailRef = useRef();
    const thumbnailRefs = useRef([]);

    const [itemName, setItemName] = useState("");
    const [itemStock, setItemStock] = useState();
    const [sellStatus, setSellStatus] = useState("SELL");
    const [itemSpecies, setItemSpecies] = useState("강아지");
    const [itemType, setItemType] = useState("간식");

    // 이미지
    const [detailImage, setDetailImage] = useState(null); // 로직 확인 후 삭제
    const [detailImageUrl, setDetailImageUrl] = useState("");
    const [thumnailsUrls, setThumnailsUrls] = useState([]);

    // 옵션
    const [options, setOptions] = useState([]);
    const [newOption, setNewOption] = useState({ name: '', price: '' });

    // 글자수
    const [nameCount, setNameCount] = useState(0);

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

    // 상세 이미지 추가
    const handleSaveDetailImages = () => {
        const file = detailRef.current.files[0];

        if (file) {

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setDetailImage(reader.result); // 상태 업데이트 후 이미지 표시
            };

        }
    };

    // 서버에 상세 이미지 업로드 > state에 저장
    const handleUploadDetailImage = async () => {
        const file = detailRef.current.files[0];
        console.log(file.name);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post('http://localhost:8080/file/item-image-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // 업로드 후 서버에서 받은 파일명 출력
            console.log('업로드 성공:', response.data);
            const fileName = response.data;
            setDetailImageUrl(`http://localhost:8080/file/image-print?filename=${fileName}`);
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
        }

    }

    const handleUploadThumnailImage = async (e, id) => {
        const file = e.target.files[0];  // 파일을 가져옴
        if (!file) return;

    
        const formData = new FormData();
        formData.append("image", file);
    
        try {
          // 서버에 이미지 업로드 요청 (구체적인 API 엔드포인트에 맞게 수정)
          const response = await axios.post("http://localhost:8080/file/item-image-upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
    
          const fileName = response.data;
          const imageUrl = `http://localhost:8080/file/image-print?filename=${fileName}`;
    
          // 이미지 업로드 후 상태 갱신
          if (id === undefined) {
            setThumnailsUrls((prevUrls) => [...prevUrls, imageUrl]); // 새 이미지 추가
          } else {
            setThumnailsUrls((prevUrls) =>
              prevUrls.map((url, index) => (index === id ? imageUrl : url)) // 기존 이미지 수정
            );
          }
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
          alert("업로드 실패!");
        }
      };

    const handleDeleteThumnailImages = (id) => {
        setThumnailsUrls(thumnailsUrls.filter((v, i) => i !== id));
    }

    const handleAddOption = () => {
        if (newOption.name && newOption.price) {
            setOptions([...options, { name: newOption.name, price: parseInt(newOption.price) }]);
            // 입력 필드 초기화
            setNewOption({ name: '', price: '' });
        } else {
            alert('옵션 이름과 가격을 모두 입력해주세요.');
        }
    }

    const handleDeleteOption = (id) => {
        setOptions(options.filter((v, i) => i !== id));
    }

    // 글자수 제한
    const handleLengthLimit = (e) => {
        const inputValue = e.target.value;
        // 한글이 포함되어 있으면, 조합형을 완성형으로 변환하여 글자수 계산
        const normalizedValue = inputValue.normalize("NFC");
        // 계산된 글자수 업데이트
        setNameCount(normalizedValue.length);
    }

    // 데이터 등록 & 수정 & 삭제
    const handleItemRegister = async () => {
        const markdown = editorRef.current.getInstance().getMarkdown(); // contents 가져오기
        console.log("handleItemRegister");
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

        console.log(data)

        try {
            const response = await instance({
                url: "/seller/item/new",
                method: "post",
                data: data
            });

            // 성공적으로 데이터가 저장된 경우
            console.log('등록 성공:', response.data);

            navigate('/seller');

        } catch (error) {
            // 에러가 발생한 경우
            console.log('에러 발생:', error);
        }
    }

    const handlePatchItemData = () => {
        const markdown = editorRef.current.getInstance().getMarkdown(); // contents 가져오기
        console.log("handlePatchItemData");
        console.log(markdown);

        const data = {
            "id": itemId,
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

        console.log(data)

        try {
            const response = instance({
                url: "/seller/item/update",
                method: "patch",
                data: data
            });

            // 성공적으로 데이터가 저장된 경우
            console.log('수정 성공:', response.data);

            navigate('/');

        } catch (error) {
            // 에러가 발생한 경우
            console.log('에러 발생:', error);
        }
    }

    const handleDeleteItemData = async () => {
        try {
            const response = await instance({
                url: `/seller/item/delete/${itemId}`,
                method: "delete",
            });

            // 성공적으로 데이터가 삭제된 경우
            console.log('삭제 성공:', response.data);
            alert('상품이 삭제되었습니다.');
            navigate('/'); // 삭제 후 홈으로 이동

        } catch (error) {
            // 에러가 발생한 경우
            console.error('삭제 에러 발생:', error);
            alert('상품 삭제에 실패했습니다.');
        }
    };

    return (
        <div className='itemRegContainer'>
            <SellerMenu/>

            <h1>{itemId ? '상품 수정' : '상품 등록'}</h1>

            <div className='RegNameContainer'>
                <div className='RegInputContainer'>
                    <h3>상품명</h3>
                    <input
                        placeholder="상품명"
                        value={itemName}
                        onChange={(e) => {
                            setItemName(e.target.value)
                            handleLengthLimit(e)
                        }}
                        maxLength="40" />
                </div>
                <p>{nameCount >= 40 ? 40 : nameCount} / 40</p>
            </div>

            <div className='RegInputContainer StockContainer'>
                <h3>재고</h3>
                <input type="number" placeholder="재고" value={itemStock} onChange={(e) => { setItemStock(e.target.value) }} />
            </div>

            <div className='RegSelectContainer'>
                <h3>판매상태</h3>
                <div className='sellStatusContents'>
                    <select value={sellStatus} onChange={(e) => {
                        setSellStatus(e.target.value);
                    }}>
                        <option value="SELL">판매</option>
                        <option value="SOLD_OUT">품절</option>
                    </select>
                    <p>{sellStatus === "SELL" ? "판매" : "품절"}</p>
                </div>
            </div>

            <div className='RegSelectContainer CategoryContainer'>
                <h3>카테고리</h3>

                <div className='SelectContents'>
                    <div>
                        <select value={itemSpecies} onChange={(e) => { setItemSpecies(e.target.value) }}>
                            <option value="강아지">강아지</option>
                            <option value="고양이">고양이</option>
                        </select>
                        <p>{itemSpecies}</p>
                    </div>
                    <div>
                        <select value={itemType} onChange={(e) => { setItemType(e.target.value) }}>
                            <option>간식</option>
                            <option>사료</option>
                            <option>식기</option>
                            <option>영양제</option>
                            <option>위생용품</option>
                            <option>이동장</option>
                            <option>장난감</option>
                            <option>하네스</option>
                        </select>
                        <p>{itemType}</p>
                    </div>
                </div>
            </div>

            <div className='RegOptContainer'>
                <h3>옵션</h3>
                <div>
                    <div className='OptInputContainer'>
                        <div>
                            <input
                                type="text"
                                placeholder="옵션 이름"
                                value={newOption.name}
                                onChange={(e) => { setNewOption({ ...newOption, name: e.target.value }) }}
                            />
                            <input
                                type="number"
                                placeholder="옵션 가격"
                                value={newOption.price}
                                onChange={(e) => { setNewOption({ ...newOption, price: e.target.value }) }}
                            />
                        </div>
                        <button onClick={handleAddOption}>옵션 추가</button>
                    </div>
                    <ul>
                        {options?.map((option, index) => (
                            <li key={index} className='OptList'>
                                <div> <b>{option.name}</b> </div>
                                <div> {option.price.toLocaleString()} 원 </div>
                                <FontAwesomeIcon icon={faCircleXmark} className='circleXmark' onClick={() => { handleDeleteOption(index) }} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='RegDetailImageContainer'>
                <h3>상세 이미지</h3>
                <div>
                    {/* 이미지가 없을 때도 border가 보이도록 */}
                    {!detailImageUrl ? (
                        <div className='imageContainer'
                            style={{ cursor: 'pointer' }}
                            onClick={() => detailRef.current && detailRef.current.click()}>
                            <p>사진을 추가해주세요</p>
                        </div>
                    ) : (
                        <img
                            src={detailImageUrl}
                            style={{ cursor: 'pointer' }}
                            alt="상품 이미지 미리보기"
                            onClick={() => detailRef.current && detailRef.current.click()}
                        />
                    )}
                    <label htmlFor="detail-file">
                        <input
                            type="file"
                            id="detail-file"
                            accept="image/*"
                            onChange={(e) => {
                                // 파일이 선택되지 않았을 경우 아무 작업도 하지 않음
                                if (!e.target.files || e.target.files.length === 0) {
                                    return;
                                }

                                handleSaveDetailImages();
                                handleUploadDetailImage();
                            }}
                            style={{ display: "none" }}
                            ref={detailRef}
                        />
                    </label>
                </div>
            </div>

            <div className="RegThumnailContainer">
                <div className="pictureHeader">
                    <h3>대표 이미지</h3>
                    <h3 style={{ color: "gray" }}>({thumnailsUrls.length}/10)</h3>
                </div>

                <div className="addPicture">
                    {/* 썸네일 이미지 리스트 */}
                    <div className="ThumnailList">
                        {thumnailsUrls.map((image, id) => (
                            <div key={id} style={{ position: "relative" }}>
                                {/* 업로드된 이미지 클릭 시 수정 */}
                                <img
                                    src={image}
                                    alt={`썸네일 ${id}`}
                                    onClick={() => thumbnailRefs.current[id]?.click()} // 수정 시 파일 input 클릭
                                />
                                {/* 삭제 버튼 */}
                                <button onClick={() => handleDeleteThumnailImages(id)}>
                                    X
                                </button>

                                {/* 수정 시 기존 이미지를 교체할 수 있도록 input 추가 */}
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={(e) => handleUploadThumnailImage(e, id)} // 수정 시 기존 이미지 교체
                                    ref={(el) => (thumbnailRefs.current[id] = el)} // 각 input에 대한 ref 설정
                                />
                            </div>
                        ))}

                        {/* 10개 미만일 경우 사진 추가 버튼 표시 */}
                        {thumnailsUrls.length < 10 && (
                        <div
                            className="imageContainer"
                            onClick={() => thumbnailRefs.current[thumnailsUrls.length]?.click()} // 새 이미지 추가
                        >
                            <p>사진을 추가해주세요</p>
                        </div>
                        )}
                    </div>

                    {/* 실제 파일 input (이미지 추가) */}
                    <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    ref={(el) => (thumbnailRefs.current[thumnailsUrls.length] = el)} // 새 이미지 input의 ref 설정
                    onChange={(e) => handleUploadThumnailImage(e)} // 새 이미지는 마지막 인덱스에 추가
                    />
                </div>
            </div>

            <div className='RegDetailContainer'>
                <h3>상품 설명</h3>
                <div>
                    <Editor
                        initialValue=""
                        previewStyle="vertical"
                        height="250px"
                        useCommandShortcut={false}
                        placeholder="글을 작성해주세요."
                        ref={editorRef}
                        toolbarItems={[
                            ['heading', 'bold', 'italic', 'strike'],
                            ['hr', 'quote'],
                            ['ul', 'ol', 'indent', 'outdent'],
                            ['table', 'link'],
                            ['scrollSync']
                        ]}
                    />
                </div>
            </div>

            <div className='ItemRegButton'>
                {itemId ?
                    <div>
                        <button onClick={handlePatchItemData}>수정</button>
                        <button onClick={handleDeleteItemData}>삭제</button>
                    </div>
                    : <button onClick={handleItemRegister}>등록</button>
                }
            </div>
        </div>
    )
}

export default SellerItemResigter;