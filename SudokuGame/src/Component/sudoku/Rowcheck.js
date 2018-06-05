
exports.row=(rowindex,colindex,value)=>
{
  var count=0;
  for(var j=0;j<9;j++) 
  {
    if((window.StoringValue[rowindex][j]===value))
    {
      count++;
    }
  }
  return count;
} 
