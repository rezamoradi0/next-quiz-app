import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  userName: {
    type: "string",
    min: 5,
    max: 12,
  },
  password: {
    type: "string",
    min: 8,
    max: 30,
  },
  email: {
    type: "string",
    min: 5,
    max: 30,
  },
  firstName: {
    type: "string",
    min: 2,
    max: 20,
  },
  lastName: {
    type: "string",
    min: 3,
    max: 20,
  },
  role:{
    type:"string",
  }
};
export const check = v.compile(schema);
