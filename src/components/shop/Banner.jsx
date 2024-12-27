import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import catBanner001 from "../../assets/img/banner/cat/001.jpg";
import catBanner002 from "../../assets/img/banner/cat/002.jpg";
import catBanner003 from "../../assets/img/banner/cat/003.jpg";
import catBanner004 from "../../assets/img/banner/cat/004.jpg";
import catBanner005 from "../../assets/img/banner/cat/005.jpg";

import dogBanner001 from "../../assets/img/banner/dog/001.jpg";
import dogBanner002 from "../../assets/img/banner/dog/002.jpg";
import dogBanner003 from "../../assets/img/banner/dog/003.jpg";
import dogBanner004 from "../../assets/img/banner/dog/004.jpg";

import commonBanner001 from "../../assets/img/banner/common/001.jpg";
import commonBanner002 from "../../assets/img/banner/common/002.jpg";
import commonBanner003 from "../../assets/img/banner/common/003.jpg";
import commonBanner004 from "../../assets/img/banner/common/004.jpg";

import "../../assets/styles/shop/banner.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

const Banner = ({ isDog }) => {
    const catBanners = [catBanner001, catBanner002, catBanner003, catBanner004, catBanner005];
    const dogBanners = [dogBanner001, dogBanner002, dogBanner003, dogBanner004];
    const commonBanners = [commonBanner001, commonBanner002, commonBanner003, commonBanner004];

    const activeBanners = isDog ? dogBanners.concat(commonBanners) : catBanners.concat(commonBanners);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            slideNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const slideNext = () => {
        if (isSliding) return;
        setIsSliding(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % activeBanners.length);
        setTimeout(() => setIsSliding(false), 500);
    };

    const slidePrev = () => {
        if (isSliding) return;
        setIsSliding(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + activeBanners.length) % activeBanners.length);
        setTimeout(() => setIsSliding(false), 500);
    };

    const handleClick = () => {
        const links = isDog
            ? ["/wiki", "/shop/list/treats/homemade_treats", "/shop/list/supplies/toys", "/shop/list/supplies/clothing-accessories", "/", "/adoption", "/adoption", "/"]
            : ["/wiki", "/shop/list/supplies/fishing_rods-lasers", "/shop/list/treats/homemade_treats", "/wiki", "/", "/adoption", "/adoption", "/"];
        navigate(links[currentIndex] || "/");
    };

    return (
        <div className="banner-container">
            <div
                className={`banner-img-wrapper ${isSliding ? "animating" : ""}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {activeBanners.map((banner, index) => (
                    <img
                        key={index}
                        className="banner-img"
                        src={banner}
                        alt="banner"
                        onClick={handleClick}
                    />
                ))}
            </div>
            <button className="prev-button" onClick={slidePrev} disabled={isSliding}>
               <FontAwesomeIcon icon={faAngleLeft}/>
            </button>
            <button className="next-button" onClick={slideNext} disabled={isSliding}>
                <FontAwesomeIcon icon={faAngleRight}/>
            </button>
        </div>
    );
};

export default Banner;
