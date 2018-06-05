const typeDefs=`
  type Query{
    getUsers: String
  },
  type Mutation{
    signup(firstname: String!, lastname: String!,email:String!,password:String!): String
    login(email:String,password:String):user
    firstpage(email:String):sudokudetails
    sendsudokudetails(gamewon:Int,timewon:String,email:String):Boolean
    gettinghistory(email:String):[sudokudetails]
  },
  type user{
    _id:String,
    firstname:String,
    lastname:String,
    email:String,
    password:String
  },
  type sudokudetails{
    email:String,
    gamewon:Int,
    timer:String
  }
`;
export default typeDefs;
