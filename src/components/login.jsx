import {useState} from 'react';
import axios from 'axios';
import {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice";
import {useNavigate} from "react-router-dom";
import {Base_url} from "../utils/constants";
const Login = () => {
 const [emailId,setEmailId] = useState("");
 const [password,setPassword] = useState("");
 const [firstName,setFirstName] = useState("");
 const [lastName,setLastName] = useState("");
 const [isLoginForm,setIsLoginForm]= useState(true);
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const [error,setError] = useState("")

 const handleLogin = async ()=>{
   try{ const res = await axios.post(Base_url+ "/login",{
      emailId,
      password,
    },
    {withCredentials:true}
  );

   dispatch(addUser(res.data));
  return navigate("/");
  }catch(err){
    setError(err?.response?.data || "something went wrong" );
      console.error();
    }
    
 };
  const handleSignUp = async ()=>{
   try{ const res = await axios.post(Base_url+ "/signup",{
      firstName,
      lastName,
      emailId,
      password,
    },
    {withCredentials:true}
  );
   dispatch(addUser(res.data.data));
   return navigate("/profile");
   

}catch(err){
  
   setError(err?.response?.data || "something went wrong" );
  
}
  }

  return (
   <div className="flex justify-center my-10">
    <div className="card bg-black w-96 shadow-sm my-2">
      <div className="card-body">
        <h2 className="card-title">{isLoginForm ? "Login" : "Sign up"}</h2>
      <div> 
        {!isLoginForm && <><fieldset className="fieldset">
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
        </> 
        }
        <fieldset className="fieldset">
        <legend className="fieldset-legend">Email ID</legend>
        <input type="text" value={emailId} className="input" placeholder=""
        onChange={(e)=> setEmailId(e.target.value)}
        />
       
       </fieldset>
      </div>
      <div> 
        <fieldset className="fieldset">
        <legend className="fieldset-legend">Password</legend>
        <input type="password" value={password} className="input" placeholder=""
        onChange={(e)=> setPassword(e.target.value)}
        />
       
       </fieldset>
      </div>
      <p className="text-red-500">{error}</p>
      <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick={isLoginForm? handleLogin: handleSignUp} >{isLoginForm ? "Login":"Sign up"}</button>
     </div>
     <p className= "m-auto" onClick={()=> setIsLoginForm((value)=> !value)}>
        {
          isLoginForm ? "New user? Signup Here "
          :"Existing user? Login Here"
        }
    </p>
    </div>
  </div>
</div>
  )
}

export default Login;