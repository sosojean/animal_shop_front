import {useEffect, useState} from "react";

const ThumbnailContainer = ({thumbnails}) => {

    const [index, setIndex] = useState(0)


    const enterHandler = (e)=> {
        let target = (e.target.className)
        setIndex(target.replace("img",""))
    }

    return (<>
        <div className="thumbnail-container">
            <img className={"main-img"} src={thumbnails[index]}/>

            {thumbnails && thumbnails.map((thumbnail, index) => {
                return (
                    <img onMouseEnter={enterHandler}
                         className={"img" + index}
                         src={thumbnail}
                         key={index}
                         />
                )})}
        </div>


    </>)

}
export default ThumbnailContainer