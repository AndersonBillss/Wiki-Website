import User from "../models/user";
import { httpResponse } from "../../models";
import { generateToken } from "../../middleware/jwt";
import { ObjectId } from 'mongodb';


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
        const id: ObjectId = userId?._id as ObjectId

        let idString: string | undefined = undefined
        if(id){
            idString = id.toHexString()
        }

        if(idString && typeof(idString) === "string"){

            const token = generateToken(idString, userName)
            return{
                status: 200,
                data: {
                    success: true,
                    msg: 'Succesfully logged in',
                    token: token
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
