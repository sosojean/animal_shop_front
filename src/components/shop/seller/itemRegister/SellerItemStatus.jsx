

const SellerItemStatus = ({sellStatus, setSellStatus}) => {

    return (
        <div className='RegSelectContainer'>
            <h3>판매상태</h3>
            <div className='sellStatusContents'>
                <select 
                    value={sellStatus} onChange={(e) => {
                    setSellStatus(e.target.value);}}
                >
                    <option value="SELL">판매</option>
                    <option value="SOLD_OUT">품절</option>
                </select>
                <p>{sellStatus === "SELL" ? "판매" : "품절"}</p>
            </div>
        </div>
    )
}

export default SellerItemStatus;