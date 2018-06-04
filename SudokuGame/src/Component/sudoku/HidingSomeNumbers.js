exports.HidingSomeNumbers=(h)=>
{
	for(var i=0;i<h;i++)
	{
		var z=((Math.floor(Math.random() * 8) ));
		var k=((Math.floor(Math.random() * 8) ));
		window.StoringValue[z][k]="";
	}
}
