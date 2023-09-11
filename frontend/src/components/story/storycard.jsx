import React from "react";
import "./storycard.css"
import { Users } from "../../dummyData"
import {useNavigate} from "react-router-dom"


function Storycard({thestory}) {
  const navigate = useNavigate();

  function redirecttostory(thestory){
    navigate(`/stories/${thestory.username}`);
  }



    return (
      <div className="storycard" onClick={() => redirecttostory(thestory)}>
        <img src={thestory.photo} alt="" className='storypost' />
        <img src={Users.filter((u) => u.id === thestory?.userId)[0].profilePicture} alt="" className='storyprofile'/>
        <span>{Users.filter((u) => u.id === thestory?.userId)[0].username}</span>
      </div>
    );
  
}

export default Storycard