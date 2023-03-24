import { useState } from "react";
import { setAuth, setUser } from "../store/reducer/userActions";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import axiosInstance from "../axiosInstance";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const [state, dispatch] = useStore();
  const navigate = useNavigate();
  const loginHandler = async (e) => {
    e.preventDefault();
    console.log("first");
    if (!email || !password) {
      alert.error("Please enter Email/Mobile Number and Password");
      return;
    }
    const data = {
      email,
      password,
    };

    axiosInstance
      .post("login", data, {
        headers: {
          "Content-Type": "application/json",
          // name: "xyz",
        }
      })
      .then(async (response) => {
        console.log('response', response)
        if (
          response.data.access_token &&
          response.data.user
        ) {
          alert.success("Logged in Successfully");
          setEmail("");
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch(setUser(response.data.user));
          dispatch(setAuth(response.data.access_token, true));
          navigate("/account");
        }
      })
      .catch((error) => {
        alert.error("Entered Wrong Email or Password");
      });
  };

  return (
    <div class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
        <div class="wrapper wrapper--w680">
            <div class="card card-4">
                <div class="card-body">
                    <h2 class="title">SignIn Form</h2>
                    <div>
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
                            <button class="btn btn--radius-2 btn--blue" type="submit" style={{width:"200px"}} onClick={(e)=>loginHandler(e)}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SignIn;
