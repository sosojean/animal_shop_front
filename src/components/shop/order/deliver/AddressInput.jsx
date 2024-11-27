import {useDaumPostcodePopup} from "react-daum-postcode";
import {postcodeScriptUrl} from "react-daum-postcode/lib/loadPostcode";

const AddressInput = ({deliverInfo, applyDeliverInfo}) => {

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

            applyDeliverInfo({"address": `${localAddress} ${extraAddress} ${townAddress}`,"zoneCode":data.zonecode});
        }
    }
    //클릭 시 발생할 이벤트


    const handleClick = (e) => {
        e.preventDefault()
        //주소검색이 완료되고, 결과 주소를 클릭 시 해당 함수 수행
        open({onComplete: handleComplete});
    }


    return (
        <div className="input-address">
            <label htmlFor="address">배송지</label>

            <div className="input-post-number">
                <input id="address1" type="text" value={deliverInfo.zoneCode}/>
                <button onClick={handleClick}>
                    주소검색
                </button>
            </div>


            <input id="address2" type="text" value={deliverInfo.address}/>
            <input id="address3" type="text"/>
        </div>
    );
};

export default AddressInput;