import React from 'react';
import "../../../assets/styles/shop/admin/statAnalysisTable.scss"
import DefaultButton from "../../common/DefaultButton";
import instance from "../../../utils/axios";
import {toast} from "react-toastify";

const StatAnalysisTableCol4 = ({data,colName1, colName2, colName3,colName4,disabled, isEdited, setIsEdited}) => {
    // console.log(data);

    const withdrawHandler = (item)=>{
        instance({
            url:"/admin/withdraw",
            method:"post",
            data:{
                date:item[colName1],
                sellerNickname:item[colName2]

            }
        }).then(res=>{
            console.log(res);
            setIsEdited(!isEdited)
            toast.success(`${item[colName2]}님의 정산이 완료되었습니다.`)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className="table-container">

        <table className={"table"}>
            <thead>
            <tr className="table-header">
                <th>{colName1}</th>
                <th>{colName2}</th>
                <th>{colName3}</th>
                <th className={"with-draw"}>{colName4}</th>


            </tr>

            </thead>
            <tbody className="table-body">
            {data&&data.map((item, index) => {
            return(
                <tr className={"col"} key={item[colName1]+index}>
                    <td>{item[colName1]}</td>
                    <td>{item[colName2]}</td>
                    <td>{item[colName3]}</td>
                    <td className={"with-draw"}>
                        <DefaultButton
                            disabled={disabled}
                            onClick={(e)=>withdrawHandler(item,e)}
                            className={"primary wd100"}>
                            {colName4}
                        </DefaultButton>
                    </td>
                </tr>)})}
            </tbody>
        </table>

        </div>
    );
};

export default StatAnalysisTableCol4;