import React from 'react';
import "../../assets/styles/common/title.scss"

const Title = ({children, className}) => {
    return (
        <div className="title-container">
           <h2 className={`title ${className?" "+className:"default"}`}>{children} </h2>
        </div>
    );
};

export default Title;