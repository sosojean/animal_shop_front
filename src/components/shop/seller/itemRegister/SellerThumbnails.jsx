import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useRef } from "react";
import axios from "axios";

const SellerThumbnails = ({thumnailsUrls, setThumnailsUrls}) => {

    const thumbnailRefs = useRef([]);

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

    return (
        <div className="RegThumnailContainer">
            <div className="pictureHeader">
                <h3>대표 이미지</h3>
                <h3 style={{ color: "gray" }}>({thumnailsUrls.length}/4)</h3>
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
                                <FontAwesomeIcon icon={faCircleXmark} />
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

                    {/* 4개 미만일 경우 사진 추가 버튼 표시 */}
                    {thumnailsUrls.length < 4 && (
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
    )
}

export default SellerThumbnails;

