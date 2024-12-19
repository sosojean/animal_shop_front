import React, {useEffect} from 'react';
import "../../assets/styles/map/mapSearchBar.scss"
import DefaultButton from "../common/DefaultButton";
const SearchBar = ({searchData, setSearchData , search , setSearch , setPage , page}) => {
    useEffect(() => {
        console.log(searchData);
    }, [searchData]);
    return (
        <form className={"map-search-bar"}>

            <input
                value={searchData.keyword}
                   onChange={(e) => {
                       setSearchData((prev) => ({
                           ...prev, keyword: e.target.value,
                       }))
                   }} type="text"/>
            <DefaultButton className={"primary"} onClick={(e) => {
                e.preventDefault();
                setSearch(!search)
                setPage(1)
            }}>검색
            </DefaultButton>

        </form>
    );
};

export default SearchBar;