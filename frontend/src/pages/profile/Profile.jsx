import './Profile.css';
import Topbar from '../../components/topbar/Topbar';
import Profilehead from '../../components/profile/Profilehead';
import Intro from '../../components/profile/intro';
import Feed from '../../components/postfeed/postfeed';
import Post from '../../components/post/post';
import Feeddata from '../../components/feeddata/Feeddata';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MoreVert from '@mui/icons-material/MoreVert';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; //PF here means public folder for the attache files
  const { user: currentUser } = useContext(AuthContext);

  const [user, setuser] = useState({});
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?.id));
  }, [currentUser, user.id]);

  const username = useParams().username; //useparams is imported so that whenever we click a profile, it shows the username automatically

  useEffect(() => {
    const fetchuser = async () => {
      const res = await axios.get(`/user?userName=${username}`); //the username here is from the database we created, and it automatically selects the name on the url
      setuser(res.data);
    };

    fetchuser();
  }, [username]); //username is a variable that needs to be passed as a dependency

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put('/user/' + user._id + '/follow', {
          userId: currentUser._id,
        });
      } else {
        await axios.put('/user/' + user._id + '/unfollow', {
          userId: currentUser._id,
        });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  return (
    <>
      <Topbar />

      <Profilehead user={username} User={currentUser} />

      <div className="body">
        {username !== currentUser.userName && (
          <button className="followbutton" onClick={handleClick}>
            {followed ? 'unfollow' : 'Follow'}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <Intro data={user} renderType="type1" />

        <div className="divbody">
          {username === user.userName && <Post profile />}{' '}
          {/*this code hides the post section when im in another account */}
          <Feeddata username={username} className="profilepost" />
        </div>
      </div>
    </>
  );
}

export default Profile;
