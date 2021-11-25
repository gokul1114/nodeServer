import { createUser, getUsers } from "./helper.js";
import express, { response } from "express";
import * as yup from "yup"


const router =  express.Router();

const schema = yup.object({
    username : yup
    .string("enter valid username")
    .min(6),
    password : yup
    .string()
    .min(6)
    .max(12)
})
router
.route("/signUp")
.post(async(req,res) => {
try {
const {username,password} = req.body;
console.log(req.body)
if(await schema.isValid({username}).catch(e => console.log(e.username))) {
const user = await createUser(username,password);
res.send(user)
}
else {
throw({message : "password isn't strong enough"})
}
}
catch(e){
res.status(422).send(e)
}

})

router
.route("/")
.get(async(req,res) => {
    const query = req.query
    const users =  await getUsers(query)
    res.send(users)
})
export const userRouter = router;