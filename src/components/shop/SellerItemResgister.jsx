import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import { useState, useRef } from 'react';

const SellerItemResigter = () => {
    const [prevImgFile, setPrevImgFile] = useState(null);
    const imgRef = useRef();
    const [showImages, setShowImages] = useState([]);

    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setPrevImgFile(reader.result); // 상태 업데이트 후 이미지 표시
          };
        }
      };

      const handleAddImages = (e) => {
          const imageLists = e.target.files;
          let imageUrlLists = [...showImages];
  
          for (let i = 0; i < imageLists.length; i++){
              // 파일의 상대경로 반환
              const currentImageUrl = URL.createObjectURL(imageLists[i]);
              imageUrlLists.push(currentImageUrl);
          }
  
          // 최대 첨부 가능 이미지 파일 수 조정
          if (imageUrlLists.length > 10) {
              imageLists = imageUrlLists.slice(0, 10);
          }
  
          setShowImages(imageUrlLists);
      };
  
      console.log(showImages);
  
      const handleDeleteImages = (id) => {
          setShowImages(showImages.filter((v, i) => i !== id));
      }

    return (
        <div>
            <h1>상품 등록</h1>
            <sapn>상품명</sapn> <input/>
            <sapn>가격</sapn> <input/>
            <sapn>재고</sapn> <input/>
            <sapn>판매상태</sapn>
            <select>
                <option>판매</option>
                <option>품절</option>
                <option>일시품절</option>
            </select>
            <p>카테고리</p>
            <span>동물</span>
            <select>
                <option>강아지</option>
                <option>고양이</option>
                <option>햄스터</option>
            </select>
            <span>상품</span>
            <select>
                <option>간식</option>
                <option>사료</option>
                <option>영양제</option>
            </select>
            <p>상품 설명</p>
            <Editor
                initialValue=""
                previewStyle="vertical"
                height="400px"
                useCommandShortcut={false}
                placeholder="글을 작성해주세요."
            />

            <h3>상세 이미지</h3>
            <div className="addPicture">
                <label htmlFor="input-file" className="addButton">
                    <input 
                        type="file" 
                        id="input-file" 
                        multiple 
                        className="addButton" 
                        onChange={handleAddImages}
                        style={{ display: "none" }} // 스타일 수정
                    />
                    <span style={{ cursor: "pointer" }}>사진추가</span>
                </label>

                {/* 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
                {showImages.map((image, id) => (
                    <div className="imageContainer" key={id}>
                    <img src={image} alt={`${image}-${id}`} />
                    <button onClick={() => handleDeleteImages(id)}>삭제</button>
                    </div>
                ))}
            </div>
            
            <h3>대표 이미지</h3>
            <input 
                type="file"
                accept="image/*"
                onChange={saveImgFile}
                ref={imgRef}
            />
            <img
                src={prevImgFile ? prevImgFile : '/styles/img/search.svg'}
                alt="상품 이미지 미리보기"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />

            <button>등록</button>
        </div>
    )
}

export default SellerItemResigter;