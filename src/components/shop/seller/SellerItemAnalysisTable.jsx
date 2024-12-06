import React, {useEffect, useState} from 'react';

const SellerItemAnalysisTable = ({itemPriceData}) => {

    const [data, setData] = useState()
    useEffect(() => {

        console.log(itemPriceData)
    }, []);

        return (<>
            {itemPriceData&&
                <div>
                    <table border="1" cellPadding="10" cellSpacing="0">
                        <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Option</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {itemPriceData.map((item, index) => {
                            return Object.entries(item.options).map(([option, value], idx) => (
                                <tr key={`${index}-${idx}`}>
                                    {idx === 0 ? <td rowSpan={Object.keys(item.options).length}>{item.name}</td> : null}
                                    <td>{option}</td>
                                    <td>{value}</td>
                                </tr>
                            ));
                        })}
                        </tbody>
                    </table>
                </div>
            }
        </>);
    };


    export default SellerItemAnalysisTable;