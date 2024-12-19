import WikiComItem from "./WikiComItem";

const WikiComments = (props) => {

    const {data, getRefresh} = props;

    return (
        <div>
            {data?.map((d, i) => 
                {return <WikiComItem data={d} key={i} getRefresh={getRefresh}/>})}
        </div>
    )
}

export default WikiComments;