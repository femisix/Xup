import './Topbar.css';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Topbar() {
  const { user } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER; //PF here means public folder for the attache files

  return (
    <div className="topbarcontainer">
      <div className="topbarleft">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h5>XUPP</h5>
          </Link>
        </div>
      </div>

      <div className="topbarcenter">
        {/* <div className={`searchicon ${searchOpen? "active": "inactive"}`}>
          <input placeholder="search" className={`searchbar ${searchOpen? "active": "inactive"}`}/>
          < SearchIcon className={`search ${searchOpen? "active": "inactive"}`} onClick={() =>{setSearchOpen(!open)}}/>
          <CloseIcon className={`close ${searchOpen? "active": "inactive"}`} onClick={() =>{setClose(!close)}}/>
        </div> */}
        <div className="homeoptionstopbar">
          <h5>Explore</h5>
          <h5>Community Feed</h5>
          <h5>Mutual Friend</h5>
        </div>
      </div>
      <div className="topbarright">
        <div className="topbaricon">
          <MessageRoundedIcon className="messageicon" />
          <span className="topbaritembadge">1</span>
        </div>

        <div className="topbaricon">
          <NotificationsIcon className="notificationicon" />
          <span className="topbaritembadge">1</span>
        </div>

        <div className="profilesection">
          <div className="profilesub1">
            <h5>{user.userName}</h5>
            <Link to={`/profile/${user.userName}`}>
              <img
                src={
                  user.profilepicture
                    ? PF + user.profilepicture
                    : PF + 'user.png'
                }
                alt=""
                className="topbarimg"
              />
            </Link>
            <span className="profilebadge"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
