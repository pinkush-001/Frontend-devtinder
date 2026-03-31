import axios from "axios";
import {Base_url} from "../utils/constants";
import {useDispatch} from "react-redux";
import {removeUserFromFeed} from "../utils/feedSlice";


const UserCard = ({user}) => {
  
    const {_id,firstName,lastName,photoUrl,about,age,gender}= user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status,userId)=>{
      try{

        const res = await axios.post(
          Base_url + "/request/send/" + status + "/" + userId,{},
          {withCredentials:true}
        );
        dispatch(removeUserFromFeed(userId))
      }
      catch(err){
        console.log("Error " + err);
      }
    }

     
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img src={user.photoUrl || "https://files.reva.ac.in/uploads/faculty_images/6555dd1f7308b1700125983.jpg"}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+ " "+ lastName}</h2>
    {age && gender && <p>{age+ ", "+ gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-secondary" 
      onClick= {()=>handleSendRequest("ignore", _id)}>Ignore</button>
      <button className="btn btn-primary" 
      onClick= {()=>handleSendRequest("interested", _id)}>Interested</button>
    </div>
  </div>
</div>
  )
    

    };
    
   


export default UserCard