import React, { useRef, useState } from "react";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShare} from "@fortawesome/free-solid-svg-icons";

const CopyUrlButton = () => {
    const hiddenInputRef = useRef(null);

    const handleCopyUrl = () => {
        const currentUrl = window.location.href;
        hiddenInputRef.current.value = currentUrl;
        hiddenInputRef.current.select();
        document.execCommand("copy");
        toast.success("현재 URL 주소가 복사되었습니다!");

    };

    return (
        <div>
            <button onClick={handleCopyUrl}>


                <FontAwesomeIcon icon={faShare}/>공유
            </button>
            <input
                ref={hiddenInputRef}
                type="text"
                style={{ position: "absolute", left: "-9999px" }}
                readOnly
            />
        </div>
    );
};

export default CopyUrlButton;
