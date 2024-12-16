import React from 'react';
import "../../assets/styles/common/button.scss"


const DefaultButton = ({children, onClick, className}) => {
    return (
            <button className={`button ${className?" "+className:""}`} onClick={onClick}>{children}</button>
    );
};

export default DefaultButton;