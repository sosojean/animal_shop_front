import { Link } from "react-router-dom";

const CalculatorSelector = () => {

    return (
        <div>
            <h1>건강계산기</h1>
            <Link to="/calculator/age">
                <div>나이 계산기</div>
            </Link>
        </div>
    )
}

export default CalculatorSelector;