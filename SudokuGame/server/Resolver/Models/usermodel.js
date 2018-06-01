import mongoose from "mongoose";

let Schema = mongoose.Schema;
let UserSchema = new Schema({
  firstname:String,
  lastname:String,
  email:  String,
  password: String
    
},{collection:'user'});
let user = mongoose.model('user', UserSchema );


export default user;
