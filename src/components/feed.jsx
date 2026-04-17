import axios from "axios";
import {Base_url} from "../utils/constants";
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard"

const Feed = () => {
  const feed = useSelector((store)=> store.feed);
  const dispatch= useDispatch();
  
    const getFeed = async()=>{
      if (feed) return;
      try{const res = await axios.get(Base_url+ "/feed", {withCredentials:true});
      console.log(res);
      console.log(res.data);
      dispatch(addFeed(res.data));
    }catch(err){
        console.log("Error ", err)
    }
    };
    useEffect(()=>{
      getFeed();
    }, []
  );
  if(!feed) return ;

  if(feed.length<=0) return <h1 className = "flex justify-center" my-10>no new users found</h1>
  
  return feed &&(
    <div className = "flex justify-center my-10">
      <UserCard user= {feed[0]}/>
    </div>
  )
};

export default Feed