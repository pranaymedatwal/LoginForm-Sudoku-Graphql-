exports.column=(rowindex,colindex,value)=>
{
	var counting=0;
	for(var j=0;j<9;j++)
	{
		if((window.StoringValue[j][colindex]===value))
		{
			counting++;
		}
	}
	return counting;
}