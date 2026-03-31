import {useSelector , useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import{Base_url} from "../utils/constants";
import axios from "axios";
import {removeUser} from "../utils/userSlice"

const Navbar = () => {
  const user = useSelector(store => store.user);
     const dispatch = useDispatch();
     const Navigate = useNavigate();

  const handleLogout = async()=>{
    try{

     await axios.post(Base_url+ "/logout",{},{withCredentials:true});
     dispatch(removeUser());
     return Navigate("/login")

    }catch(err){

    }
  }

  return (
   <div className="navbar bg-neutral shadow-ms ">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">Devtinder</Link>
  </div>
  {user &&(
  <div className="flex gap-2  items-center">
    <div className = "form-control ">Welcome,{user.firstName}</div>
        <div className="dropdown dropdown-end mx-5 flex ">
          
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
    <div className="w-10 rounded-full">
        <img
          alt="user photo"
          src={user.photoUrl} />
      </div>
    
      </div>
      
       <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><a onClick= {handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
  )}
</div>
  )
};

export default Navbar