import { User } from "../Models/user.schema.js";

export const createUser=async({
    firstName, lastName, email, password
})=>{

    if (!firstName || !lastName || !email || !password){
        throw new Error("All fields required")
    }

    const user=User.create({
        fullName:{
            firstName,
            lastName
        },
        email, 
        password
    })

    return user
}