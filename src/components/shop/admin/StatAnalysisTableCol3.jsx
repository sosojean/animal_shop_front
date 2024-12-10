import React from 'react';
import "../../../assets/styles/shop/admin/statAnalysisTable.scss"

const StatAnalysisTableCol3 = ({data,colName1, colName2, colName3}) => {
    console.log(data);
    return (
        <div className="table-container">

        <table className={"table"}>
            <thead>
            <tr className="table-header">
                <th>{colName1}</th>
                <th>{colName2}</th>
                <th>{colName3}</th>

            </tr>

            </thead>
            <tbody className="table-body">
            {data&&data.map((item, index) => {
            return(
                <tr className={"col"} key={item[colName1]}>
                    <td>{item[colName1]}</td>
                    <td>{item[colName2]}</td>
                    <td>{item[colName3]}</td>

                </tr>)
            })}
            </tbody>
        </table>

        </div>
    );
};

export default StatAnalysisTableCol3;