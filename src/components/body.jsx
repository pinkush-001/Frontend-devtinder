import Navbar from "./navbar";
import {Outlet, useNavigate} from "react-router-dom";
import Footer from "./footer";
import axios from "axios";
import {Base_url} from "../utils/constants";
import {useDispatch , useSelector} from "react-redux";
import {addUser} from "../utils/userSlice";
import {useEffect} from "react";



const Body = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userData = useSelector(store => store.user);

  const fetchUser = async ()=>{
    if (userData) return;
    try{
      const res= await axios.get(Base_url+ "/profile/view",{
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    }catch(err){
      if(err.status===401){
        Navigate("/login");
      }
      
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchUser();
  },[]);

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>

  )
}

export default Body