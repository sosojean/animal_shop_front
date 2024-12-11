import React, {useEffect, useRef, useState} from 'react';
import Search from "../../pages/board/Search";

const Map = ({ selectedItemId,setSelectedItemId,currLocation,setCurrLocation , setBounds, data ,
                 setSearch , search, mappingData, setMappingData,
             }) => {
    const mapRef = useRef(null); // 지도 객체를 저장할 ref
    let map = mapRef.current;
    let kakao =null;

    const [mapLoaded, setMapLoaded] = useState(false); // 상태 추가
    const [locationLoaded, setLocationLoaded] = useState(false)
    const [markerChanged, setMarkerChanged] = useState(false)
    const [markers, setMarkers] = useState([]);



    const new_script = src => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            console.log(src)
            script.src = src;
            script.addEventListener('load', () => {resolve();});
            script.addEventListener('error', e => {reject(e);});
            document.head.appendChild(script);
        });
    }; // kakao 스크립트 호출

    const loadMap=() => {
        // console.log('script loaded!!!');
        kakao = window['kakao'];

        kakao.maps.load(() => {
            const mapContainer = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(currLocation.latitude ? currLocation.latitude : 37.56000302825312, currLocation.longitude ? currLocation.longitude : 126.97540593203321), //좌표설정
                level: 8
            };
            if (!mapRef.current) {
                mapRef.current = new kakao.maps.Map(mapContainer, options);
                map = mapRef.current;
                kakao.maps.event.addListener(map, 'bounds_changed',function (){
                    applyBound(map)
                })

                setMapLoaded(true)
            }

        });
    } // map 맵로드

    const setCurrentBounds = ( swLatLng,neLatLng )=>{
        setBounds(
            {
                swLatlng: {
                    latitude: swLatLng.Ma,
                    longitude: swLatLng.La
                },
                neLatlng: {
                    latitude:neLatLng.Ma,
                    longitude: neLatLng.La
                }
            }
        )
        setMarkerChanged(!markerChanged)
    } // 현 영역 get


    const applyBound=(map)=>{
        const bounds = map.getBounds();

        let swLatlng = bounds.getSouthWest();

        // 영역정보의 북동쪽 정보를 얻어옵니다
        let neLatlng = bounds.getNorthEast();
        // console.log("-----------",bounds);
        setCurrentBounds(swLatlng, neLatlng);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // console.log('Current Position:', position);
                setCurrLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setLocationLoaded(!locationLoaded); // 현위치 설정 후 로드 상태 변경
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    }, []);

    useEffect(() => {
        // 마커 추가
        const kakao = window.kakao;
        if(map&&kakao){

            markers.forEach(marker => marker.setMap(null));
            setMarkers([]);

            const newMarkers = data.map((item) => {
                var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
                    imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
                    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)


                let position = new kakao.maps.LatLng(item.latitude, item.longitude)
                const isSelected = selectedItemId === item["map_id"];


                const marker = new kakao.maps.Marker({
                    map: map,
                    position: position,
                    title: item.facility_name,
                    image: isSelected ? markerImage : null,
                    zIndex: isSelected? 10:1
                });

                setMappingData((prev)=>({
                    ...prev,
                    [item.map_id]:marker
                }))




                ////////////////////

                kakao.maps.event.addListener(marker, 'click', function() {
                    console.log(item);
                    setSelectedItemId(item["map_id"])


                    console.log(this.getTitle());
                });

                //////////////////////
                if (isSelected){
                    map.panTo(position);
                }

                // console.log("marker",marker)
                // console.log(item);
                return marker

            });
            setMarkers(newMarkers);

        }

    }, [data, map, selectedItemId]);

    useEffect(() => {

        console.log(selectedItemId)

    }, [selectedItemId]);


    useEffect(() => {
        if (locationLoaded) {
            const my_script = new_script(
                `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.REACT_APP_KAKAO_KEY}`
            );

            my_script
                .then(() => {
                    // console.log('Kakao Maps SDK loaded');
                    loadMap();

                    if (map){
                        applyBound(map)
                    }

                })
                .catch((err) => {
                    console.error('Error loading Kakao Maps SDK:', err);
                });
        }
    }, [locationLoaded, map]); // locationLoaded가 변경될 때만 실행


    return (
            <div className="map-container">
                <div id="map" className="map"/>
                <button onClick={()=>setSearch(!search)} >aa</button>
            </div>
    );

};

export default Map;