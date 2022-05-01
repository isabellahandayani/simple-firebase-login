import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { auth } from "./service/FirebaseServices";

const App = () => {
  return (
    <Router>
      <Routes>
        {auth.currentUser && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        )}
        {!auth.currentUser && (
          <>
            <Route path="*" element={<Navigate replace to="/" />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
