import AdminMenu from "../../../components/shop/admin/AdminMenu";
import {useParams} from "react-router-dom";
import SellerManagement from "../../../components/shop/admin/SellerManagement";

const Admin = (props) => {
    const {menu} = useParams();

    const menuSelector = (menu) => {
        switch (menu) {
            case "seller":
                return(<SellerManagement/>)
            case "product":
                return(<div>product</div>)
            default:
                return null
        }
    }

  return (
      <div>
          <AdminMenu/>
          {menuSelector(menu)}
      </div>
  )
}

export default Admin