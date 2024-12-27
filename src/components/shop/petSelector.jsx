import React, {useEffect, useState} from 'react';
import ToggleBtn from "../common/ToggleBtn";
import instance from "../../utils/axios";
import PetSelectButton from "./petSelectButton";
import "../../assets/styles/shop/petSelector.scss"

const PetSelector = ({isEdit, setIsEdit, petData})=> {

  // const [data, setData] = useState([]);
  // const [isEdited, setIsEdited] = useState(false)



  return (
      <div>
        <div className="col">
          <span className={"products-comment"}>우리 아이를 위한 맞춤 추천!</span>


          <div className={"row"}>
          {petData&&petData.map((item, index) => (
              <PetSelectButton item={item} key={index} setIsEdited={setIsEdit} isEdited={isEdit}/>
          ))}
          </div>
        </div>
      </div>
  );
};

export default PetSelector;