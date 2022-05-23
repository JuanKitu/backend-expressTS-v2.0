import { Request, Response } from "express";
import { accountService } from "../../services/Account.service";
export default async function (req:Request, res:Response){
    const data = {
        email:"nekane@nekane.com"
    }
    await accountService.findAll().then(data=>{
        return res.status(200).send({
            error:false,
            code:200,
            data,
            message:'find de id 4'
        });
    }).catch(data=>{
        return res.status(200).send({
            error:false,
            code:200,
            data,
            message:'find de id 4'
        }); 
    })
    
};