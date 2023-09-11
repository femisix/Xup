// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import "./cardCarousel.css"
// import AddIcon from '@mui/icons-material/Add';
// import Storycard from "./storycard";
// import { Story } from "../../dummyData"

// function cardCarousel() {
//   const responsive = {
//     superLargeDesktop: {
//       // the naming can be any, depends on you.
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 3
//     }
//   };

//   return (
//     <Carousel
//       swipeable={true}
//       draggable={true}
//       responsive={responsive}
//       slidesToSlide={2}
//       infinite={false}
//       transitionDuration={500}
//       removeArrowOnDeviceType={["tablet", "mobile"]}
//       keyBoardControl={true}
//       className="storycards">

//       <div className="createstorycard">
//         <img src="/attache/brooke-cagle-oTweoxMKdkA-unsplash.jpg" alt="" />
//         <AddIcon className='addicon'/>
//         <span>Create story</span>
//       </div>

//       {Story.map(s => (
//         <Storycard key={s.id} thestory={s}/>
//       ))}

//     </Carousel>
//   );
// }

// export default cardCarousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './cardCarousel.css';
import AddIcon from '@mui/icons-material/Add';
import Storycard from './storycard';
import { Story } from '../../dummyData';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

function CardCarousel() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      responsive={responsive}
      slidesToSlide={2}
      infinite={false}
      transitionDuration={500}
      removeArrowOnDeviceType={['tablet', 'mobile']}
      keyBoardControl={true}
      className="storycards"
    >
      <div className="createstorycard">
        <img
          src={user.profilepicture ? PF + user.profilepicture : PF + 'user.png'}
          alt=""
        />
        <AddIcon className="addicon" />
        <span>Create story</span>
      </div>

      {Story.map((s) => (
        <Storycard key={s.id} thestory={s} />
      ))}
    </Carousel>
  );
}

export default CardCarousel;
