import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {toast} from "react-toastify";
import "../../../assets/styles/shop/product/searchBar.scss"


const ProductSearchBar = () => {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState(""); // 초기 상태 설정

    const productSearchHandler = (e) => {
        e.preventDefault();

        const trimmedKeyword = searchKeyword.trim();
        if (!trimmedKeyword) {
            toast.warn("검색어를 입력해주세요.")
             return;
        }

        navigate(`/shop/product/search?keyword=${encodeURIComponent(trimmedKeyword)}`);
    };

    return (
        <div className="searchBar">
        <form onSubmit={productSearchHandler}>
            <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="검색어를 입력하세요"
            />
            {/*<button type="submit">검색</button>*/}
        </form>
        </div>
    );
};

export default ProductSearchBar;
