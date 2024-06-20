import AssetContent from '../models/assetContents';
import ConceptContent from '../models/conceptContents';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export default async function getImages(pageName: string) {
    try{
        let images: any
        if(pageName === "assets"){
            images = await AssetContent.find({}).select('_id lowResSrc title tags')
        } else if(pageName === "concept"){
            images = await ConceptContent.find({}).select('_id lowResSrc title tags')
        } else {
            return{
                status: 400,
                data: {
                    msg: 'That pageName does not exist'
                }
            }
        }

        return{
            status: 200,
            data: {
                msg: 'getImages Works!',
                images: images
            }
        }

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