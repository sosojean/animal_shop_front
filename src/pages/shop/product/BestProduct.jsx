import React, {useEffect, useState} from 'react';
import axios from "axios";
import Title from "../../../components/common/Title";
import Products from "../../../components/shop/product/Products";

const BestProduct = ({isDog}) => {
  const [data, setData] = useState()

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API}/shop/best`,
      method: "GET",
      params: {
        species:isDog?"dog":"cat",
      }
    }).then(res => {
      setData(res.data.goods);
    }).catch(error => {
      console.log(error);
    })
  },[])

  return (
      <div>
        <Title>인기 {isDog?"강아지":"고양이"} 상품</Title>
        <Products data={data}/>

      </div>
  );
};

export default BestProduct;