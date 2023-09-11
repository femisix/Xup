import MoreVert from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import './postfeed.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

function Postfeed({ thepost }) {
  const [like, setLike] = useState(thepost.likes.length); //we put in our initial state of likes
  const [isliked, setisLiked] = useState(false); //we put false becauswe we didnt like any post
  const [showContent, setShowContent] = useState(false);
  const [user, setuser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; //PF here means public folder for the attache files
  const { user: currentUser } = useContext(AuthContext);

  //to decide you've already liked a post
  useEffect(() => {
    setisLiked(thepost.likes.includes(currentUser._id)); //if it includes our userId it is gonna be true, if not it is gonna be false
  }, [currentUser._id, thepost.likes]);

  const likeHandler = () => {
    try {
      axios.put('/post/' + thepost._id + '/like', { userId: currentUser._id });
    } catch (err) {}

    setLike(isliked ? like - 1 : like + 1); //to like
    setisLiked(!isliked); // to dislike
  };

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = await axios.get(`/user?userId=${thepost.userId}`); //the slash must be first to make a proper url
        setuser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchuser();
  }, [thepost.userId]); //when you use useeffect, you have to add the dependancy to to apply it everytime it changes

  const toggleContent = () => {
    setShowContent(!showContent); // Toggle the state value
  };

  return (
    <div className="postfeed">
      <div className="postfeedwrapper">
        <div className="postfeedtop">
          <div className="postfeedtopleft">
            <Link to={`profile/${user.userName}`}>
              <img
                className="postfeedprofileimg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'user.png'
                }
                alt=""
              />{' '}
              {/* if you encounter a problem with the picture, add the PF* */}
            </Link>
            <span className="postusername">{user.userName}</span>
            <span className="postdate">{format(thepost.createdAt)}</span>
          </div>
          <div className="postfeedtopright">
            <MoreVert onClick={toggleContent} />
            {showContent && (
              <div className="options">
                <ul>
                  <li>delete</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="postfeedcenter">
          <span className="postfeedtext">{thepost?.desc}</span>
          <img className="postfeedimg" src={PF + thepost.img} alt="" />
        </div>
        <div className="postbottom">
          <div className="postfeedbottomlike">
            <ThumbUpOffAltIcon className="postfeedlike" onClick={likeHandler} />
            <span className="postfeedliketext">liked it</span>
            <span className="postfeedlikecounter">{like}</span>
          </div>
          <div className="postfeedbottomcomment">
            <ChatBubbleOutlineIcon
              className="postfeedcommenticon"
              onClick={likeHandler}
            />
            <span className="postfeedcommenttext">Comments</span>
            <span className="postfeedcommentcounter">{thepost.comment}</span>
          </div>
          <div className="postfeedbottomshare">
            <IosShareIcon className="sharepostfeedicon" />
            <span className="sharepostfeedtext">Share</span>
            <span className="sharepostfeedcounter">12</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Postfeed;
