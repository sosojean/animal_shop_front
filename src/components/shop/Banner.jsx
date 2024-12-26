import dogBanner001 from "../../assets/img/dog_banner_001.jpg"
import catBanner001 from "../../assets/img/cat_banner_001.jpg"
import "../../assets/styles/shop/banner.scss"


const Banner = ({isDog}) => {
    return (<>
        <img className={"banner-img"} src={isDog?dogBanner001:catBanner001} alt=""/>
    </>)

}
export default Banner