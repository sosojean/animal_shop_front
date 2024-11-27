import "../../assets/styles/common/card.scss"

const Card = ({children, className}) => {
    return (
        <div className={`${className} card`}>
            {children}
        </div>
    );
};

export default Card;