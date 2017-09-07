class PasswordGenerator{
	constructor(){
	}
	
	Generate(size, args){
		let hitCount = [],
			passwordString = "",
			value,
			secondaryValue,
			secondaryList;
		
		for(let x = 0; x < args.length ; x++){
			hitCount[x] = 0;
		}
		
		for(let i = 0; i < size; i++){
			value = Math.floor(Math.random() * args.length);
			hitCount[value] = 1;
			
			secondaryList = args[value];
			secondaryValue = Math.floor(Math.random() * secondaryList.length);
			passwordString = passwordString + secondaryList[secondaryValue];
			
			if(size <= ( i +args.length)){
				args.splice(value,1);
				hitCount.splice(value,1);
			}
		}
	
		return passwordString;
	}
};
module.exports = PasswordGenerator;