

const SellerItemStock = ({itemStock, setItemStock}) => {
    return (
        <div className='RegInputContainer StockContainer'>
            <h3>재고</h3>
            <input type="number" placeholder="재고" 
            value={itemStock}
            onChange={(e) => { setItemStock(e.target.value) }} 
            />
        </div>
    )
}

export default SellerItemStock;