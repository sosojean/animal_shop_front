import {useEffect, useRef, useState} from "react";
import {getAbsoluteAnchorPoint} from "../../../../utils/getAbsoluteAnchorPoint";

const Thumbnails = ({thumbnails, setZoomImage, setIndex, index,setXy, xy}) => {

    let position = {x: 0, y: 0};


    const mainImg = useRef();
    useEffect(() => {
        console.log(xy)
    },[xy])

    const enterHandler = (e)=> {
        let target = (e.target.className)
        setIndex(target.replace("img",""))
    }

    const mainImageEnterHandler = (e) => {

        console.log("in")
        setZoomImage(true)
    }
    const mainImageLeaveHandler = (e) => {
        console.log("out")

        setZoomImage(false)
    }

    const mousePositionHandler = (e) => {
        e.preventDefault();
        position = getAbsoluteAnchorPoint(e,mainImg)
        setXy((prev)=>(
        {
            ...prev,
            ...position
        }))


    }

    return (<>

        <div className="thumbnail-container">

            <img onMouseEnter={mainImageEnterHandler}
                 onMouseLeave={mainImageLeaveHandler}
                 onMouseMove={mousePositionHandler}
                 ref={mainImg}
                 className={"main-img"}
                 src={thumbnails[index]}/>

            {thumbnails && thumbnails.map((thumbnail, index) => {
                return (
                    <img onMouseEnter={enterHandler}
                         className={"img" + index}
                         src={thumbnail}
                         key={index}
                    />
                )
            })}
        </div>


    </>)

}
export default Thumbnails