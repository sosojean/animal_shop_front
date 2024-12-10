import { Link, useNavigate, useParams } from "react-router-dom";
import AdoptItem from "./AdoptItem";


const AdoptList = (props) => {

    const {data, className} = props;
    const navigate = useNavigate();
    
    return (
        <>
        {data &&
            <div className={className}>
                {data.map((d) => {
                    return(
                            <AdoptItem data={d} /> 
                    )
                })}
            </div>            
        }        
        </>

    )
}

export default AdoptList;