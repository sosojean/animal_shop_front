import React, {useEffect, useRef, useState} from 'react';
import Search from "../../pages/board/Search";

const Map = ({currLocation,setCurrLocation , setBounds, data , setSearch , search}) => {
    const mapRef = useRef(null); // 지도 객체를 저장할 ref
    let map = mapRef.current;

    const [mapLoaded, setMapLoaded] = useState(false); // 상태 추가
    const [locationLoaded, setLocationLoaded] = useState(false)
    const [markerChanged, setMarkerChanged] = useState(false)
    const [markers, setMarkers] = useState([]);

    let kakao =null;

    const new_script = src => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            console.log(src)
            script.src = src;
            script.addEventListener('load', () => {resolve();});
            script.addEventListener('error', e => {reject(e);});
            document.head.appendChild(script);
        });
    };

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
                // console.log("map",map);
                setMapLoaded(true)
            }

        });
    }

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

    }


    const applyBound=(map)=>{
        const bounds = map.getBounds();

        let swLatlng = bounds.getSouthWest();

        // 영역정보의 북동쪽 정보를 얻어옵니다
        let neLatlng = bounds.getNorthEast();
        console.log("-----------",bounds);
        setCurrentBounds(swLatlng, neLatlng);
    }


    useEffect(() => {

        //     const clearAllMarkers = () => {
        //         markers.forEach((marker) => marker.setMap(null));
        //         setMarkers([]);
        //     };
        //     clearAllMarkers()
        //
        //     // 마커 추가
        const kakao = window.kakao;
        if(map&&kakao){
        data.map((item) => {

            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(item.latitude, item.longitude),
                title: item.facility_name,
            });

            console.log("marker",marker)
            console.log(item);

        });

        }

            //
            // positions.forEach((position) => {
            //     new kakao.maps.Marker({
            //         map: map,
            //         position: position.latlng,
            //         title: position.title,
            //     });
            // });
        // }
    }, [data]);




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