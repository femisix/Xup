import { Users } from "../../dummyData";
import Online from "../online/online";
import "./rightbar.css"
import MoreVert from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbarwrapper">
        <div className="sponsorcontainer">
          <h2>Sponsored</h2>
          <div className="sponsedetail">
            <img src="/attache/pmv-chamara-pnJrr6xm-W4-unsplash.jpg" alt="" className="sponsorimg" />
            <span className="spansorname">Sharon's beauty</span>
            <MoreVert className="moreoption"/>
          </div>
          <div className="sponsedetail">
            <img src="/attache/monika-kozub-Cdv4Oe6O_3w-unsplash.jpg" alt="" className="sponsorimg" />
            <span className="spansorname">Shutter's Palace</span>
            <MoreVert className="moreoption"/>
          </div>
        </div>

        <div className="friendscontainer">
          <div className="friendhead">
            <h2>Friends Online</h2>
            <div className="icons">
              <SearchIcon className="searchicon" />
              <MoreVert className="moreoption"/>
            </div>
          </div>
          <div className="friendslist">
           
            {Users.map(u =>(
              <Online key = {u.id}  user ={u} />
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Rightbar