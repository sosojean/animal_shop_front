import WikiList from "../../components/additional/wiki/WikiList";
import "../../assets/styles/additional/wiki.scss"

const Wiki = () => {

    return (
        <div className="wiki-container">
            <h1 className="wiki-header">반려동물 백과</h1>
            <WikiList/>
        </div>
    )
}

export default Wiki;