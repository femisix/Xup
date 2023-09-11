import Topbar from '../../components/topbar/Topbar';
import './FriendProfile.css';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MoreVert from '@mui/icons-material/MoreVert';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Intro from '../../components/profile/intro';
import Feeddata from '../../components/feeddata/Feeddata';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function FriendProfile() {
  const followername = useParams().followername;
  const [followings, setFollowings] = useState([]);
  const [friendData, setFriendData] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER; //PF here means public folder for the attache files

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `/user/followers/${followername}/friends`
        );
        setFollowings(response.data);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, [followername]);

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const response = await axios.get(`/user/friend/${followername}`);
        setFriendData(response.data); // Assuming response.data contains the friend's data
      } catch (error) {
        console.error('Error fetching friend data:', error);
      }
    };

    fetchFriendData();
  }, [followername]);

  useEffect(() => {
    // Check if friendData has been populated
    if (friendData._id) {
      // Check if the user is following the friend based on localStorage
      const storedFollowingStatus = localStorage.getItem(
        'isFollowing_' + friendData._id
      );

      if (storedFollowingStatus === 'true') {
        setIsFollowing(true);
      } else if (storedFollowingStatus === 'false') {
        setIsFollowing(false);
      } else {
        // Check if the user is following the friend
        const checkFollowingStatus = async () => {
          try {
            const response = await axios.get('/check-follow/' + followername);
            setIsFollowing(response.data.isFollowing);
          } catch (error) {
            console.error('Error checking following status:', error);
          }
        };

        checkFollowingStatus();
      }
    }
  }, [friendData, followername]);

  const handleFollowClick = async () => {
    try {
      await axios.put('/user/' + friendData._id + '/follow', {
        userId: user._id,
      });
      setIsFollowing(true);
      localStorage.setItem('isFollowing_' + friendData._id, true);
    } catch (error) {
      console.error('Error following friend:', error);
    }
  };

  const handleUnfollowClick = async () => {
    try {
      await axios.put('/user/' + friendData._id + '/unfollow', {
        userId: user._id,
      });
      setIsFollowing(false);
      localStorage.removeItem('isFollowing_' + friendData._id);
    } catch (error) {
      console.error('Error unfollowing friend:', error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profilehead">
        <div className="profileheader">
          <img
            src={
              friendData.coverpicture
                ? PF + friendData.coverpicture
                : PF + 'joe-woods-4Zaq5xY5M_c-unsplash.jpg'
            }
            alt=""
            className="coverpic"
          />
          <div className="postheadmain">
            <div className="profilepic">
              <img
                src={
                  friendData.profilepicture
                    ? PF + friendData.profilepicture
                    : PF + 'user.png'
                }
                alt=""
              />
              <PhotoCameraIcon className="cameraicon" />
            </div>
            <div className="profiledetails">
              <div className="username">
                <h3 className="theusername">{friendData.userName}</h3>
                <div className="friendsdetails">
                  <span className="friendscounter">200 friends</span>
                  <div className="friends">
                    {followings.map((following, index) => (
                      <Link to={'/followers/' + following._id}>
                        <div className="friendspics">
                          <img
                            src={
                              following.profilepicture
                                ? PF + following.profilepicture
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
                {isFollowing ? (
                  <button className="editprofile" onClick={handleUnfollowClick}>
                    Unfollow
                    <RemoveIcon />
                  </button>
                ) : (
                  <button className="editprofile" onClick={handleFollowClick}>
                    Follow
                    <AddIcon className="editicon" />
                  </button>
                )}
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
      <div className="body">
        <Intro data={friendData} renderType="type2" />
        <Feeddata Data={friendData} />
      </div>
    </>
  );
}

export default FriendProfile;
