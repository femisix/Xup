import './post.css';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function Post({ profile }) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; //PF here means public folder for the attache files
  const [file, setFile] = useState(null);
  const desc = useRef();

  const submithandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      //if there is a file, it will create new form data, update our file and name etc.
      const filename = file.name;
      console.log('generated filename:', filename);
      const data = new FormData();
      data.append('file', file);
      data.append('name', filename);
      newPost.img = filename; //indicating file path which is file name

      try {
        await axios.post('/upload', data);
      } catch (err) {
        console.error('error uploading file:', err);
      }
    }

    try {
      await axios.post('/post', newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  //im going to create 2 components here to show one for Homepage and the profile page

  const Homepost = () => {
    return (
      <>
        <div className="posttop">
          <img
            src={
              user.profilepicture ? PF + user.profilepicture : PF + 'user.png'
            }
            alt=""
          />

          <input
            type="text"
            placeholder={"What's on your mind, " + user.userName + '?'}
            className="postinput"
            ref={desc}
          />
        </div>

        <hr className="posthr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareimg" src={URL.createObjectURL(file)} alt="" />
            {/* what the URL.createObjectURL(file) does is that it creates a pseudo url to see our image before upload */}
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="postbuttom" onSubmit={submithandler}>
          <div className="postoptions">
            <label htmlFor="file" className="postoption">
              <PermMediaIcon htmlColor="tomato" className="posticon" />
              <span>Photo/Video</span>
              <input
                style={{ display: 'none' }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <div className="postoption">
              <LabelIcon htmlColor="blue" className="posticon" />
              <span>Label</span>
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
          <button className="postbutton" type="submit">
            Share
          </button>
        </form>

        {/* <Share style={{display: show ? 'block' : 'none'}}/> */}
      </>
    );
  };

  const Profilepost = () => {
    return (
      <>
        <div className="postcontainer">
          <div className="posttop">
            <img
              src={
                user.profilepicture ? PF + user.profilepicture : PF + 'user.png'
              }
              alt=""
            />

            <input
              type="text"
              placeholder={"What's on your mind, " + user.userName + '?'}
              className="postinput"
              ref={desc}
            />
          </div>

          <hr className="posthr" />
          {file && (
            <div className="shareImgContainer">
              <img
                className="shareimg"
                src={URL.createObjectURL(file)}
                alt=""
              />
              {/* what the URL.createObjectURL(file) does is that it creates a pseudo url to see our image before upload */}
              <CancelIcon
                className="shareCancelImg"
                onClick={() => setFile(null)}
              />
            </div>
          )}
          <form className="postbuttom" onSubmit={submithandler}>
            <div className="postoptions">
              <label htmlFor="file" className="postoption">
                <PermMediaIcon htmlColor="tomato" className="posticon" />
                <span>Photo/Video</span>
                <input
                  style={{ display: 'none' }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <div className="postoption">
                <LocationOnIcon htmlColor="green" className="posticon" />
                <span>Location</span>
              </div>
              <div className="postoption">
                <EmojiEmotionsIcon htmlColor="goldenrod" className="posticon" />
                <span>Feelings</span>
              </div>
            </div>
            <button className="postbutton" type="submit">
              Share
            </button>
          </form>

          {/* <Share style={{display: show ? 'block' : 'none'}}/> */}
        </div>
      </>
    );
  };
  return (
    <div className="post">
      <div className="postwrapper">
        {profile ? <Profilepost /> : <Homepost />}
      </div>
    </div>
  ); //You can add any of the components created above to display
}

export default Post;
