import '../../assets/styles/shop/product.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
const Product = (props) => {
      return(
          <div className="product">
              <img src="https://placehold.co/100" alt=""/>
              <span className="brand">냥코밥상</span>
              <span className="title">참치&개맛살 고양이 습식캔</span>
              <span className="price">12,800원</span>
              <span className="star"><FontAwesomeIcon icon={faStar}/>4.5</span>
              <button className="cart">장바구니</button>
          </div>
      )
}
export default Product