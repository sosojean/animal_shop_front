import WikiList from "../../components/additional/wiki/WikiList";
import "../../assets/styles/additional/wiki.scss"
import Title from "../../components/common/Title";

const Wiki = () => {

    return (
        <div className="wiki-container">
            <Title className="default wiki-header">📖 반려동물 백과</Title>
            <WikiList/>
        </div>
    )
}

export default Wiki;