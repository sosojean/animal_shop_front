import React from 'react';

const HistoryItem = ({item}) => {
    return (
        <div>
          <span>{item.date}</span>
          <span> - </span>

          <span>{item.point}</span>
        </div>
    );
};

export default HistoryItem;