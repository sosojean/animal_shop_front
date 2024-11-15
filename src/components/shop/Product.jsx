import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
const Product = (props) => {
      return(
          <div className={props.position}>
            <img src="https://placehold.co/100" alt=""/>
            <div className="product-info">
              <span className="brand">냥코밥상</span>
              <span className="title">참치&개맛살 고양이 습식캔</span>
              <span className="price">12,800원</span>
              <div className="option">
                <span className="option">참치맛</span>
                <hr className="vertical"/>
                <span className="count">1개</span>

              </div>

              <span className="star"><FontAwesomeIcon icon={faStar}/>4.5</span>
              <button className="cart-button">장바구니</button>

            </div>

          </div>
      )
}
export default Product