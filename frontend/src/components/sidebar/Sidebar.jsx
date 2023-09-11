import "./sidebar.css"
import PeopleIcon from '@mui/icons-material/People';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FeedIcon from '@mui/icons-material/Feed';
import HistoryIcon from '@mui/icons-material/History';
import PagesIcon from '@mui/icons-material/Pages';
import EventIcon from '@mui/icons-material/Event';
import MessageIcon from '@mui/icons-material/Message';

function sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarwrapper">
        <ul className="sidebarlist">
          <li className="sidebarlistitem">
            <PeopleIcon className="sidebaricon"/>
            <span>Friends</span>
          </li>
          <li className="sidebarlistitem">
            <BookmarkIcon className="sidebaricon"/>
            <span>Saved</span>
          </li>
          <li className="sidebarlistitem">
            <FeedIcon className="sidebaricon"/>
            <span>Feeds</span>
          </li>
          <li className="sidebarlistitem">
            <HistoryIcon className="sidebaricon"/>
            <span>Friends</span>
          </li>
          <li className="sidebarlistitem">
            <PagesIcon className="sidebaricon"/>
            <span>Memories</span>
          </li>
          <li className="sidebarlistitem">
            <EventIcon className="sidebaricon"/>
            <span>Pages</span>
          </li>
          <li className="sidebarlistitem">
            <MessageIcon className="sidebaricon"/>
            <span>Events</span>
          </li>
        </ul>
        <hr className="hr"/>

        <div className="sidebarcommunitywrapper">
          <div className="communityhead">
            <h3>My community</h3>
            <span>29</span>
          </div>

          <ul className="sidebarcommunitylist">
            <li className="sidebarcommunity">
              <img src="/attache/headway-5QgIuuBxKwM-unsplash.jpg" alt="" />
              <div className="text">
                <p>FigmaDesigners</p>
                <span>734 subscribers</span>
              </div>
            </li>
            <li className="sidebarcommunity">
              <img src="/attache/nordwood-themes-yyMJNPgQ-X8-unsplash.jpg" alt="" />
              <div className="text">
                <p>Developer Growth</p>
                <span>156 subscribers</span>
              </div>
            </li>
            <li className="sidebarcommunity">
              <img src="/attache/ria sean.jpeg" alt="" />
              <div className="text">
                <p>Ria sean lovers</p>
                <span>2.4k subscribers</span>
              </div>
            </li>
            <li className="sidebarcommunity">
              <img src="/attache/starr.jpg" alt="" />
              <div className="text">
                <p>Sabi People</p>
                <span>34k subscribers</span>
              </div>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  )
}

export default sidebar