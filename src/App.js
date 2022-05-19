import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login/Login";
import Registration from "./component/Registration/Registration";
import RequireAuth from "./component/RequireAuth/RequireAuth";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <Home></Home>
            </RequireAuth>
          }
          ></Route>
          <Route path="/home" element={
            <RequireAuth>
              <Home></Home>
            </RequireAuth>
          }
          ></Route>
<Route path="/login" element={<Login></Login>}></Route>
<Route path="/registration" element={<Registration></Registration>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
