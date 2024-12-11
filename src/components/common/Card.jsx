import "../../assets/styles/common/card.scss"

const Card = ({children, className, onClick}) => {
    return (
        <div onClick={onClick} className={`${className?className:"default-card"} card`}>
            {children}
        </div>
    );
};

export default Card;