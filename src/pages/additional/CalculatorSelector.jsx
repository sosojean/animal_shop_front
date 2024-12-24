import { Link } from "react-router-dom";
import '../../assets/styles/additional/calcSelector.scss'
import Card from "../../components/common/Card"
import Title from "../../components/common/Title"

const CalculatorSelector = () => {

    return (
        <div className="calc-selector">
            <Title>건강계산기</Title>
            <Card className="default-card selector-container">
                <Link to="/calculator/age">
                    <Card>나이 계산기</Card>
                </Link>
                <Link to="/calculator/calorie">
                    <Card>칼로리 계산기</Card>
                </Link>
                <Link to="/calculator/nutrient">
                    <Card>사료 영양성분 계산기</Card>
                </Link>                
            </Card>
        </div>
    )
}

export default CalculatorSelector;