import "../../../assets/styles/shop/order/deliveryInfo.scss"
import {useDaumPostcodePopup} from "react-daum-postcode";
import {postcodeScriptUrl} from "react-daum-postcode/lib/loadPostcode";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import AddressInput from "../../../components/shop/order/delivery/AddressInput";
import Selector from "../../../components/common/Selector";
import {deliveryOptions} from "../../../utils/deliveryOption";
import InputField from "../../../components/common/InputField";
import instance from "../../../utils/axios";
import Title from "../../../components/common/Title";
import DefaultButton from "../../../components/common/DefaultButton";

const DeliveryInfo = (props) => {
    const [paymentData, setPaymentData] = useState()
    const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)

   const delivery = {
       recipient:"",
       zoneCode:"",
       address:"",
       detailAddress:"",
       phone1:"",
       phone2:"",
       phone3:"",
       requirements:""
   }

    const [deliveryInfo, setDeliveryInfo] = useState(delivery)
    //
    // const [zoneCode, setZoneCode] = useState()
    // const [address, setAddress] = useState()
    const {state} = useLocation();
    console.log("state", state);
    // console.log("state.cart.cartDetailDTOList", state.cart.items.cartDetailDTOList);
    // console.log("state.cart.isCart", state.isCart.items);

    useEffect(() => {
        console.log(deliveryInfo);
    },[deliveryInfo])



    const applyDeliveryInfo = (name,value) => {
        setDeliveryInfo((prev)=>(
            {
                ...prev,
                [name]:value
            }))

        console.log(name, value)
        console.log("executed")

    }

    const applyDeliverInfos = (infoList) => {
        setDeliveryInfo((prev)=>(
            {
                ...prev,
                ...infoList
            }))
        console.log("executed")

    }


    const popupPayment = () =>{
        const url = isMobile? paymentData["next_redirect_mobile_url"]: paymentData["next_redirect_pc_url"]
        window.location.href = url
    }

    useEffect(() => {
        paymentData&&popupPayment()
    }, [paymentData]);

    // 비 장바구니 결제
    const purchaseProducts = (e)=> {
        // e.preventDefault()
        instance({
            url:`/shop/order`,
            method:'post',
            data: {
                itemId : state.itemId,
                deliveryInfoDTO : {
                    recipient : deliveryInfo.recipient,
                    phoneNumber : `${deliveryInfo.phone1}-${deliveryInfo.phone2}-${deliveryInfo.phone3}`,
                    address : `${deliveryInfo.zoneCode} ${deliveryInfo.address} ${deliveryInfo.detailAddress}`,
                    deliveryRequest : `${deliveryInfo.requirements}`
                },option_items : state.purchaseData

            }
        }).then(res=>{
            console.log(res)
            setPaymentData(res.data)

        }).catch(err=>{
            console.log(err)
        })

    }

    // 장바구니 결제
    const purchaseCart = (e) => {
        // e.preventDefault()
        instance({
            url:`/cart/orders`,
            method:'post',
            data: {
                cartDetailDTOList : state.cart.items.cartDetailDTOList,
                deliveryInfoDTO : {
                    recipient : deliveryInfo.recipient,
                    phoneNumber : `${deliveryInfo.phone1}-${deliveryInfo.phone2}-${deliveryInfo.phone3}`,
                    address : `${deliveryInfo.zoneCode} ${deliveryInfo.address} ${deliveryInfo.detailAddress}`,
                    deliveryRequest : `${deliveryInfo.requirements}`
                }
            }
        }).then(res=>{
            console.log(res)
            setPaymentData(res.data)

        }).catch(err=>{
            console.log(err)
        })
    }

    const purchaseSelector = (e) => {
        e.preventDefault();

        if (state.isCart?.items) {
            purchaseCart(e);
        } else {
            purchaseProducts(e);
        }
    }

    return(
        <div>
            <Title>주문 정보 입력</Title>
          <div className="delivery-info-container">



              <div className="delivery-info-form-container">
              <form className="delivery-info">
                  <div className="row">
                      <label htmlFor={"recipient"} className="title">
                          수령인
                      </label>
                      <InputField name={"recipient"}
                                  input={deliveryInfo["recipient"]}
                                  className="row"
                                  setInput={applyDeliveryInfo}/>
                  </div>


                  <div className="row">
                      <label htmlFor={"detailAddress"} className="title">
                          주소지
                      </label>

                      <div>
                          <AddressInput deliveryInfo={deliveryInfo} applyDeliverInfo={applyDeliverInfos}/>
                          <InputField name={"detailAddress"}
                                      input={deliveryInfo["detailAddress"]}
                                      setInput={applyDeliveryInfo}/>
                      </div>
                  </div>

                  <div className="row">
                      <label className="title">
                          전화번호
                      </label>
                      <div className="input-phone-number">

                          <InputField name={"phone1"}
                                      input={deliveryInfo["phone1"]}
                                      setInput={applyDeliveryInfo}/>
                          <div className="hyphen">
                              <span>-</span>
                          </div>
                          <InputField name={"phone2"}
                                      input={deliveryInfo["phone2"]}
                                      setInput={applyDeliveryInfo}/>
                          <div className="hyphen">
                              <span>-</span>
                          </div>
                          <InputField name={"phone3"}
                                      input={deliveryInfo["phone3"]}
                                      setInput={applyDeliveryInfo}/>
                      </div>
                  </div>


                  <div className={"row"}>
                      <label htmlFor="requirements" className="title">
                          배송 메시지
                      </label>

                      <Selector selectedValue={deliveryInfo.requirements}
                                optionItems={deliveryOptions}
                                handleSelectChange={applyDeliveryInfo}
                                name={"requirements"}/>
                  </div>
                  <div className={"purchase-button-container"}>
                  <DefaultButton className={"primary-border long "} onClick={e => purchaseSelector(e)}> 구매하기</DefaultButton>
                  </div>
              </form>
              </div>
          </div>


        </div>
    )
}
export default DeliveryInfo