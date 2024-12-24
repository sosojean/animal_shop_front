import AdoptComItem from "./AdoptComItem";

const AdoptComments = (props) => {

    const {data, getRefresh} = props;

    return (
        <div className="adopt-comment-list">
            {data?.map((d, i) => 
                {return <AdoptComItem data={d} key={i} getRefresh={getRefresh}/>})}
        </div>
    )
}

export default AdoptComments;