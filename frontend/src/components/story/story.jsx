import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import "./story.css"
import CardCarousel from './cardCarousel';
function story() {


  return (
    <div className='storycontainer'>
        <div className="storywrapper">
          <div className="storyhead">
              <AutoStoriesIcon className='storyicon'/>
              <span>Stories</span>
          </div>

          <CardCarousel />
        </div> 

    </div>
  )
}

export default story