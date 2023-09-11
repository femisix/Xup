import './share.css';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

function Share() {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; //PF here means public folder for the attache files

  return (
    <div className="sharewrapper" style={{ display: show ? 'none' : 'none' }}>
      <div className="sharecontainer">
        <div className="sharetop">
          <h1>Create post</h1>
          <div className="closearea">
            <CloseIcon onClick={handleClick} className="close" />
          </div>
        </div>
        <div className="sharecenter">
          <div className="profiling">
            <img src={PF + 'brooke-cagle-oTweoxMKdkA-unsplash.jpg'} alt="" />
            <h5>Zaccheaus odetokun</h5>
          </div>
          <textarea
            name="posttext"
            className="posttext"
            placeholder="What's on your mind"
          ></textarea>
          <div className="sharingarea">
            <div className="sharetext"></div>

            <div className="postoptions">
              <div className="postoption">
                <PermMediaIcon htmlColor="tomato" className="posticon" />
                <span>Photo/Video</span>
              </div>
              <div className="postoption">
                <LocationOnIcon htmlColor="green" className="posticon" />
                <span>Location</span>
              </div>
              <div className="postoption">
                <EmojiEmotionsIcon htmlColor="goldenrod" className="posticon" />
                <span>Feelings</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sharebottom">
          <button className="sharebutton">Post</button>
        </div>
      </div>
    </div>
  );
}

export default Share;
