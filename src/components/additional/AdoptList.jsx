import { Link, useParams } from "react-router-dom";
import AdoptItem from "./AdoptItem";


const AdoptList = (props) => {

    const {data} = props;
    
    return (
        <div className="adopt-list-container">
            {data.map((d, i) => {
                return(
                    <Link to={`/adoption/detail/${d.id}`} key={d.id}>
                        <AdoptItem data={d}/> 
                    </Link>
                )
            })}
        </div>
    )
}

export default AdoptList;