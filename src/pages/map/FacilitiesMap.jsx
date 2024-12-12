import React, {useEffect, useState} from 'react';
import "../../assets/styles/map/facilitiesMap.scss"
import Map from "../../components/map/Map";
import instance from "../../utils/axios";
import PlaceList from "../../components/map/PlaceList";
import PlaceFilter from "../../components/map/PlaceFilter";
import SearchBar from "../../components/map/SearchBar";
const FacilitiesMap = () => {
    const [data, setData] = useState()
    const [search, setSearch] = useState()
    const [selectedItemId, setSelectedItemId] = useState(null)
    const [mappingData, setMappingData] = useState({})

    const [totalPost, setTotalPost] = useState(0)
    const [page, setPage] = useState(1)



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

    const [searchData, setSearchData] = useState({
        keyword: "",
        // parking: false,
        // indoor: false,
        // outdoor: false,
        category: null,

    })

    let markerList = [];

    useEffect(() => {
        console.log("Bounds",Bounds)
        instance({
            url:`/map/search?page=${page}`,
            method:"post",
            data:{
                keyword: searchData.keyword,
                // parking: false,
                // indoor: false,
                // outdoor: false,

                category:searchData.category,
                swLatlng: Bounds.swLatlng,
                neLatlng: Bounds.neLatlng

            }
        }).then((res) => {
            setData(res.data.mapPositionDTOList);
            setTotalPost(res.data.total_count)
        }).catch((err) => {
            console.log(err)
        })
    }, [search, page]);



    return (
        <div className="map-outer-container">
            <div className="map-list">
                {data&&<>

                    {!selectedItemId&&<PlaceFilter  searchData={searchData} setSearchData={setSearchData}/>}
                    {!selectedItemId&&<SearchBar searchData={searchData} setSearchData={setSearchData}/>}

                    <PlaceList page={page} setPage={setPage}
                               totalPost={totalPost} selectedItemId={selectedItemId}
                               setSelectedItemId={setSelectedItemId} data={data}/>
                </>
                }
                {/*{data&&<PlaceList data={data}/>}*/}

            </div>

            {data&&<Map selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId}
                        mappingData={mappingData} setMappingData={setMappingData}
                        search={search} setSearch={setSearch} setPage={setPage}
                        currLocation={currLocation} setCurrLocation={setCurrLocation}
                        setBounds={setBounds} data={data}/>}

        </div>
    );
}

export default FacilitiesMap;