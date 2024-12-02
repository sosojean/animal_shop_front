import Card from "../common/Card";
import "../../assets/styles/additional/adoptDetail.scss"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdoptDetail = () => {

    // const { data } = props;
    const { desertionNo } = useParams();

    const [data, setData] = useState();
    const detailData = data?.find(item => item.desertionNo === desertionNo); // 해당 데이터 찾기

    const URL = "http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic";

    const getApiData = () => {
        axios({
            url: URL,
            method: "get",
            params: {
                serviceKey: process.env.REACT_APP_ADOPT_ANIMAL_KEY,
                numOfRows: 10,
                pageNo: 2,
                _type: "json",
            }
        }).then((res) => {
            console.log("response", res.data);
            setData(res.data.response.body.items.item);
        })
        .catch((err) => {
            console.error("error", err);
        })
    };

    useEffect(()=>{
        getApiData();
    }, []);

    return (
        <>
        {detailData &&
            <Card className="adopt-detail-container">
                <div className="img-container">
                    <img src={detailData.popfile}/>
                </div>
                <div className="info-container">
                    <div className="basic-container">
                        <span>
                            {detailData.upkind === 417000 ? "강아지" : 
                                detailData.upkind === 422400 ? "고양이" : "기타"}
                        </span>
                        <span>{" / "}{detailData.kindCd}</span>
                        <span>{" / "}{detailData.age}</span>
                    </div>
                    <div className="feature-container">
                        <div>
                            <span>
                                {detailData.sexCd === 'F' ? "여아" : 
                                    detailData.sexCd === 'M' ? "남아" : "성별미상"}
                            </span>
                            <span>{" / "}중성화 {detailData.neuterYn}</span>
                            <span>{" / "}{detailData.colorCd}</span>
                            <span>{" / "}무게 {detailData.weight}</span>
                        </div>
                        <div>
                            <p>특이사항 {detailData.specialMark}</p>
                        </div>
                    </div>
                    <div className="period-container">
                        <p>상태 {detailData.processState}</p>
                        <p>공고번호 {detailData.noticeNo}</p>
                        <p>공고기간 {detailData.noticeSdt} ~ {detailData.noticeEdt}</p>
                        <p>발견장소 {detailData.happenPlace}</p>
                    </div>
                    <div>
                        <div>
                            <span>보호소 {detailData.careNm}</span>
                            <span>{" / "}보호소 연락처 {detailData.careTel}</span>
                        </div>
                        <div> 
                            <p>보호주소 {detailData.careAddr} </p>
                        </div>
                    </div>
                </div>
            </Card>        
        }        
        </>
    )
}

export default AdoptDetail;