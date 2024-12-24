import Card from "../../common/Card";
import DefaultButton from "../../common/DefaultButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parseJwt from "../../../utils/parseJwt";

const WikiItem = (props) => {

    const {data} = props;
    
    const [isAdmin, setIsAdmin] = useState(false);

    console.log("WikiItem data ", data);

    const token = localStorage.getItem("accessToken");

    const checkAdmin = () => {
        const role = parseJwt(token)?.role || "unlogined";
        if (role === "ADMIN")
            setIsAdmin(true);
        else setIsAdmin(false);
    }

    useEffect(() => {
        checkAdmin();
    }, [])

    return (
        <Card className="default-card wiki-item">
            <div className="wiki-item-title">
                <Card>
                    <h3 className="item-header">{data?.breedName}</h3>   
                </Card>        
            </div>
            <div className="wiki-item-section">
                <div className="wiki-item-header">
                    <Card>
                        <img src={data?.attachmentUrl} className="wiki-img"/>    
                    </Card>        
                </div>
                <div className="description-container">
                    <Card className="light-card description-header-card">
                        <h3 className="item-header">{data?.breedName}</h3>
                    </Card>
                    <Card className="light-card description-list">
                        <div className="description">
                            <span className="d-title"><b>개요 </b></span>
                            <span className="d-content">{data?.overview}</span>    
                        </div>
                        <div className="description">
                            <span className="d-title"><b>외모 </b></span>
                            <span className="d-content">{data?.appearance}</span>    
                        </div>
                        <div className="description">
                            <span className="d-title"><b>성격 </b></span>
                            <span className="d-content">{data?.temperament}</span>    
                        </div>
                    </Card>
                </div>                
            </div>                    
            {isAdmin &&
                        <div className="wiki-patch-button">
                            <Link to={`/admin/wiki/edit/${data?.id}`}>
                                <DefaultButton className="primary small">수정</DefaultButton>
                            </Link>
                        </div>
            }  
        </Card>
    )
}

export default WikiItem;