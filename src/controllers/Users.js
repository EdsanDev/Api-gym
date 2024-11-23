import Model from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req,res)=>{
    const {name,username,email,password} = req.body;
    try {
        const userFound = await Model.findOne({email})
        if(userFound){
            return res.status(400).json(['the email is alredy in use'])
        }
        const hash = await bcrypt.hash(password,10);
        const createUser = new Model({name,username,email,password:hash})
        const userSaved = await createUser.save();
        const token = await createAccessToken({id:userSaved._id});
        res.cookie("token",token);
        res.json({
            id:userSaved._id,
            name:userSaved.name,
            username:userSaved.username,
            email:userSaved.email,
            createAt:userSaved.createdAt,
            updateAt:userSaved.updatedAt,
        });
 
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

export const login = async (req,res) => {
    const user = await Model.findOne({email:req.body.email});
    try {
        if(!user){
            return res.status(400).json(['Usuario no Existe']);
        }
        const validPassword = await bcrypt.compare(
            req.body.password,user.password
        );
        if(!validPassword){
            return res.status(400).json(['Password no es valida'])
        }
        const passValida = await bcrypt.compare(req.body.password,user.password)
        if (!passValida) {
            return res.status(400).json({ error: "password incorrecta" });
        }
        const token = await createAccessToken({id:user._id});
        res.cookie("token",token);
        res.json({
            id:user._id,
            username:user.username,
            name:user.name,
            email:user.email,
            createAt:user.createdAt,
            updateAt:user.updatedAt
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const logout = async(req,res)=>{
    res.cookie("token","",{expires:new Date(0)});
    return res.sendStatus(200);
}
export const verifyToken = async(req,res)=>{
    const {token} = req.cookies
    if(!token){
        return res.status(401).json(['Unauthorized']);
    }
    jwt.verify(token,TOKEN_SECRET,async(err,user)=>{
        if(err){
            return res.status(401).json(['Unauthorized'])
        }
        const userFound = await Model.findById(user.id)
        if(!userFound){
            return res.status(401).json(['Unauthorized'])
        }
        return res.json({
            id:userFound._id,
            name:userFound.name,
            username:userFound.username,
            email:userFound.email
        })
    })
}
export const perfile = async(req,res)=>{
    const list = await Model.find(req.params._id);
    res.json(list)
}