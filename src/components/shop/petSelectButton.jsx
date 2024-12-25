import React from 'react';
import instance from "../../utils/axios";

const PetSelectButton = ({item, isEdited, setIsEdited}) => {
  function changeLeader() {
    instance({
      url:`/pet/leader/${item.id}`,
      method:"patch"
    }).then(res=>{
      setIsEdited(!isEdited);
    })
  }

  return (
      <button
          onClick={()=>{changeLeader()}}
          aria-selected={item.isLeader}
          className={item.isLeader?"pet-select-button selected":"pet-select-button"}>
        <img className={"pet-profile"}
             src={`${process.env.REACT_APP_IMG_PRINT}${item.profileImageUrl}`}/>
        <span className={"pet-name"}>{item.name}</span>


      </button>
  );
};

export default PetSelectButton;