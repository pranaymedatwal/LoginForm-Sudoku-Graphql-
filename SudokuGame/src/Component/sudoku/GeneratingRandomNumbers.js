exports.GeneratingRandomNumbers=()=>
{debugger
  window.StoringValue = [ 
    ["5","3","4","6","7","8","9","1","2"],
    ["6","7","2","1","9","5","3","4","8"],
    ["1","9","8","3","4","2","5","6","7"], 
    ["8","5","9","7","6","1","4","2","3"], 
    ["4","2","6","8","5","3","7","9","1"], 
    ["7","1","3","9","2","4","8","5","6"],
    ["9","6","1","5","3","7","2","8","4"],
    ["2","8","7","4","1","9","6","3","5"],
    ["3","4","5","2","8","6","1","7","9"] 
  ]

  window.SolutionValue = [ 
    ["5","3","4","6","7","8","9","1","2"],
    ["6","7","2","1","9","5","3","4","8"],
    ["1","9","8","3","4","2","5","6","7"], 
    ["8","5","9","7","6","1","4","2","3"], 
    ["4","2","6","8","5","3","7","9","1"], 
    ["7","1","3","9","2","4","8","5","6"],
    ["9","6","1","5","3","7","2","8","4"],
    ["2","8","7","4","1","9","6","3","5"],
    ["3","4","5","2","8","6","1","7","9"] 
  ]


  var x=((Math.floor(Math.random() * 9) + 1)).toString();
  var y=((Math.floor(Math.random() * 9) + 1)).toString();
  while(x===y)
  {
    y=((Math.floor(Math.random() * 9) + 1)).toString();
  }

  for(var i=0;i<9;i++)
  {
    for(var j=0;j<9;j++)
    {
      if(window.StoringValue[i][j]===x)
      { 
        window.SolutionValue[i][j]=y;
        window.StoringValue[i][j]=y;
      }
      else
      if(window.StoringValue[i][j]===y)
      { 
        window.SolutionValue[i][j]=x;
        window.StoringValue[i][j]=x;
      }
    }
  }
}