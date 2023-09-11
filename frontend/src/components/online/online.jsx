import "./online.css"

function online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;             //PF here means public folder for the attache files

  return (
    <div className="friendlist">  
        <div className="profilepic">
            <img src={PF+user.profilePicture} alt="" className="sponsorimg" />
            <span className="profilebadge"></span>
        </div>
        <span className="friendname">{user.username}</span>
    </div>


  )
}

export default online