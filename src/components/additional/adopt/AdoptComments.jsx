import AdoptComItem from "./AdoptComItem";

const AdoptComments = (props) => {

    const {data, getRefresh} = props;

    return (
        <div>
            {data?.map((d, i) => 
                {return <AdoptComItem data={d} key={i} getRefresh={getRefresh}/>})}
        </div>
    )
}

export default AdoptComments;