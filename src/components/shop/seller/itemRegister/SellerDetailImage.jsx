import { useRef } from "react";
import axios from "axios";

const SellerDetailImage = ({detailImageUrl, setDetailImageUrl}) => {

    const detailRef = useRef();

    // 서버에 상세 이미지 업로드 > state에 저장
    const handleUploadDetailImage = async () => {
        const file = detailRef.current.files[0];
        console.log(file.name);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/file/item-image-upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // 업로드 후 서버에서 받은 파일명 출력
            console.log('업로드 성공:', response.data);
            const fileName = response.data;
            setDetailImageUrl(`${process.env.REACT_APP_API}/file/image-print?filename=${fileName}`);
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
        }

    }

    return (
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

                            // handleSaveDetailImages();
                            handleUploadDetailImage();
                        }}
                        style={{ display: "none" }}
                        ref={detailRef}
                    />
                </label>
            </div>
        </div>
    )
}

export default SellerDetailImage;