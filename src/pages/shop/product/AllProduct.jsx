import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Products from "../../../components/shop/product/Products";

const AllProduct = (props) => {

    const {category} = useParams();
    const [data, setData] = useState()



    useEffect(() => {
// todo : 카테고리 받아와야함
        let url = `http://localhost:8080/shop/product-category`
        // species=species&category=category&detailed_category&page=1
        axios({
            url:url ,
            method:"get",
            params:{
                species:"dog",
                // category:"Toys",
                // ["detailed-category"]:"Chewing",
                // page:1
            }
        }).then(res => {
            console.log(res)
            setData(res.data["goods"]);
        }).catch(err=>{
            console.log(err)
        })
    },[])



    return (<>
        <span>all</span>
        {data&& <Products name ={category}  data={data}/>}
    </>)
  
}
export default AllProduct;



