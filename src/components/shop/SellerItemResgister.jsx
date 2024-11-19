import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import { useState, useRef } from 'react';
import '../../assets/styles/shop/sellerItemRegister.scss'

const SellerItemResigter = () => {
    const [itemName, setItemName] = useState("");
    const [itemStock, setItemStock] = useState("");
    const [sellStatus, setSellStatus] = useState("");
    const [itemSpecies, setItemSpecies] = useState("");
    const [itemType, setItemType] = useState("");

    const editorRef = useRef(null);
    // const markdown = editorRef.current.getInstance().getMarkdown(); // contents 가져오기

    // 이미지
    const [detailImage, setDetailImage] = useState(null);
    const detailRef = useRef();

    const [thumnails, setThumnails] = useState([]);
    
    // 옵션
    const [options, setOptions] = useState([]);
    const [newOption, setNewOption] = useState({name: '', price: ''});

    // 글자수
    const [nameCount, setNameCount] = useState(0);


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

      const handleSaveThumnailImages = (e) => {
        
          const imageLists = e.target.files;
          let imageUrlLists = [...thumnails];
  
          for (let i = 0; i < imageLists.length; i++){
              // 파일의 상대경로 반환
              const currentImageUrl = URL.createObjectURL(imageLists[i]);
              imageUrlLists.push(currentImageUrl);
          }
  
          // 최대 첨부 가능 이미지 파일 수 조정
          if (imageUrlLists.length > 10) {
              imageLists = imageUrlLists.slice(0, 10);
          }
  
          setThumnails(imageUrlLists);
      };
  
  
      const handleDeleteThumnailImages = (id) => {
          setThumnails(thumnails.filter((v, i) => i !== id));
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

    return (
        <div className='itemRegContainer'>
            <h1>상품 등록</h1>

            <div className='RegNameContainer'>
                <div className='RegInputContainer'>
                    <h3>상품명</h3>
                    <input placeholder="상품명" 
                    onChange={(e) => {
                        setItemName(e.target.value)
                        handleLengthLimit(e)
                    }} 
                    maxLength="40"/>
                </div>
                <p>{nameCount >= 40 ? 40 : nameCount} / 40</p>
            </div>

            <div className='RegInputContainer'>
                <h3>재고</h3>
                <input type="number" placeholder="재고" onChange={(e) => {setItemStock(e.target.value)}}/>
            </div>
            
            <div className='RegSelectContainer'>
                <h3>판매상태</h3>
                <select onChange={(e) => {setSellStatus(e.target.value)}}>
                    <option>판매</option>
                    <option>품절</option>
                    <option>일시품절</option>
                </select>
            </div>

            <div className='RegSelectContainer'>
                <h3>카테고리</h3>

                <h5>동물</h5>
                <select onChange={(e) => {setItemSpecies(e.target.value)}}>
                    <option>강아지</option>
                    <option>고양이</option>
                </select>
                
                <h5>상품 종류</h5>
                <select onChange={(e) => {setItemType(e.target.value)}}>
                    <option>간식</option>
                    <option>사료</option>
                    <option>식기</option>
                    <option>영양제</option>
                    <option>위생용품</option>
                    <option>이동장</option>
                    <option>장난감</option>
                    <option>하네스/줄</option>
                </select>
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
                        {options.map((option, index) => (
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
                {detailImage &&
                <img
                    src={detailImage}
                    alt="상품 이미지 미리보기"
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />}
                <label htmlFor="detail-file">
                    <input 
                        type="file"
                        id="detail-file"
                        accept="image/*"
                        onChange={handleSaveDetailImages}
                        style={{ display: "none" }}
                        ref={detailRef}
                    />
                    <p style={{ cursor: "pointer" }}>사진추가</p>
                </label>
            </div>

            <div className='RegThumnailContainer'>
                <h3>대표 이미지</h3> <h3 style={{color: "blue"}}>{thumnails.length}/10</h3>
                <div className="addPicture">
                    <label htmlFor="thumail-file" className="addButton">
                        { thumnails.length >= 10 && <p>사진 등록 할 수 없습니다</p> }
                        <input 
                            type="file" 
                            id="thumail-file" 
                            multiple 
                            className="addButton" 
                            onChange={handleSaveThumnailImages}
                            disabled={thumnails.length >= 5} // 파일 선택 비활성화
                            style={{ display: "none" }} // 스타일 수정
                        />
                        <p style={{ cursor: "pointer" }}>사진추가</p>
                    </label>

                    {/* 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
                    <div className='ThumnailList'>
                        {thumnails.map((image, id) => (
                            <div key={id}>
                                <img src={image} alt={`${image}-${id}`} style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
                                <button onClick={() => handleDeleteThumnailImages(id)}>삭제</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='ItemRegButton'>
                <button>등록</button>
            </div>
        </div>
    )
}

export default SellerItemResigter;