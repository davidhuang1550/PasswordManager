
let _ 		   = require("/Users/davidhuang/Desktop/Repositories/PasswordManager/src/path.js"),
   CommonAjax  = require(_.CommonAjax),
   Login       = require(_.LoginScript),
   Hash        = require(_.HashFunction),
   Overview    = require(_.OverViewScript),
   csv 		   = [],
   allLoaded   = false,
   defaultDatabase = firebaseApp.database();

/**
 * loading different partial views with its assoiciated js files
 *@param the path of the partial view
**/
function route(path){
	let inlinePromise;
	inlinePromise = CommonAjax.GetPartialView(path);
	inlinePromise.done(function(result){
		switch(path){
			case _.login:
      	        $("body").html(result);
				Login.InitializeListeners();
				break;
			case _.overview:
      	        $("body").html(result);
				let oOverviewObj = new Overview();
				oOverviewObj.InitializeListeners();
				break;
            case _.signup:
                $("body").append(result);
                let signUp = require(_.SignUpScript);
                signUp.InitializeListeners();
                break;
			default:
				//404 error
				break;
		}
	}).fail(function(){
		// rejected;
	});
}

function loadCsv(){
	let urls = ["csv/three-letter-line.csv",
			"csv/four-letter-line.csv",
			"csv/five-letter-line.csv",
			"csv/six-letter-line.csv",
			"csv/seven-letter-line.csv"],
		inlinePromise = [];

	console.time("Loading csv Files");
	for ( let x = 0 ; x < 5 ; x++){

		inlinePromise[x] = CommonAjax.GetPartialView(_.path + urls[x]);

		inlinePromise[x].done(function(result){
			console.log("loaded " + x );
			csv[x] = result.split("\n");
		});
	}
	$.when((inlinePromise[0],inlinePromise[1],inlinePromise[2],inlinePromise[3],inlinePromise[4])).done(function(){
		allLoaded = true;
		console.log("all Loaded");
	});

}

route(_.login);
loadCsv();
