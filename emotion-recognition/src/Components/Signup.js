import { useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import axiosInstance from "../axiosInstance";
import validator from "validator";
import "./signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const [state, dispatch] = useStore();
  const navigate = useNavigate();
  const signUpHandler = async () => {
    switch (true) {
      case !validator.isEmail(email):
        alert.error(`Enter your email`);
        return;
        break;
      case !validator.isLength(password, { min: 8 }):
        alert.error(`Password should be minimum of 8 length`);
        return;
        break;
      case !validator.isLength(name, { min: 3 }):
        alert.error(`Name should be minimum of 3 length`);
        return;
        break;
    }
    const data = {
      name,
      email,
      password,
    };
    const response = await axiosInstance.post("signup", data, {
      withCredentials: true,
    }, {
      headers: {
        // name:'xyz'
      }});
    if (
      response.data.message
    ) {
      alert.success("User Registered Successfully!!!")
      navigate("/account");
    } else {
      alert.error(response.data.error);
    }
  };
    return (
      <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div class="wrapper wrapper--w680">
            <div class="card card-4">
                <div class="card-body">
                    <h2 class="title">Registration Form</h2>
                    <div>
                        <div class="row row-space">
                            <div class="col-12">
                                <div class="input-group">
                                    <label class="label">Name</label>
                                    <input class="input--style-4" type="text" name="first_name" value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div class="row row-space">
                            <div class="col-12">
                                <div class="input-group">
                                    <label class="label">Email</label>
                                    <input class="input--style-4" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div class="row row-space">
                            <div class="col-12">
                                <div class="input-group">
                                    <label class="label">Password</label>
                                    <input class="input--style-4" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div class="p-t-15">
                            <button class="btn btn--radius-2 btn--blue" type="submit" style={{width:"200px"}}  onClick={(e)=>signUpHandler(e)}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      )
}

export default Signup