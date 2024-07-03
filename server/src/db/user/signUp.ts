import User from "../models/user";
import { httpResponse } from "../../models";

export default async function signUp(userName: any): Promise<httpResponse>{
    try{
        const userNameFound = await User.find({userName: userName})
        if(userNameFound[0] !== undefined){
            return{
                status: 200,
                data: {
                    success: false,
                    msg: 'Username already exists',
                }
            }
        } else if(`${userName}`.toLowerCase().trim()){
            userName = `${userName}`.trim()
            await User.insertMany({userName: userName})
            return{
                status: 200,
                data: {
                    success: true,
                    msg: 'Succesfully signed up',
                }
            }
        } else {
            return{
                status: 200,
                data: {
                    success: false,
                    msg: 'No userName sent',
                }
            }
        }



    } catch(err){
        console.error(err)
        return{
            status: 500,
            data: {
                success: false,
                msg: 'Internal server error',
            }
        }
    }
}
