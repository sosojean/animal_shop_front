import Card from "../common/Card";

const AdoptItem = (props) => {

    const {data} = props;

    return (
        <Card className="adopt-item-Container">
            <div className="img-container">
                <img src={data.popfile} alt="강아지"/>
            </div>
            <div className="info-container">
                <div className="process-container">
                    <p>{data.status}</p>
                </div>
                <div>
                    <span>{data.species + " / "}</span>
                    <span>{data.age}</span>
                </div>
                <div>
                    <span>{data.sex === 'F' ? "여아" : 
                            data.sex === 'M' ? "남아" : "성별미상"}</span>
                    <span>{" / "} 중성화 {" "}
                        {data.neuterYn === 'Y' ? "완료" :
                            data.neuterYn === 'N' ? "미완료" : "알수없음"}
                    </span>
                </div>
            </div>
            <div className="addr-container">
                <p>{data.location}</p>
            </div>
        </Card>
    )
}

export default AdoptItem;