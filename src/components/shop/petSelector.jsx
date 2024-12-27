import React, {useEffect, useState} from 'react';
import ToggleBtn from "../common/ToggleBtn";
import instance from "../../utils/axios";
import PetSelectButton from "./petSelectButton";
import "../../assets/styles/shop/petSelector.scss"

const PetSelector = ({isEdit, setIsEdit})=> {

  const [data, setData] = useState([]);
  const [isEdited, setIsEdited] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      instance({
        url:"/pet/list",
        method:"get",
      }).then(res => {
        console.log(res);
        setData(res.data.petProfileList);
        setIsEdit(!isEdit);
      })
    }
  }, [isEdited]);


  return (
      <div>
        <div className="col">
          <span className={"products-comment"}>우리 아이를 위한 맞춤 추천!</span>


          <div className={"row"}>
          {data&&data.map((item, index) => (
              <PetSelectButton item={item} key={index} setIsEdited={setIsEdited} isEdited={isEdited}/>
          ))}
          </div>
        </div>
      </div>
  );
};

export default PetSelector;