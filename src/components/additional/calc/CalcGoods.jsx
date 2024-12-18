import Card from "../../common/Card";
import Product from "../../shop/product/Product";
import "../../../assets/styles/shop/product/products.scss"

const CalcGoods = (props) => {

    const {goods} = props;

    return (
        <Card>
            <div className="products">
                {goods?.map(data=>{
                    return ( <Product key={data.id} data = {data} position="product"/>)
                })}
            </div>
        </Card>
    )
}

export default CalcGoods;