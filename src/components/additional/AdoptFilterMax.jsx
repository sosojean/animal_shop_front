import Card from "../common/Card";
import Filter from "./Filter";


const AdoptFilterMax = () => {

    return (
        <Card className="filter-max-container">
            <div className="kind-selector">
                <Card>
                    <button>강아지</button>
                </Card>
                <Card>
                    <button>고양이</button>
                </Card>
            </div>
            <div className="breed-selector">
                <p>선택 정보</p>
                <Filter className="breed-filter" placeholder="품종 검색"/>
            </div>
            <div className="region-selector">
                <p>선택 정보</p>
                <select>
                    <option>지역</option>
                </select>
            </div>
        </Card>
    )
}

export default AdoptFilterMax;