import React, {useEffect} from 'react';
import "../../assets/styles/map/facilitiesMap.scss"
const FacilitiesMap = () => {

    const new_script = src => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            console.log(src)
            // https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=94c5dc85ebfabf9d7ac134e18c4bc9b8
            script.src = src;
            script.addEventListener('load', () => {
                resolve();
            });
            script.addEventListener('error', e => {
                reject(e);
            });
            document.head.appendChild(script);
        });
    };

    useEffect(() => {
        let latitude;
        let longitude;

        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)

            latitude= position.coords.latitude
            longitude= position.coords.longitude
        });


            const my_script = new_script(`https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.REACT_APP_KAKAO_KEY}`);
            my_script.then(() => {
                console.log('script loaded!!!');
                const kakao = window['kakao'];
                kakao.maps.load(() => {
                    const mapContainer = document.getElementById('map');
                    const options = {
                        center: new kakao.maps.LatLng(latitude?latitude:37.56000302825312, longitude?longitude:126.97540593203321), //좌표설정
                        level: 3
                    };
                    const map = new kakao.maps.Map(mapContainer, options); //맵생성
                    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

                    var positions = [
                        {
                            title: '내 위치',
                            latlng: new kakao.maps.LatLng(latitude, longitude)
                        },
                        {
                            title: '생태연못',
                            latlng: new kakao.maps.LatLng(33.450936, 126.569477)
                        },
                        {
                            title: '텃밭',
                            latlng: new kakao.maps.LatLng(33.450879, 126.569940)
                        },
                        {
                            title: '근린공원',
                            latlng: new kakao.maps.LatLng(33.451393, 126.570738)
                        }
                    ];
                    for (var i = 0; i < positions.length; i ++) {

                        // 마커 이미지의 이미지 크기 입니다
                        var imageSize = new kakao.maps.Size(24, 35);

                        // 마커 이미지를 생성합니다
                        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                        // 마커를 생성합니다
                        var marker = new kakao.maps.Marker({
                            map: map, // 마커를 표시할 지도
                            position: positions[i].latlng, // 마커를 표시할 위치
                            title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                            image : markerImage // 마커 이미지
                        });
                    }
                    //마커설정
                    // const markerPosition = new kakao.maps.LatLng(37.56000302825312, 126.97540593203321);
                    // const marker = new kakao.maps.Marker({
                    //     map:map,
                    //     position: markerPosition
                    // });
                    // marker.setMap(map);
                });
            }).catch(err=>{
                console.log(err);

            });

        //카카오맵 스크립트 읽어오기

        //스크립트 읽기 완료 후 카카오맵 설정

    }, []);

    return (
        <>
            <div>목록</div>
        <div className="map-container">
            <div id="map" className="map"/>
        </div>
        </>
    );
}

export default FacilitiesMap;