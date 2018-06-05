exports.box=(rowindex,colindex,value)=>
{ 
  var counter=0;
  var m,n,k,l;
  var rowcheck=parseInt((rowindex/3),10);
  var columncheck=parseInt((colindex/3),10);
  if(rowcheck===0)
    {
    if(columncheck===0){
      m=0;n=0;k=3;l=3;
    }
    else
    if(columncheck===1)
    {
    m=0;n=3;k=3;l=6;
    }
    else
    if(columncheck===2){
    m=0;n=6;k=3;l=9;
    }
  }
  else
  if(rowcheck===1)
    {
    if(columncheck===0){
      m=3;n=0;k=6;l=3;
    }
    else
    if(columncheck===1)
    {
    m=3;n=3;k=6;l=6;
    }
    else
    if(columncheck===2){
    m=3;n=6;k=6;l=9;
    }
    }
    else
  if(rowcheck===2){
    if(columncheck===0){
      m=6;n=0;k=9;l=3;
    }
    else
    if(columncheck===1)
    {
      m=6;n=3;k=9;l=6;
    }
    else
    if(columncheck===2){
      m=6;n=6;k=9;l=9;
    }
  }

  for(var i=m;i<k;i++)
  {
    for(var j=n;j<l;j++)
    {
      if(window.StoringValue[i][j]===value)
      {
        counter++;
      }
    }
  }
    return counter;
}
