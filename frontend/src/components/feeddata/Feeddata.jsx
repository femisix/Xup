import Postfeed from '../postfeed/postfeed';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './feeddata.css';

function Feeddata({ username, Data }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchposts = async () => {
      let res;

      if (username) {
        res = await axios.get('/post/profile/' + username);
      } else if (Data && Data.userName) {
        res = await axios.get(
          '/post/timeline/friend/' + Data._id + '/' + Data.userName
        );
      } else {
        res = await axios.get('/post/timeline/' + user._id);
      }
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      ); //the above chunck of code is to order the post based on newest to oldest
    };

    fetchposts();
  }, [username, user._id, Data]);

  return (
    <>
      {posts.map((p) => (
        <Postfeed key={p._id} thepost={p} />
      ))}
    </>
  );
}

export default Feeddata;
