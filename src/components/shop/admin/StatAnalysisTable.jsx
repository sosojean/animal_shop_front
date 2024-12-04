import React from 'react';
import "../../../assets/styles/shop/admin/statAnalysisTable.scss"

const StatAnalysisTable = ({data,colName1, colName2}) => {
    console.log(data);
    return (
        <div className="table-container">

        <table className={"table"}>
            <thead>
                <tr className="table-header">
                    <th>{colName1}</th>
                    <th>{colName2}</th>
                </tr>


            </thead>
            <tbody className="table-body">
            {data&&data.map((item, index) => {
            return(
                <tr className={"col"} key={item[colName1]}>
                    <td>{item[colName1]}</td>
                    <td>{item[colName2]}</td>
                </tr>)
                })}
            </tbody>
        </table>

        </div>
    );
};

export default StatAnalysisTable;