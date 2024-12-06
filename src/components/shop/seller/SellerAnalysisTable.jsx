import React from 'react';

const SellerAnalysisTable = ({colName1, colName2, data1, data2}) => {
    return (
        <div>

            <div className="table-container">

            <table className={"table"}>
            <thead>
            <tr className="table-header">
                <th>{colName1}</th>
                <th>{colName2}</th>
            </tr>


            </thead>
            <tbody className="table-body">
            {data1&&data1.map((item, index) => {
                return(
                    <tr className={"col"}>
                        <td>{item}</td>
                        <td>{data2[index]}</td>
                    </tr>)
            })}
            </tbody>
        </table>

        </div>
    </div>

    );
};

export default SellerAnalysisTable;