import WikiComItem from "./WikiComItem";

const WikiComments = (props) => {

    const {data, getRefresh} = props;

    return (
        <div className="wiki-comment-list">
            {data?.map((d, i) => 
                {return <WikiComItem data={d} key={i} getRefresh={getRefresh}/>})}
        </div>
    )
}

export default WikiComments;