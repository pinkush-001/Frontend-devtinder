import {useState} from "react";
import UserCard from "./userCard";
import axios from "axios";
import {Base_url} from "../utils/constants";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice";


const EditProfile = ({user}) => {
 const [firstName,setFirstName] = useState(user.firstName);
 const [lastName,setLastNAme] = useState(user.lastName);
 const [age ,setAge] = useState(user.age || "");
 const [gender ,setGender] = useState(user.gender || "");
 const [about ,setAbout] = useState(user.about || "");
 const [photoUrl ,setPhotoUrl] = useState(user.photoUrl);
 const [error,setError] = useState("");
 const dispatch = useDispatch();
 const [showToast,setShowToast] = useState(false);

 const saveProfile = async()=>{
  setError("")
  try{

    const res = await axios.patch(Base_url+ "/profile/edit",{firstName,lastName,photoUrl,age,gender,about},
      {withCredentials:true}
    );

    dispatch(addUser(res?.data?.data));
    setShowToast(true);
    const i = setTimeout(()=>{
      setShowToast(false);
    },3000);
  }catch(err){
    setError(err.response.data);
  }
 };
     
  return (
    <div className= "flex justify-center my-10 mt-2">
     <div className="flex justify-center mx-10 ">
    <div className="card bg-black w-96 shadow-sm my-2">
      <div className="card-body">
        <h2 className="card-title">Edit Profile</h2>
      <div> 
        <fieldset className="fieldset">
        <legend className="fieldset-legend">First Name</legend>
        <input type="text" value={firstName} className="input" placeholder=""
        onChange={(e)=> setFirstName(e.target.value)}
        />   
       </fieldset>
       <fieldset className="fieldset">
        <legend className="fieldset-legend">Last Name</legend>
        <input type="text" value={lastName} className="input" placeholder=""
        onChange={(e)=> setLastName(e.target.value)}
        />   
       </fieldset>

       <fieldset className="fieldset">
        <legend className="fieldset-legend">Age</legend>
        <input type="text" value={age} className="input" placeholder=""
        onChange={(e)=> setAge(e.target.value)}
        />   
       </fieldset>

       <fieldset className="fieldset">
        <legend className="fieldset-legend">Gender</legend>
        <input type="text" value={gender} className="input" placeholder=""
        onChange={(e)=> setGender(e.target.value)}
        />   
       </fieldset>

       <fieldset className="fieldset">
        <legend className="fieldset-legend">About</legend>
        <input type="text" value={about} className="input" placeholder=""
        onChange={(e)=> setAbout(e.target.value)}
        />   
       </fieldset>

        <fieldset className="fieldset">
        <legend className="fieldset-legend">Photo Url</legend>
        <input type="text" value={photoUrl} className="input" placeholder=""
        onChange={(e)=> setPhotoUrl(e.target.value)}
        />   
       </fieldset>
      
      </div>
      <p className="text-red-500">{error}</p>
      <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick= {saveProfile}>
        Save Profile</button>
     </div>
    </div>
  </div>
</div>
< UserCard user={{firstName,lastName,photoUrl,age,gender,about}} />

{showToast && <div className="toast toast-top toast-center">
    <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>}
</div>

  )
}

export default EditProfile