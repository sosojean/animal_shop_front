import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import { useState, useRef, useEffect } from 'react';
import '../../../assets/styles/shop/sellerItemRegister.scss'
import instance from '../../../utils/axios'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SellerItemResigter = () => {
    const navigate = useNavigate();
    const { itemId } = useParams();
    const editorRef = useRef(null);
    const detailRef = useRef();

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
    const [newOption, setNewOption] = useState({name: '', price: ''});

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
            console.log('Uploaded File:', response.data);
            const fileName = response.data;
            setDetailImageUrl(`http://localhost:8080/file/image-print?filename=${fileName}`);
            alert('업로드 성공!');
          } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('업로드 실패!');
          }

    }

     const handleUploadThumnailImage = async (e) => {
        const file = e.target.files[0];  // 사용자가 업로드한 파일
        console.log(file.name);
    
        const formData = new FormData();
        formData.append("image", file);  // 'image' 필드로 파일을 추가
    
        try {
          const response = await axios.post('http://localhost:8080/file/item-image-upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          // 업로드 후 서버에서 받은 파일명
          console.log('Uploaded File:', response.data);
          const fileName = response.data;
    
          // 서버에서 받은 파일명으로 이미지 URL을 생성하여 상태에 추가
          setThumnailsUrls(prevUrls => [
            ...prevUrls,
            `http://localhost:8080/file/image-print?filename=${fileName}`
          ]);
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          alert('업로드 실패!');
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

            navigate('/');
    
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
                    maxLength="40"/>
                </div>
                <p>{nameCount >= 40 ? 40 : nameCount} / 40</p>
            </div>

            <div className='RegInputContainer StockContainer'>
                <h3>재고</h3>
                <input type="number" placeholder="재고" value={itemStock} onChange={(e) => {setItemStock(e.target.value)}}/>
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
                        <select value={itemSpecies} onChange={(e) => {setItemSpecies(e.target.value)}}>
                            <option value="강아지">강아지</option>
                            <option value="고양이">고양이</option>
                        </select>
                        <p>{itemSpecies}</p>
                    </div>
                    <div>
                        <select value={itemType} onChange={(e) => {setItemType(e.target.value)}}>
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
                <div className='OptInputContainer'>
                    <input
                        type="text"
                        placeholder="옵션 이름"
                        value={newOption.name}
                        onChange={(e) => {setNewOption({ ...newOption, name: e.target.value })}}
                    />
                    <input
                        type="number"
                        placeholder="옵션 가격"
                        value={newOption.price}
                        onChange={(e) => {setNewOption({ ...newOption, price: e.target.value })}}
                    />
                    <button onClick={handleAddOption}>옵션 추가</button>
                </div>
                
                <ul>
                        {options?.map((option, index) => (
                        <li key={index} className='OptList'>
                            <div> <b>{option.name}</b> </div>
                            <div> {option.price} 원 </div>
                            <FontAwesomeIcon icon={faCircleXmark} className='circleXmark' onClick={() => {handleDeleteOption(index)}} />
                        </li>
                        ))}
                </ul>
            </div>

            <div className='RegDetailContainer'>
                <h3>상품 설명</h3>
                <Editor
                    initialValue=""
                    previewStyle="vertical"
                    height="400px"
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

            <div className='RegDetailImageContainer'>
                <h3>상세 이미지</h3>
                {detailImageUrl &&
                <img
                    src={detailImageUrl}
                    alt="상품 이미지 미리보기"
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />}
                <label htmlFor="detail-file">
                    <input 
                        type="file"
                        id="detail-file"
                        accept="image/*"
                        onChange={() => {
                            handleSaveDetailImages();
                            handleUploadDetailImage();
                        }}
                        style={{ display: "none" }}
                        ref={detailRef}
                    />
                    <p style={{ cursor: "pointer" }}>사진추가</p>
                </label>
            </div>

            <div className='RegThumnailContainer'>
                <h3>대표 이미지</h3> <h3 style={{color: "blue"}}>{thumnailsUrls?.length}/10</h3>
                <div className="addPicture">
                    <label htmlFor="thumail-file" className="addButton">
                        { thumnailsUrls?.length >= 10 && <p>사진 등록 할 수 없습니다</p> }
                        <input 
                            type="file" 
                            id="thumail-file" 
                            multiple 
                            className="addButton" 
                            accept="image/*"
                            onChange={(e) => {handleUploadThumnailImage(e);}}
                            disabled={thumnailsUrls?.length >= 10} // 파일 선택 비활성화
                            style={{ display: "none" }} // 스타일 수정
                        />
                        <p style={{ cursor: "pointer" }}>사진추가</p>
                    </label>

                    {/* 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
                    <div className='ThumnailList'>
                        {thumnailsUrls?.map((image, id) => (
                            <div key={id}>
                                <img src={image} alt={`${image}-${id}`} style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
                                <button onClick={() => handleDeleteThumnailImages(id)}>삭제</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='ItemRegButton'>
                {itemId ? 
                <>
                    <button onClick={handlePatchItemData}>수정</button>
                    <button onClick={handleDeleteItemData}>삭제</button>
                </>
                : <button onClick={handleItemRegister}>등록</button>
                }
            </div>
        </div>
    )
}

export default SellerItemResigter;