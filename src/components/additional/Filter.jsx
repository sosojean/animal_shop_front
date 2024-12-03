import { useState } from "react";
import { catBreedSelector, dogBreedSelector } from "../../utils/petOptions";


const Filter = (props) => {

    const {
        className, placeholder
    } = props;

    const [selectedBreed, setSelectedBreed] = useState()


    // TODO 부모 컴포넌트에서 받아오기
    const dogBreedArray = dogBreedSelector;
    const catBreedArray = Object.entries(catBreedSelector);

    // TODO 고양이인지 개인지 확인하는 STATE 받아오기

    return (
        <div className={className}>
            <input placeholder={placeholder}/>
            <div className="select-container">
                {catBreedArray.map(([key, value]) => {
                    return (
                        <div key={key} className="select-item">
                            <p>{value}</p>
                            <input type="checkbox" />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Filter;