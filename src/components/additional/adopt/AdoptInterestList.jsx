import AdoptInterestItem from "../adopt/AdpotInterestItem";


const AdoptInterestList = (props) => {

    const {data, getRefreshData} = props;

    return (
        <div className="adopt-interest-list adopt-list-container">
            {data?.map((d, index) => {
                return(
                    <div key={index}><AdoptInterestItem data={d} getRefreshData={getRefreshData}/></div>
                )     
            })}
        </div>
    )
}

export default AdoptInterestList;