import "../../assets/styles/shop/deliverInfo.scss"

const DeliverInfo = (props) => {
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
                      <input id="address1" type="text"/>
                      <button>
                          주소검색
                      </button>
                  </div>


                  <input id="address2" type="text"/>
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