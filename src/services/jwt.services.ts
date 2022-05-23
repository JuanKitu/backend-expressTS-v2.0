import jwt, { Secret } from 'jsonwebtoken'
import { TokenDecoded, User, UserToken } from './jwt';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.CLIENT_ID);

export function createToken(user: User) {
    if (process.env.SEED) {
        const secretKey: Secret = process.env.SEED
        return jwt.sign({
            user: user
        }, secretKey, { expiresIn: process.env.EXPIRATION_TOKEN });
    }
};

export async function verifyGoogle(token:string){
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    if(payload){
        const userid = payload['sub'];
        const user:UserToken={
            userName:payload.name,
            email:payload.email,
            img:payload.picture,
            google:true
        };
        return user
    }
};
export function verifyToken(token:string, secretKey:string):TokenDecoded {
    try{
        const decoded = jwt.verify(token, secretKey);
        return {
            decoded,
            error:false
        }
    }catch(err){
        return {
            decoded:null,
            error:true
        }
    }
}

    