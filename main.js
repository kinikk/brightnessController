var cmd=require('./cmd.js');
const als = require('./ambientLight');
const path = require('path');
var main = function(){
	var ambientData;
	als(function(err, alsData) {
	if(!err) {
		
		cmd.get("ioreg -f -b -r -c 'AppleBacklightDisplay' | grep linear-brightness-probe",(err,data)=>{
			var temp = '{'+data.replace(/=/g,':').replace(/-/g,'')+'}'
			var data=JSON.parse(temp);
			var brightness = data.IODisplayParameters.brightness;
			var brightnessprobe = data.IODisplayParameters.brightnessprobe;
			var value = brightnessprobe.value/brightness.max;
			var execPath = path.join(process.cwd(), './lib/brightnessControl');
			alsData.computedValue>value?ambientData = alsData.computedValue:ambientData = value;
			output = value===ambientData?value:ambientData;
			value===0?output=0:null;	
			cmd.run(execPath+' '+output);
		})
	}
	});	
}
setInterval(main,300);