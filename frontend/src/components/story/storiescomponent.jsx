import React, { Suspense } from "react";
import { Storydata } from "../../Storydata";
import "./storiescomponent.css"
import { useMatch, useNavigate} from "react-router-dom";
const StoriesLazy = React.lazy(() => import("react-insta-stories"));



function Storiescomponent() {
  
  const match = useMatch("/stories/:clientid");
  const navigate = useNavigate();
  
  const Storycategory = match.params.clientid;

  function renderStories(){

    // Storydata[Storycategory].map((storyitems) =>{console.log(storyitems)})
    

    const stories1 = Storydata[Storycategory].map((storyitem) =>{
      return {
        content: ({ action, isPaused }) => {
          return(
            <div className='backgroundimage' key={storyitem.storyid}>
              <img src={storyitem.photo}  alt="" style={{
                 width: "100%",
                 height: "100%",
                 objectfit: "cover"
              }} />
  
              <div className="captionimage">
                <span>{storyitem.desc}</span>
              </div>
            </div>
          );
        } 

      }
    
  
    }
    );
    return stories1

  }
  function gobacktohomepage() {
    navigate("/");                                  //to go back to home page after viewing the status
  }


 
  return (
    <div style={{
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Suspense>
        <StoriesLazy stories={renderStories()} onAllStoriesEnd={() => gobacktohomepage()} />
      </Suspense>
    </div>
  )
}

export default Storiescomponent