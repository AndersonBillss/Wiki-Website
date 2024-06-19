import AssetContent from '../models/assetContents';
import ConceptContent from '../models/conceptContents';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export default async function getImages(pageName: string) {
    try{
        let images
        if(pageName === "assets"){
            images = await AssetContent.find({})
        } else if(pageName === "concept"){
            images = await ConceptContent.find({})
        } else {
            return{
                status: 400,
                data: {
                    msg: 'That pageName does not exist'
                }
            }
        }
        console.log(AssetContent)

    } catch(err){
        console.log(err)
        return{
            status: 500,
            data: {
                msg: 'internal server error'
            }
        }
    }

}