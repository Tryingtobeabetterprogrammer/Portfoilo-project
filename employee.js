const mongoose=require('mongoose')

const schema =mongoose.Schema
const employeeschema=new schema({
    name:{
        type:String
    },
    designation:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    age:{
        type:Number
    },
    pdf:{
        type:String
    }
},
{
        timestamps:true
    })

const employee=mongoose.model('employ',employeeschema)
module.exports=employee