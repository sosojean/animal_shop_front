import "../../assets/styles/common/card.scss"

const Card = ({children, className, onClick}) => {
    return (
        <div onClick={onClick} className={`${className} card`}>
            {children}
        </div>
    );
};

export default Card;