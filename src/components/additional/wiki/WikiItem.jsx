import Card from "../../common/Card";

const WikiItem = (props) => {

    const {data} = props;

    console.log("WikiItem data ", data);

    return (
        <Card className="default-card wiki-item">
            <div>
                <Card>
                    <h3 className="item-header">{data?.breedName}</h3>
                </Card>
                <Card>
                    <img src={data?.attachmentUrl} className="wiki-img"/>    
                </Card>        
            </div>
            <div className="description-container">
                <Card className="light-card">
                    <div className="description">
                        <span className="d-title"><b>개요 </b></span>
                        <span className="d-content">{data?.overview}</span>    
                    </div>
                    <div className="description">
                        <span className="d-title"><b>외모 </b></span>
                        <span className="d-content">{data?.appearance}</span>    
                    </div>
                    <div className="description">
                        <span className="d-title"><b>성격 </b></span>
                        <span className="d-content">{data?.temperament}</span>    
                    </div>
                </Card>
            </div>
        </Card>
    )
}

export default WikiItem;