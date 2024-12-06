import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/common/nextPrevButton.scss"

const NextPrevButton = ({value, setValue, start, stop}) => {
    function prevHandler() {
        setValue(prevValue=>prevValue!=start?prevValue - 1:prevValue);
    }

    function nextHandler() {
        setValue(prevValue=>prevValue!=stop?prevValue + 1:prevValue);
    }

    return (
        <div className="next-prev-button">
            <button onClick={prevHandler}><FontAwesomeIcon icon={faAngleLeft}/></button>
            <span>{value}</span>
            <button onClick={nextHandler}><FontAwesomeIcon icon={faAngleRight}/></button>
        </div>
    );
};

export default NextPrevButton;
