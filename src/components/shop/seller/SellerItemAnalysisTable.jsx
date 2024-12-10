import React, {useEffect, useState} from 'react';
import "../../../assets/styles/shop/admin/statAnalysisTable.scss"


const SellerItemAnalysisTable = ({itemPriceData}) => {

    const [data, setData] = useState()
    useEffect(() => {

        console.log(itemPriceData)
    }, []);

        return (<>
            <div className="table-container">

                {itemPriceData &&
                    <div>
                        <table className={"table"} border="1" cellPadding="10" cellSpacing="0">
                            <thead>
                            <tr className="table-header">
                                <th>Item Name</th>
                                <th>Option</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody className="table-body">
                            {itemPriceData.map((item, index) => {
                                return Object.entries(item.options).map(([option, value], idx) => (
                                    <tr key={`${index}-${idx}`}>
                                        {idx === 0 ?
                                            <td >{item.name}</td> : <td> </td>}
                                        <td>{option}</td>
                                        <td>{value}</td>
                                    </tr>
                                ));
                            })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            </>
            );
            };


            export default SellerItemAnalysisTable;