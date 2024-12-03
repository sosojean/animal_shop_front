import Card from "../common/Card";

const AdoptItem = (props) => {

    const {data} = props;

    return (
        <Card className="adopt-item-Container">
            <div className="img-container">
                <img src={data.popfile}/>
            </div>
            <div className="info-container">
                <div className="process-container">
                    <p>{data.processState}</p>
                </div>
                <div>
                    <span>{data.kindCd + " / "}</span>
                    <span>{data.age}</span>
                </div>
                <div>
                    <span>{data.sexCd === 'F' ? "여아" : 
                            data.sexCd === 'M' ? "남아" : "성별미상"}</span>
                    <span>{" / "} 중성화 {data.neuterYn}</span>
                </div>
            </div>
            <div className="addr-container">
                <p>{data.orgNm}</p>
            </div>
        </Card>
    )
}

export default AdoptItem;