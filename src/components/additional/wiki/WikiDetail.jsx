import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../../utils/axios";
import WikiItem from "./WikiItem";
import WikiComment from "./WikiComment";
import "../../../assets/styles/additional/wikiDetail.scss"
import Products from "../../shop/product/Products";
import Card from "../../common/Card";

const WikiDetail = () => {

    const { id } = useParams();
    const [wikiData, setWikiData] = useState(null);
    const [products, setProducts] = useState([])

    const getWikiData = () => {
        instance({
            url: `/wiki/select/${id}`,
            method: "GET"
        }).then((res) => {
            // console.log("response", res.data.wikiDTOList);
            setWikiData(res.data.wikiDTOList[0]);
        })
        .catch((err) => {
            console.error("error", err);
        })
    }

    const getProductData = () => {
        instance({
            url: `/shop/main`,
            method: "GET"
        }).then((res) => {
            // console.log("getProductData", res.data);
            setProducts(res.data.animal_custom);
        })
        .catch((err) => {
            console.error("error", err);
        })
    }

    useEffect(() => {
        getWikiData();
        getProductData();
      }, []);

    return (
        <div className="wiki-detail-container">
            <WikiItem data={wikiData}/>
            <WikiComment id={id}/>
            <Card className={"default-card wiki-recommend-card"}>
                <h3>상품 추천</h3>
                <Products data={products}/>
            </Card>
        </div>
    )
}

export default WikiDetail;