import User from "../models/user";
import { httpResponse } from "../../models";
import { generateToken } from "../../middleware/jwt";

export default async function logIn(userName: any): Promise<httpResponse>{
    try{
        if(userName === undefined){
            return{
                status: 200,
                data: {
                    success: false,
                    msg: 'No username sent',
                }
            } 
        }
        userName = `${userName}`.trim()

        const userId = await User.findOne({userName: userName}).select('_id')

        if(userId?._id){
            generateToken()
            return{
                status: 200,
                data: {
                    success: true,
                    msg: 'Succesfully logged in',
                }
            }
        } else {
            return{
                status: 200,
                data: {
                    success: false,
                    msg: 'Username not found',
                }
            }
        }
    } catch(err){
        return{
            status: 500,
            data: {
                success: false,
                msg: 'Internal server error',
            }
        }
    }
}
