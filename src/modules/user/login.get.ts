import { Request, Response } from "express";
import Accounts from "../../models/Accounts.model";
import { accountService } from "../../services/Account.service";
export default async function (req:Request, res:Response){
    await accountService.create({
        hash:"dsdsd",
        salt:"323232",
        accountName:"pepito41",
        email:"pepito@gmail.com",
        emailGoogle:"pepito@gmail.com"
    }).then(data=>{
        return res.json({
            resp:data
        })
    }).catch(data=>{
        return res.json({
            resp:data
        })
    });   
};