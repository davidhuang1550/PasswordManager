let promise = [];
	
let three,
	four,
	five,
	six,
	seven;	
let map = { 6: [[3,3],[6]],
			7: [[3,4],[4,3],[7]],
			8: [[3,5],[4,4],[5,3]],
			9: [[3,3,3],[3,6],[4,5],[5,4],[6,3]],
			10: [[3,3,4],[3,4,3],[3,7],[4,3,3],[4,6],[5,5],[6,4],[7,3]],
			11: [[3,3,5],[3,4,4],[3,5,3],[4,3,4],[4,4,3],[4,7],[5,3,3],[5,6],[6,5],[7,4]],
			12: [[3,3,6],[3,4,5],[3,5,4],[3,6,3],[4,3,5],[4,4,4],[4,5,3],[5,3,4],[5,4,3],[5,7],[6,3,3],[6,6],[7,5]],
			13: [[3,3,7],[3,4,6],[3,5,5],[3,6,4],[3,7,3],[4,3,6],[4,4,5],[4,5,4],[4,6,3],[5,3,5],[5,4,4],[5,5,3],[6,3,4],[6,4,3],[6,7],[7,3,3],[7,6]],
			14: [[3,4,7],[3,5,6],[3,6,5],[3,7,4],[4,3,7],[4,4,6],[4,5,5],[4,6,4],[4,7,3],[5,3,6],[5,4,5],[5,5,4],[5,6,3],[6,3,5],[6,4,4],[6,5,3],[7,3,4],[7,4,3],[7,7]],
			15: [[3,5,7],[3,6,6],[3,7,5],[4,4,7],[4,5,6],[4,6,5],[4,7,4],[5,3,7],[5,4,6],[5,5,5],[5,6,4],[5,7,3],[6,3,6],[6,4,5],[6,5,4],[6,6,3],[7,3,5],[7,4,4],[7,5,3]],
			16: [[3,6,7],[3,7,6],[4,5,7],[4,6,6],[4,7,5],[5,4,7],[5,5,6],[5,6,5],[5,7,4],[6,3,7],[6,4,6],[6,5,5],[6,6,4],[6,7,3],[7,3,6],[7,4,5],[7,5,4],[7,6,3]],
			17: [[3,7,7],[4,6,7],[4,7,6],[5,5,7],[5,6,6],[5,7,5],[6,4,7],[6,5,6],[6,6,5],[6,7,4],[7,3,7],[7,4,6],[7,5,5],[7,6,4],[7,7,3]],
			18: [[4,7,7],[5,6,7],[5,7,6],[6,5,7],[6,6,6],[6,7,5],[7,4,7],[7,5,6],[7,6,5],[7,7,4]],
			19: [[5,7,7],[6,6,7],[6,7,6],[7,5,7],[7,6,6],[7,7,5]],
			20: [[6,7,7],[7,6,7],[7,7,6]] };	

let urls = ["csv/three-letter-line.csv",
			"csv/four-letter-line.csv",
			"csv/five-letter-line.csv",
			"csv/six-letter-line.csv",
			"csv/seven-letter-line.csv"];
	
	
for ( let x = 0 ; x < 5 ; x++){
	console.time("Loading csv Files");
	promise[x] = new $.Deferred();
	$.ajax({
		url: urls[x],
		success: function(result){
			switch(x){
				case 0:
					three = result.split("\n");
					break;
				case 1:
					four = result.split("\n");
					break;
				case 2:
					five = result.split("\n");		
					break;
				case 3:
					six = result.split("\n");
					break;
				case 4:
					seven = result.split("\n");
					break;
			}
			promise[x].resolve();
			console.log("resolved " + x );
		}
	});
}
	
function FasterCreate(size){
	let combination = map[size];
	let value = Math.floor(Math.random() * combination.length);
	let password = "";
	let combinationChosen = combination[value];
	for(let i = 0 ; i< combinationChosen.length; i++){
		let combinationSinglePointer = combinationChosen[i];
		switch(combinationSinglePointer){
			case 3:
				combinationSinglePointer = three;	
				break;
			case 4:
				combinationSinglePointer = four;
				break;
			case 5:
				combinationSinglePointer = five;
				break;
			case 6:
				combinationSinglePointer = six;
				break;
			case 7:
				combinationSinglePointer = seven;
				break;
		}
		let stringVal = combinationSinglePointer[Math.floor(Math.random() * combinationSinglePointer.length)];
		password = password + (stringVal.charAt(0).toUpperCase() + stringVal.slice(1));
	}
	console.log(password);
	
}

// messy but works for now
// store the combinations and that way we dont have to recalculate every time we want to create a new password
// and instead just look for combinations instead.
function create(size){
	let combination = [];
	let wordlengthPointer = [three,four,five,six,seven];
	let wordlength = [3,4,5,6,7];
	
	for( let i = 0 ; i < wordlength.length; i++){
		let accum = 0;
		accum = wordlength[i];
		if(accum == size ){
			combination.push([wordlength[i]]);
			
		} else {
			for(let x = 0 ; x < wordlength.length; x++){
				let accum2 = accum;
				accum2 = accum2 + wordlength[x];
				if(accum2 == size){
					combination.push([wordlength[i], wordlength[x]]);
				} else {
					for(let j = 0; j < wordlength.length; j++){
						accum3 = accum2 + wordlength[j];
						if(accum3 == size){
							combination.push([wordlength[i], wordlength[x], wordlength[j]]);
						}
					}
					
				}
			}
		}
		
	}

}

function generate(){
	console.time("generating 14 passwords");
	for(let x = 6 ; x<= 20; x++){
		console.log("-----------"+ x + "------------");
		FasterCreate(x);
	}
	console.timeEnd("generating 14 passwords");
}

$.when((promise[0],promise[1],promise[2],promise[3],promise[4])).done(function(){
	console.timeEnd("Loading csv Files");
	console.log("all done ");
	//console.log(hex_sha256("dogdogdog"));
});
