import React, {useEffect, useState} from 'react';
import "../../assets/styles/map/facilitiesMap.scss"
import Map from "../../components/map/Map";
import instance from "../../utils/axios";
import PlaceList from "../../components/map/PlaceList";
const FacilitiesMap = () => {
    const [data, setData] = useState()
    const [search, setSearch] = useState()
    const [selectedItemId, setSelectedItemId] = useState(null)
    const [mappingData, setMappingData] = useState({})



    const [currLocation, setCurrLocation] = useState(
        {lat: 0, lng: 0},
    )

    const [Bounds, setBounds] = useState({
        swLatlng: {
            latitude: 0,
            longitude: 0
        },
        neLatlng: {
            latitude: 0,
            longitude: 0
        }
    })

    let markerList = [];

    useEffect(() => {
        console.log("Bounds",Bounds)
        instance({
            url:"/map/search",
            method:"post",
            data:{
                "keyword": "약국",
                // "parking": true,
                // "indoor": false,
                // "outdoor": true,


                "swLatlng": Bounds.swLatlng,
                "neLatlng": Bounds.neLatlng

            }
        }).then((res) => {
            setData(res.data.mapPositionDTOList);
            console.log(res.data.mapPositionDTOList);
        }).catch((err) => {
            console.log(err)
        })
    }, [search]);



    return (
        <div className="map-outer-container">
            <div className="map-list">
                {data&&<PlaceList selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId} data={data}/>}
                {/*{data&&<PlaceList data={data}/>}*/}

            </div>

            {data&&<Map selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId}
                        mappingData={mappingData} setMappingData={setMappingData}
                        search={search} setSearch={setSearch}
                        currLocation={currLocation} setCurrLocation={setCurrLocation}
                        setBounds={setBounds} data={data}/>}

        </div>
    );
}

export default FacilitiesMap;