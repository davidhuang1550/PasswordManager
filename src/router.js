
let _ 		   = require("/Users/davidhuang/Desktop/Repositories/PasswordManager/src/path.js"),
   CommonAjax  = require(_.path + 'src/CommonAjax'),
   Login       = require(_.path + 'src/login'),
   Overview    = require(_.path + 'src/overview'),
   csv 		   = [],
   allLoaded   = false,
   defaultDatabase = firebaseApp.database();
;
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
        let signUp = require(_.path + 'src/signup');
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
/*//load login first
firebase.database().ref('messages/').set({
  password: "password"
});
*/
/*$.ajax({
  url: "https://us-central1-passwordmanager-86755.cloudfunctions.net/decrypt",
  type: "POST",
  data: {"hash":"a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"},
  dataType: "text",
  success: function(response){
    console.log(response);

  },
  error: function(error){
    console.log(error);
  }
});*/

route(_.login);
loadCsv();
