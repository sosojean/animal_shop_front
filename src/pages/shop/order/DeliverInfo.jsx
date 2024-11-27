import "../../../assets/styles/shop/order/deliverInfo.scss"
import {useDaumPostcodePopup} from "react-daum-postcode";
import {postcodeScriptUrl} from "react-daum-postcode/lib/loadPostcode";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import AddressInput from "../../../components/shop/order/deliver/AddressInput";
import Selector from "../../../components/common/Selector";
import {deliveryOptions} from "../../../utils/deliverOption";

const DeliverInfo = (props) => {
   const deliver = {
       recipient:"",
       zoneCode:"",
       address:"",
       phone:"",
       requirements:""
   }

    const [deliverInfo, setDeliverInfo] = useState(deliver)
    //
    // const [zoneCode, setZoneCode] = useState()
    // const [address, setAddress] = useState()
    const {state} = useLocation();
    console.log(state);


    const applyDeliverInfo = (name,value) => {
        setDeliverInfo((prev)=>(
            {
                ...prev,
                [name]:value
            }))
    }

    const applyDeliverInfos = (infoList) => {
        setDeliverInfo((prev)=>(
            {
                ...prev,
                ...infoList
            }))
    }



    return(<div>
      <div>
          <span>left</span>
          {/*<input type="text"/>*/}
          <div className="buttons">
              <button>기존 배송지</button>
              <button>신규 배송지</button>

          </div>


          <form className="deliver-info">
              <label htmlFor="name">수령인</label>
              <input id="name" type="text"/>


              <AddressInput  deliverInfo={deliverInfo} applyDeliverInfo={applyDeliverInfos}/>

              <div className="input-phone-number">
              <label htmlFor="phone">휴대전화</label>

                  <input id="phone" type="number"/>
                  <span>-</span>
                  <input id="phone" type="number"/>
                  <span>-</span>
                  <input id="phone" type="number"/>
              </div>


              <label htmlFor="requirements"/>
              <Selector optionItems={deliveryOptions}
                        handleSelectChange={applyDeliverInfo}
                        name={"requirements"}/>
          </form>

      </div>

      <div>
          <span>right</span>

      </div>


  </div>)
}
export default DeliverInfo