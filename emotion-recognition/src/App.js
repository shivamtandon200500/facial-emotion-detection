import "./App.css";
import LiveCapture from "./Components/LiveCapture";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import OnlyUnauthRoute from "./OnlyUnauthRoute";
import SignIn from "./Components/SignIn";
import Home from "./Components/Home";
import Navbar from "./Components/global/Navbar";
import Signup from "./Components/Signup";
import Account from "./Components/Account";
import Browse from "./Components/Browse";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route element={<OnlyUnauthRoute redirectTo="/account" />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<ProtectedRoute redirectTo="/signin" />}>
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path="/liveCapture" element={<LiveCapture />} />
        <Route path="/browse" element={<Browse />} />
        <Route element={<OnlyUnauthRoute redirectTo="/account" />}>
          <Route path="/login" element={<SignIn />} />
        </Route>
        <Route element={<OnlyUnauthRoute redirectTo="/account" />}>
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
