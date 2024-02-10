import Button from "@/components/modules/form/Button";
import TextInput from "@/components/modules/form/TextInput";
import { API_ADDRESS } from "@/constants/adresses";
import { verifyToken } from "@/utils/auth";
import { useRouter } from "next/router";
import { useReducer } from "react";


function index() {
  const router=useRouter();
  const initialState={
    userName:"",
    password:"",
    email:"",
    firstName:"",
    lastName:""
  }
  function reducer(state,action) {
    switch (action.type) {
      case "userName":
        return {...state,userName:action.payload}
        case "password":
        return {...state,password:action.payload}
        case "email":
        return {...state,email:action.payload}
        case "firstName":
        return {...state,firstName:action.payload}
        case "lastName":
        return {...state,lastName:action.payload}
      case "reset":
        console.log("HERE");
        return initialState;
      default:
      return state;
    }
  }

  const [userInfo,dispatch]=useReducer(reducer,initialState);
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_ADDRESS}auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(userInfo)
    });
  
    if(res.status===201){
      router.replace("/dashboard")

    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center  bg-gradient-to-b from-slate-900 to-zinc-800">
      <form
        className="flex w-[500px] flex-col items-center gap-y-4 rounded-xl   p-12  bg-gradient-to-b from-zinc-900 to-slate-900"
        onSubmit={submitHandler}
      >
        <p className="text-3xl font-extrabold text-gray-100">Sign Up Form</p>
        <TextInput
          onChange={(value)=>{
            dispatch({type:"userName",payload:value})
          }}
          type="text"
          name="userName"
          required={true}
          minLength={5}
          maxLength={12}
          placeholder="userName"
          value={userInfo.userName}
        />
        <TextInput
          onChange={(value)=>{
            dispatch({type:"email",payload:value})
          }}
          type="email"
          name="userEmail"
          required={true}
          minLength={5}
          maxLength={30}
          placeholder="userEmail"
          value={userInfo.email}
        />
        <TextInput
         onChange={(value)=>{
          dispatch({type:"password",payload:value})
        }}
          type="password"
          name="userPassword"
          required={true}
          minLength={8}
          maxLength={30}
          placeholder="userPassword"
          value={userInfo.password}
        />
        <TextInput
              onChange={(value)=>{
                dispatch({type:"firstName",payload:value})
              }}
          type="text"
          name="userFirstName"
          required={true}
          minLength={2}
          maxLength={20}
          placeholder="userFirstName"
          value={userInfo.firstName}
        />
        <TextInput
              onChange={(value)=>{
                dispatch({type:"lastName",payload:value})
              }}
          type="text"
          name="userLastName"
          required={true}
          minLength={3}
          maxLength={20}
          placeholder="userLastName"
          value={userInfo.lastName}
        />
        <Button text="Sign Up" type="submit" />
      </form>
    </div>
  );
}

export default index;

export async function getServerSideProps(context) {
  const {token}=context.req.cookies;
  if(verifyToken(token)){
    return {
      redirect:{
        destination:"/dashboard"
      }
    }
  }
  
  return {
    props:{},
  }
}