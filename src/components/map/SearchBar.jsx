import React, {useEffect} from 'react';
import InputField from "../common/InputField";

const SearchBar = ({searchData, setSearchData}) => {
    useEffect(() => {
        console.log(searchData);
    }, [searchData]);
    return (

        <input value={searchData.keyword}
               onChange={(e)=>{setSearchData((prev)=>({
                   ...prev, keyword: e.target.value,
               }))}} type="text"/>
        );
};

export default SearchBar;