import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import MoreVert from '@mui/icons-material/MoreVert';
import Post from '../post/post';
import './profilehead.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import mongoose from 'mongoose';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Profilehead({ user, User }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; //PF here means public folder for the attache files
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getfriends = async () => {
      try {
        const friendList = await axios.get('/user/friends/' + User._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getfriends();
  }, [User._id]);

  return (
    <div className="profilehead">
      <div className="profileheader">
        <img
          src={
            User.coverpicture
              ? PF + User.coverpicture
              : PF + 'joe-woods-4Zaq5xY5M_c-unsplash.jpg'
          }
          alt=""
          className="coverpic"
        />
        <div className="postheadmain">
          <div className="profilepic">
            <img
              src={
                User.profilepicture ? PF + User.profilepicture : PF + 'user.png'
              }
              alt=""
            />
            <PhotoCameraIcon className="cameraicon" />
          </div>
          <div className="profiledetails">
            <div className="username">
              <h3 className="theusername">{user}</h3>
              <div className="friendsdetails">
                <span className="friendscounter">200 friends</span>
                <div className="friends">
                  {friends.map((friend) => (
                    <Link to={'/followers/' + friend._id}>
                      <div className="friendspics">
                        <img
                          src={
                            friend.profilepicture
                              ? PF + friend.profilepicture
                              : PF + 'user.png'
                          }
                          alt=""
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="calltoactionbtn">
              <button className="editprofile">
                <EditIcon className="editicon" />
                Edit profile
              </button>
            </div>
          </div>
        </div>

        <div className="postheadmainbottom">
          <ul>
            <li>Posts</li>
            <li>About</li>
            <li>Friends</li>
            <li>Stories</li>
          </ul>

          <MoreVert className="moreoption" />
        </div>
      </div>
    </div>
  );
}

export default Profilehead;
