

const SellerItemCategory = ({itemSpecies, setItemSpecies, itemType, setItemType}) => {

    return (
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
    )
}

export default SellerItemCategory;