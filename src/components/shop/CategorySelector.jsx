import React from 'react';
import ToggleBtn from "../common/ToggleBtn";
import "../../assets/styles/shop/categorySelector.scss"
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import ProductSearchBar from "./product/ProductSearchBar";

const CategorySelector = ({setIsDog, isDog}) => {
  return (
      <div className={"category-selector row"}>
        {/*<nav className="navbar">*/}
          <div className="navbar-toggle">
            <ToggleBtn setIsDog={setIsDog} isDog={isDog}/>
          </div>

        <div className={"row"}>
        <ProductSearchBar/>
        <Link to={"/shop/list"} >
          <div className={"all-product-btn"}>
            <span>전체 상품 보러가기</span>
            <FontAwesomeIcon icon={faAngleRight}/>
          </div>
          </Link>
        </div>

      </div>
  );
};

export default CategorySelector;