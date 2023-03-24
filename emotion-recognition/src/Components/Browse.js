import { useState } from "react";
import { Button } from "react-bootstrap";
import axiosInstance from "../axiosInstance";
import "./browse.css";

function Browse() {
  const [image, setImage] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [emotion, setEmotion] = useState("");

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handlePredictions = () => {
    const data = { data: { image } };
    axiosInstance
      .post("/predict", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPredictions(response.data.predictions);
        setEmotion(response.data.emotion);
      })
      .catch((error) => console.error(error));
  };

  console.log("predictions", predictions);
  return (
    // <div className="d-flex justify-content-center align-items-center mt-5">
    //   <input type="file" onChange={handleImageChange} />
    //   <button onClick={handlePredictions}>Predict Emotions</button>
    // </div>
    <div className="bg-gra-02" style={{ height: '100vh' }}>
    <div class="center">
          <div class="title">
            <h1>Upload File</h1>
          </div>

          {!image?<div class="dropzone">
            <img
              src="http://100dayscss.com/codepen/upload.svg"
              class="upload-icon"
            />
            <input type="file" class="upload-input" onChange={handleImageChange}/>
          </div>:<img src={image} height={150} width={200}/>}

          <button type="button" class="btn" name="uploadbutton" style={{width:"250px"}}>
            Upload file
          </button>
          <button  type="button" class="btn" onClick={handlePredictions} style={{width:"250px"}}>Predict Emotions</button>
    </div>
   {Object.keys(predictions).length > 0 && <div className="center">
    {Object.keys(predictions).length > 0 && (
  <div>
    <h3>Predictions:</h3>
    <ul>
      {Object.keys(predictions).map((key) => (
        <li key={key}>
          {key}: {predictions[key]}
        </li>
      ))}
    </ul>
    <h3>Emotion:</h3>
    <p>{emotion}</p>
    <br/>
    <Button onClick={()=>{
      setImage("");
      setEmotion("");
      setPredictions([]);
    }}>Back</Button>
  </div>
)}
    </div>}
    </div>
  );
}

export default Browse;
