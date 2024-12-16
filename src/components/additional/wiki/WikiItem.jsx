
const WikiItem = (props) => {

    const {data} = props;

    console.log("WikiItem data ", data);

    return (
        <div>
            <img src={data?.attachmentUrl}/>
            <div>
                <h3>{data?.breedName}</h3>
                <div>
                    <p>{data?.overview}</p>
                    <p>{data?.appearance}</p>
                    <p>{data?.temperament}</p>
                </div>
            </div>
        </div>
    )
}

export default WikiItem;