import user from "./usermodel.js";
import UserSudokuDetails from "./usersudokudetailsmodel.js";
const resolvers = {
  Query: {
    getUsers: (root, data) =>{
      return "Reached the getUsers resolver";
    }
  },
  Mutation: {
    signup: (root, data) =>{
      console.log(data);
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
      return true;
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
     const response=await UserSudokuDetails.find({"email":data.email});
     console.log(response)
     return response;
    }
  }
};


export default resolvers;