import home1 from "../images/home1.jpg";
import {BsEmojiAngry,BsEmojiNeutral} from "react-icons/bs";
import {ImShocked,ImSad,ImHappy,ImAngry} from "react-icons/im";
import {TbMoodNervous} from "react-icons/tb";
import "./home.css";

function Home() {
  return (
    <div style={{backgroundImage: 
                `url(${home1})`,
               height:'92.3vh',
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',}}>
               <br/>
               <div className="d-flex justify-content-center align-items-center flex-column">
                <h1 style={{fontSize:"35px",fontWeight:"600"}}>Facial Emotion Detection Using TesnsorFlow</h1>
               </div>
               <div className="d-flex align-items-center w-100 justify-content-between outherDiv" style={{marginTop:"100px"}}>
                <span className="d-flex flex-column align-items-center">
                  <BsEmojiAngry/>
                  <br/>
                  <span>Angry</span>
                </span>
                <span className="d-flex flex-column align-items-center">
                  <BsEmojiNeutral/>
                  <br/>
                  <span>Neutral</span>
                </span>
                <span className="d-flex flex-column align-items-center">
                  <ImHappy/>
                  <br/>
                  <span>Happy</span>
                </span>
                <span className="d-flex flex-column align-items-center">
                  <ImAngry/>
                  <br/>
                  <span>Fear</span>
                </span>
                <span className="d-flex flex-column align-items-center">
                  <ImShocked/>
                  <br/>
                  <span>Surprised</span>
                </span>
                <span className="d-flex flex-column align-items-center">
                  <ImSad/>
                  <br/>
                  <span>Sad</span>
                </span>
                <span className="d-flex flex-column align-items-center">
                  <TbMoodNervous/>
                  <br/>
                  <span>Disgusted</span>
                </span>
               </div>
               <div className="d-flex flex-column" style={{alignItems: "end",bottom: "35px",position: "absolute",right: "10px"}}>
                <h2>Made By:- </h2>
                <h3>Shivam Tandon</h3>
                <h3>Kaushtubh Shukla</h3>
                <h3>Parth Gaurav Jain</h3>
                <h3>Yash Patil</h3>
               </div>
               </div>
  )
}

export default Home