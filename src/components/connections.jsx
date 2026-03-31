import axios from "axios";
import {Base_url} from "../utils/constants";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addConnections} from "../utils/connectionSlice"

const Connections = () => {
    const connections = useSelector((store)=>store.connections)  
    const dispatch= useDispatch();
    const fetchConnection = async()=>{
        try{
          const res = await axios.get(Base_url+"/user/connections",{
            withCredentials:true,
          });
          dispatch(addConnections(res.data.data));

        }catch(err){
          console.log("Error",err);

        }
    };

    useEffect(()=>{

      fetchConnection();
    },[])
    if(!connections) return;

    if(connections.length === 0) 
      return <h1 className="flex justify-center my-10">No connection found</h1>;

  return(
  <div className= "text-center my-10">

    <h1 className= "text-bold text-white text-3xl mb-6">
      connections 
      </h1>

    {connections.map((connection)=>{
      const{_id,firstName,lastName, photoUrl,age, gender,about} = 
      connection;

      return(
        <div key={_id} className = "flex items-start m-4 p-4 rounded-lg bg-base-300 max-w-1/2 m-auto">
          <div className= "w-20 h-20 rounded-full overflow-hidden flex-none">
            <img
            alt="photo"
            className="w-20 h-20 rounded-full"
            src={photoUrl || "https://files.reva.ac.in/uploads/faculty_images/6555dd1f7308b1700125983.jpg" }
            />
          </div>

          <div className="text-left mx-4">
            <h2 className="font-bold text-xl">
              {firstName + " "+ lastName}

            </h2>
           { age && gender && <p>{age + ","+ gender}</p>}
            <p>{about}</p>


          </div>

        </div>
      )
    })}
  </div>
  )
  
}

export default Connections