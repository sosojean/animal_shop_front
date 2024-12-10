import React from 'react';

const WithdrawItem = ({item}) => {
    return (
        <div>
            <span>{item.date}</span>
            <span>{item.point}</span>
            <span>{item.sellerNickname}</span>

        </div>
    );
};

export default WithdrawItem;