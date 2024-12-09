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
                        <Link to={`/adoption/detail/${d.id}`} key={d.id}>
                            <AdoptItem data={d} /> 
                        </Link>
                    )
                })}
            </div>            
        }        
        </>

    )
}

export default AdoptList;