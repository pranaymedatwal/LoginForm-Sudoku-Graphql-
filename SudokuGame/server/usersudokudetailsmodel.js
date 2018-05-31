import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/nodede");
let Schema = mongoose.Schema;
let sudokuSchema=new Schema({
  email:String,
  gamewon:{type:Number,default:0},
  timer:{type:String,default:"0"}
},{collection:'UserSudokuDetails'});
let UserSudokuDetails=mongoose.model('UserSudokuDetails',sudokuSchema);


export default UserSudokuDetails;