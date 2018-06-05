import user from "./Models/usermodel.js";
import UserSudokuDetails from "./Models/usersudokudetailsmodel.js";
const resolvers = {
  Query: {
    getUsers: (root, data) =>{
      return "Reached the getUsers resolver";
    }
  },
  Mutation: {
    signup: async (root, data) =>{
      console.log(data);
      const response=await user.findOne({email:data.email});
      console.log(response); 
      if((response===null)){
        if((data.email!=='')&&(data.password!=='')&&(data.lastname)&&(data.firstname))
        {
          console.log("hello");
          let userdata = new user({
          firstname:data.firstname,
          lastname:data.lastname,
          email:data.email,
          password:data.password,
          });
          userdata.save();
          let EachUserSudokuDetails = new UserSudokuDetails({
          email:data.email,
          gamewon:0,
          timer:"0"
          });
          EachUserSudokuDetails.save();
          return "signup";
        }else
        {
          return "Fields are mandatory";
        }
      }
      else
      {
        return "Email Address Already Exist";
      }
    },
    login:async (root,data)=>{
      console.log(data);
      const response=await user.findOne({email:data.email,password:data.password});
      console.log(response)

      if(response!=null)
      {
        return response;
      }

    },
    firstpage:async (root,data)=>{
      console.log(data);
      const response=await UserSudokuDetails.find({"email":data.email}).sort({"gamewon":-1}).limit(1);
      console.log(  response);
      return response[0];
    },
    sendsudokudetails:async (root,data)=>{
      console.log(data);
      let EachUserSudokuDetails = new UserSudokuDetails({
      email:data.email,
      gamewon:data.gamewon,
      timer:data.timewon
      });
      EachUserSudokuDetails.save();
      return true;
    },
    gettinghistory:async (root,data)=>{
     const response=await UserSudokuDetails.find({"email":data.email}).limit(11);
     console.log(response)
     return response;
    }
  }
};


export default resolvers;
