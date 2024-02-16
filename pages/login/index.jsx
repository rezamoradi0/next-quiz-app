import Button from "@/components/modules/form/Button";
import TextInput from "@/components/modules/form/TextInput";
import { API_ADDRESS } from "@/constants/adresses";
import { verifyToken } from "@/utils/auth";
import { useRouter } from "next/router";
import { useReducer, useState } from "react";

const initialState = {
  loading: false,
  email: "",
  password: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "lading":
      return { ...state, loading: !state.loading };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };

    default:
      return state;
  }
}
function index() {
  const router=useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  async function submitHandler(e) {
    e.preventDefault();
    dispatch({type:"loading"});
    const response = await fetch(`${API_ADDRESS}/auth/login`, {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify( {
        email: state.email,
        password: state.password,
      }),
    });
    dispatch({type:"loading"});
    if(response.status===200){
      router.replace("/dashboard");
    }

  
  }

  return (
    <form
      onSubmit={(e) => {
        submitHandler(e);
      }}
      className="flex h-screen w-full flex-col items-center justify-center gap-y-4 p-8"
    >
      <h1>Login Page</h1>
      <TextInput
        required={true}
        type="email"
        minLength={5}
        placeholder="Email"
        value={state.email}
        onChange={(value) => {
          dispatch({ type: "email", payload: value });
        }}
      />

      <TextInput
        required={true}
        type="password"
        minLength={8}
        placeholder="Password"
        value={state.password}
        onChange={(value) => {
          dispatch({ type: "password", payload: value });
        }}
      />
      <Button type="submit" text={state.loading ? "loading" : "login"} />
    </form>
  );
}

export default index;

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  if (verifyToken(token)) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }

  return {
    props: {},
  };
}
