import "./feed.css"
import Story from "../story/story"
import Post from "../post/post"
import Postfeed from "../postfeed/postfeed"
import { useEffect, useState } from "react"
import axios from "axios"
import Feeddata from "../feeddata/Feeddata"

function Feed() {
  return (
    <div className="feed">
       <Story /> 
      <div className="feedwrapper">
       <Post />
       <Feeddata />
      </div>
    </div>
  )
}

export default Feed