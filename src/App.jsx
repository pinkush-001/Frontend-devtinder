import Body from "./components/body"
import Profile from "./components/profile"
import Login from "./components/login"
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Provider} from "react-redux";
import appStore from "./utils/appStore"
import Feed from "./components/feed";
import Connections from "./components/connections";
import Requests from "./components/requests";
function App() {
    return (
    <>
  <Provider store = {appStore}>

    <BrowserRouter basename="/"> 
      <Routes>
         <Route path="/" element={<Body/>} >
         <Route index element={<Feed/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/profile" element={<Profile/>} />
         <Route path="/connections" element={<Connections/>} />
         <Route path="/requests" element={<Requests/>} />
         </Route>
            
      </Routes>
    </BrowserRouter>
  
  </Provider>

  </> 
      
    
  )
}

export default App

