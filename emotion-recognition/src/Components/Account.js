import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useStore } from "../store/store";
import {MdOutlineLiveTv,MdUploadFile} from "react-icons/md";

function Account() {
  const [state, dispatch] = useStore();
  return (
    <div className='bg-gra-02'>
    <h2 style={{fontFamily:"sans-serif",fontSize:"32px",color:"#ffffff",padding:"15px"}}>Welcome, {state?.user?.name}</h2>
    <div className="d-flex justify-content-center align-items-center" style={{ height: '85vh' }}>
      <div className="d-flex align-items-center justify-content-around w-50">
        <div className='d-flex flex-column align-items-center imageDiv'>
          <MdOutlineLiveTv/>
          <Link variant="primary" to="/liveCapture"><Button variant="primary">Live Capture</Button></Link>
        </div>
        <div className='d-flex flex-column align-items-center imageDiv'>
          <MdUploadFile/>
          <Link variant="secondary" to="/browse"><Button variant="secondary">Browse</Button></Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Account