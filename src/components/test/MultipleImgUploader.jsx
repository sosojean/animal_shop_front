import { useState } from "react";


const MultipleImgUploader = () => {
    const [showImages, setShowImages] = useState([]);

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

    return(
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
    );
}

export default MultipleImgUploader;