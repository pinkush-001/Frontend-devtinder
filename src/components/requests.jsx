import axios from "axios";
import {Base_url} from "../utils/constants"
import {addRequests, removeRequest} from "../utils/requestSlice";
import {useDispatch,useSelector} from "react-redux";

import { useEffect} from "react";


const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.requests)

    const reviewRequest = async(status, _id)=>{
      try{

        const res = axios.post(
          Base_url+ "/request/review/"+ status + "/" + _id,
          {},
          {withCredentials:true}
        );
        dispatch(removeRequest(_id))
      }catch(err){
        console.log("Error ",err);
      }
    }

    const fetchRequests = async() =>{
     try{
            const res = await axios.get(Base_url+"/user/requests/receiver",{
            withCredentials:true,
        });
    
    dispatch(addRequests(res.data.data));
     
    } catch(err){

        console.log("Error " , err);
    }

}

    useEffect(()=>{
       fetchRequests();
    }, []);


    if(!requests) return;

    if(requests.length === 0) 
      return <h1 className="flex justify-center my-10">No request found</h1>;

  return(
  <div className= "text-center my-10">

    <h1 className= "text-bold text-white text-3xl mb-6">
        connections Requests 
        </h1>

    {requests.map((request)=>{
      const{_id,firstName,lastName, photoUrl,age, gender,about} = 
      request.fromUserId;

      return(
        <div key={_id} className = "flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 max-w-2/3 m-auto">
          <div className="w-20 h-20 rounded-full overflow-hidden flex-none">
            <img
            alt="photo"
            className="w-full h-full rounded-full"
            src={photoUrl || "https://files.reva.ac.in/uploads/faculty_images/6555dd1f7308b1700125983.jpg" }
            />
          </div>

          <div className="text-left mx-4 w-[200px]">
            <h2 className="font-bold text-xl">
              {firstName + " "+ lastName}

            </h2>
           { age && gender && <p>{age + ","+ gender}</p>}
            <p className= "break-words">
              {about}
              </p>
          </div>
          <div>
            <button className="btn btn-secondary mx-2" 
            onClick={()=>reviewRequest("rejected",request._id)}>Rejected</button>
            <button className="btn btn-accent mx-2"
             onClick={()=>reviewRequest("accepted",request._id)}>Accepted</button>
          </div>

        </div>
      )
    })}
  </div>
  )
}

export default Requests;