import { useEffect, useState } from "react";
import axios from "axios";
import WikiComItem from "./WikiComItem";

const WikiComments = (props) => {

    const {id, data, getRefresh} = props;

    return (
        <div>
            {data?.map((d, i) => 
                {return <WikiComItem data={d} key={i} getRefresh={getRefresh}/>})}
        </div>
    )
}

export default WikiComments;