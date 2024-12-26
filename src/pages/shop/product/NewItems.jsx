import React, {useEffect, useState} from 'react';
import Products from "../../../components/shop/product/Products";
import axios from "axios";
import Title from "../../../components/common/Title";

const NewItems = ({isDog}) => {

  const [data, setData] = useState()

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API}/shop/new`,
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
        <Title>새로 입고된 상품</Title>
        <Products data={data}/>

      </div>
  );
};

export default NewItems;