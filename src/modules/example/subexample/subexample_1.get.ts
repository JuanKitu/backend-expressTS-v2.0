import { Request, Response } from "express";
export default async function (req:Request, res:Response){
    return res.status(200).send({
        error:false,
        code:200,
        message:'HOLA SUB XD'
    });
};