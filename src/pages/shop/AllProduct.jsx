import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Products from "../../components/shop/Products";

const AllProduct = (props) => {

    const {category} = useParams();
    const [data, setData] = useState()



    useEffect(() => {

        let url = `http://localhost:8080/shop/product-category/${category}/Toy?page=1`
        if (category === "all") {
            url = `http://localhost:8080/shop/best?page=1`
        }
        axios({
            url:url ,
            method:"get"
        }).then(res => {
            console.log(res.data);
            setData(res.data["best_goods"]);
        })
    },[])



    return (<>
        {data&& <Products name ={category}  data={data}/>}



    </>)
  
}
export default AllProduct;