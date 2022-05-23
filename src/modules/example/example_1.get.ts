import { Request, Response } from "express";
export default async function (req:Request, res:Response){
    const id = req.params.id;
    return res.status(200).send({
        error:false,
        code:200,
        param:id,
        message:'HOLA XD'
    });
};