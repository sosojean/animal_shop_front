import Card from "../../common/Card";

const WikiItem = (props) => {

    const {data} = props;

    console.log("WikiItem data ", data);

    return (
        <Card className="default-card wiki-item">
            <Card>
                <img src={data?.attachmentUrl} className="wiki-img"/>    
            </Card>
            <div>
                <Card className="light-card"><h3 className="item-header">{data?.breedName}</h3></Card>
                <Card className="light-card">
                    <p>{data?.overview}</p>
                    <p>{data?.appearance}</p>
                    <p>{data?.temperament}</p>
                </Card>
            </div>
        </Card>
    )
}

export default WikiItem;