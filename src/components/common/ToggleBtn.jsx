import React, {useEffect, useState} from 'react';
import catIcon from "../../assets/img/catIcon.svg"
import dogIcon from "../../assets/img/dogIcon.svg"

import "../../assets/styles/common/ToggleBtn.scss"

const ToggleBtn = ({isDog, setIsDog}) => {
  useEffect(() => {
    localStorage.setItem("species",isDog?"dog":"cat")

    const species = localStorage.getItem("species");



    if (species){
      setIsDog(species==="dog");
    }

  }, [isDog]);

  const toggleHandler = () => {
    setIsDog((prev) => !prev);
  };


  return (
      <div className="BtnWrapper" onClick={toggleHandler}>
        {/* 왼쪽 텍스트 */}
        <div className={`Text left ${isDog ? "active" : ""}`}>
          고양이
        </div>

        {/* 오른쪽 텍스트 */}
        <div className={`Text right ${!isDog ? "active" : ""}`}>
          강아지
        </div>

        {/* 토글 버튼 */}
        <div
            className="ToggleButton"
            style={{
              transform: isDog ? "translateX(0)" : "translateX(3rem)", // 이동 애니메이션
            }}>
          <img className="btnImage" src={isDog?dogIcon:catIcon} alt=""/>
        </div>
      </div>
  );
};

export default ToggleBtn;