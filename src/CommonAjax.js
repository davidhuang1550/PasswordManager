
class CommonAJax{
	
	constructor(){
		
	}
	
	GetPartialView(path){
		let inlinePromise = new $.Deferred();
		$.ajax({
			url: path,
			type: "GET",
			dataType: "text",
			success: function(response){
				console.log("Success Downloading partial view");
				inlinePromise.resolve(response);
			},
			error: function(error){
				console.log("fail downloading partial view");
				inlinePromise.reject();
			}
		});
		
		return inlinePromise.promise();
	}
}

module.exports =  new CommonAJax();
	