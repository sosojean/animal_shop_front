import "../../assets/styles/shop/deliverInfo.scss"
import {useDaumPostcodePopup} from "react-daum-postcode";
import {postcodeScriptUrl} from "react-daum-postcode/lib/loadPostcode";
import {useState} from "react";

const DeliverInfo = (props) => {
    const [zoneCode, setZoneCode] = useState()

    const [address, setAddress] = useState()

        //클릭 시 수행될 팝업 생성 함수
    const open = useDaumPostcodePopup(postcodeScriptUrl);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; //추가될 주소
        let localAddress = data.sido + ' ' + data.sigungu; //지역주소(시, 도 + 시, 군, 구)
        let townAddress = '';
        if (data.addressType === 'R' ) { //주소타입이 도로명주소일 경우
            if (data.bname !== ''  && /[동|로|가]$/g.test(data.bname)) {
                extraAddress += data.bname; //법정동, 법정리
            }
            if (data.buildingName !== '') { //건물명
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            //지역주소 제외 전체주소 치환
            fullAddress = fullAddress.replace(localAddress, '');

            townAddress = fullAddress += (extraAddress !== '' ? `(${extraAddress})` : '')


            console.log("extraAddress"+extraAddress);
            setAddress(localAddress + + extraAddress + townAddress +"");
            setAddress(`${localAddress} ${extraAddress} ${townAddress}`);
            setZoneCode(data.zonecode)




        }
    }
        //클릭 시 발생할 이벤트


    const handleClick = (e) => {
            e.preventDefault()
        //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
        open({onComplete: handleComplete});
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

              <div className="input-address">
                  <label htmlFor="address">배송지</label>

                  <div className="input-post-number">
                      <input id="address1" type="text" value={zoneCode}/>
                      <button onClick={handleClick}>
                          주소검색
                      </button>
                  </div>


                  <input id="address2" type="text" value={address}/>
                  <input id="address3" type="text"/>
              </div>

              <div className="input-phone-number">
              <label htmlFor="phone">휴대전화</label>

                  <input id="phone" type="number"/>
                  <span>-</span>
                  <input id="phone" type="number"/>
                  <span>-</span>
                  <input id="phone" type="number"/>
              </div>


              <label htmlFor="message"/>
              <select name="message" id="message">
                  <option value="aaa" disabled hidden selected>배송시 요청사항을 선택해 주세요</option>
                  <option value="a">부재시 문앞에 놓아주세요.</option>
                  <option value="a">부재시 경비실에 맡겨 주세요.</option>
                  <option value="a">부재시 전화 또는 문자 주세요.</option>
                  <option value="a">택배함에 넣어 주세요.</option>
                  <option value="a">파손위험상품입니다. 배송시 주의해주세요.</option>
                  <option value="a">배송전에 연락주세요.</option>
                  <option value="a">직접입력</option>


              </select>


          </form>

      </div>


      <div>
          <span>right</span>

      </div>


  </div>)
}
export default DeliverInfo