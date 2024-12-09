import { dogItemCategory, catItemCategory } from "../../../../utils/categoryOption"
// import { useState } from "react";

const SellerItemCategory = ({itemSpecies, setItemSpecies, itemType, setItemType, detailedType, setDetailedType}) => {
    
    const dogDetailedCategory = dogItemCategory.filter((category, index) => {
        return category.main.name === itemType;
    })[0].subcategories;

    const catDetailedCategory = catItemCategory.filter((category, index) => {
        return category.main.name === itemType;
    })[0].subcategories;

    return (
        <div className='RegSelectContainer CategoryContainer'>
            <h3>카테고리</h3>

            <div className='SelectContents'>
                <div>
                    <select value={itemSpecies} onChange={(e) => { setItemSpecies(e.target.value) }}>
                        <option value="dog">강아지</option>
                        <option value="cat">고양이</option>
                    </select>
                    <p>{itemSpecies === "dog" ? "강아지" : "고양이"}</p>
                </div>
                <div>
                    <select value={itemType} onChange={(e) => { setItemType(e.target.value) }}>
                        {itemSpecies === "dog" ?
                            dogItemCategory.map((category, index) => {
                                return (
                                    <option value={category.main.name}>{category.main.convert}</option>
                                )
                            })     :
                            catItemCategory.map((category, index) => {
                                return (
                                    <option value={category.main.name}>{category.main.convert}</option>
                                )
                            })                 
                        }

                    </select>
                    <p>{itemType}</p>
                </div>
                <div>
                    <select value={detailedType} onChange={(e) => { setDetailedType(e.target.value) }}>
                        {itemSpecies === "dog" ?
                            dogDetailedCategory?.map((category, index) => {
                                return (
                                    <option value={category.name}>{category.convert}</option>
                                )
                            }) : 
                            catDetailedCategory.map((category, index) => {
                                return (
                                    <option value={category.name}>{category.convert}</option>
                                )
                            })             
                        }
                    </select>
                    <p>{detailedType}</p>
                </div>
            </div>
        </div>
    )
}

export default SellerItemCategory;