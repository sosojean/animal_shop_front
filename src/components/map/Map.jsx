import React, {useEffect, useRef, useState} from 'react';

const Map = ({currLocation,setCurrLocation , setBounds, data}) => {
    const mapRef = useRef(null); // 지도 객체를 저장할 ref
    const map = mapRef.current;

    const [mapLoaded, setMapLoaded] = useState(false); // 상태 추가
    const [locationLoaded, setLocationLoaded] = useState(false)
    const [markerChanged, setMarkerChanged] = useState(false)
    const [markers, setMarkers] = useState([]);
    const [swLatLng, setSwLatLng] = useState()
    const [neLatLng, setNeLatLng] = useState()

    // let swLatLng=null;
    // let neLatLng=null;
    let positions = []
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
        console.log('script loaded!!!');
        kakao = window['kakao'];

        kakao.maps.load(() => {
            const mapContainer = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(currLocation.latitude ? currLocation.latitude : 37.56000302825312, currLocation.longitude ? currLocation.longitude : 126.97540593203321), //좌표설정
                level: 8
            };
            if (!mapRef.current) {
                mapRef.current = new kakao.maps.Map(mapContainer, options);
                setMapLoaded(true)
            }

        });
    }

    const setCurrentBounds = ( )=>{
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

    const getBound = ()=>{
        const map = mapRef.current;

        const bounds = map.getBounds();
        setSwLatLng(bounds.getSouthWest())
        setNeLatLng(bounds.getNorthEast())

        setCurrentBounds()

    }



    useEffect(() => {

            const clearAllMarkers = () => {
                markers.forEach((marker) => marker.setMap(null));
                setMarkers([]);
            };
            clearAllMarkers()

            // 마커 추가
            const kakao = window.kakao;
            const newMarkers = data.map((item) => {
                const marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(item.latitude, item.longitude),
                    title: item.facility_name,
                });
                return marker;
            });
            setMarkers(newMarkers);

            console.log(positions)


            positions.forEach((position) => {
                new kakao.maps.Marker({
                    map: map,
                    position: position.latlng,
                    title: position.title,
                });
            });
        // }
    }, [ data, markerChanged]);




    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Current Position:', position);
                setCurrLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setLocationLoaded(true); // 현위치 설정 후 로드 상태 변경
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
                    console.log('Kakao Maps SDK loaded');
                    loadMap();
                    getBound();

                })
                .catch((err) => {
                    console.error('Error loading Kakao Maps SDK:', err);
                });
        }
    }, [locationLoaded]); // locationLoaded가 변경될 때만 실행


    return (
            <div className="map-container">
                <div id="map" className="map"/>
                <button onClick={setCurrentBounds}>aa</button>
            </div>
    );

};

export default Map;