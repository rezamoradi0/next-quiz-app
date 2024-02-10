import Validator from "fastest-validator";
const v= new Validator();
const schema ={
    name:{
        type:"string",
        min: 3,
    },
    description:{
        type:"string",
    }
}
export const check=v.compile(schema); 
