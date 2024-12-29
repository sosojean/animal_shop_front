import { useEffect } from "react";




const SellerNameRegister = ({ itemName, setItemName, nameCount, setNameCount }) => {

    // 글자수 제한
    const handleLengthLimit = (value) => {
        // 한글이 포함되어 있으면, 조합형을 완성형으로 변환하여 글자수 계산
        const normalizedValue = value.normalize("NFC");
        // 계산된 글자수 업데이트
        setNameCount(normalizedValue.length);
    };

    useEffect(() => {
        // itemName이 변경될 때마다 nameCount 업데이트
        handleLengthLimit(itemName);
    }, [itemName]);

    return (
        <div className="RegNameContainer">
        <div className="RegInputContainer">
            <h3>상품명</h3>
            <input
            placeholder="상품명"
            value={itemName}
            onChange={(e) => {
                setItemName(e.target.value);
                handleLengthLimit(e.target.value);
            }}
            maxLength="40"
            />
        </div>
            <p>{nameCount >= 40 ? 40 : nameCount} / 40</p>
        </div>
    );
};

export default SellerNameRegister;
