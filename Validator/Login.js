import Validator from "fastest-validator";
const v=new Validator();
const schema={
    email:{
        type:"string"
    },
    password:{
        type:"string"
    }
}

export const check=v.compile(schema);