class WordGenerator{
	
	constructor(three,four,five,six,seven){
		this._three = three;
		this._four = four;
		this._five = five;
		this._six = six;
		this._seven = seven;
		this._map = { 6: [[3,3],[6]],
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

	}
	
	FasterCreate(size){
		let combination = this._map[size];
		let value = Math.floor(Math.random() * combination.length);
		let password = "";
		let combinationChosen = combination[value];
		for(let i = 0 ; i< combinationChosen.length; i++){
			let combinationSinglePointer = combinationChosen[i];
			switch(combinationSinglePointer){
				case 3:
					combinationSinglePointer = this._three;	
					break;
				case 4:
					combinationSinglePointer = this._four;
					break;
				case 5:
					combinationSinglePointer = this._five;
					break;
				case 6:
					combinationSinglePointer = this._six;
					break;
				case 7:
					combinationSinglePointer = this._seven;
					break;
			}
			let stringVal = combinationSinglePointer[Math.floor(Math.random() * combinationSinglePointer.length)];
			password = password + (stringVal.charAt(0).toUpperCase() + stringVal.slice(1));
		}
		console.log(password);
		return password;
	}
	
	
};


module.exports = WordGenerator;