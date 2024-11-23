import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({
    codigo:{
        type:String,
        unique:true,
        required: true,
    },
    name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        trim:true,
        unique:true
    },
    type_inscription:{
        type:String,
        required:true
    },
    date_final:{
        type:String,
        required:true
    },
    precio:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

export default mongoose.model('Cliente',ClienteSchema)