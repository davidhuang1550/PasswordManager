let proPath = '/Users/davidhuang/Desktop/Repositories/PasswordManager/';
let constants = {
	path 				  : proPath,
	CommonAjax			  : proPath + 'src/CommonAjax',
	LoginScript			  : proPath + 'src/login',
	OverViewScript 		  : proPath + 'src/overview',
	SignUpScript		  : proPath + 'src/signup',
	PasswordCreationManager : proPath + 'src/PasswordCreationManager',
	ModalBuilder		  : proPath + 'src/Modal/ModalBuilder',
	ModalNames			  : proPath + 'src/ModalNames',
	GeneratePasswordScript : proPath + 'src/GeneratePassword',
	WordGenerateScript	  : proPath +'src/WordGenerate',
	SearchPanelScript	  : proPath + 'src/SearchPanel',
    HashFunction		  : proPath + 'src/models/HashFunction',
	PasswordInformationPanelScript : proPath + 'src/PasswordInformationPanel',
	PasswordScript        : proPath + 'src/models/Password',
	ModalScript			  : proPath + 'src/Modal/Modal',
	PasswordCreationModalScript	: proPath + 'src/Modal/PasswordCreationModal',	
	PromptForPasswordScript : proPath + 'src/Modal/PromptForPassword',
	PassworderrorModalScript : proPath + 'src/Modal/PasswordErrorModal',
	HistoryModalScript	  : proPath + 'src/Modal/HistoryModal',
	PasswordChangeModalScript : proPath + 'src/Modal/PasswordChangeModal',
	LoginModalScript	  : proPath + 'src/Modal/LoginModal',
	AdditionalInformationScript : proPath + 'src/AdditionalInformation',

	login 				  : proPath + 'partialviews/login.html',
	overview 			  : proPath + 'partialviews/overview.html',
	rightpanel 			  : proPath + 'partialviews/rightpanel.html',
	signup 				  : proPath + 'partialviews/signup.html',

	// MODAL //
	PasswordCreationModal : proPath + 'partialviews/Modal/PasswordCreationModal.html',
	PromptForPassword     : proPath + 'partialviews/Modal/PromptForPassword.html',
	PasswordErrorModal    : proPath + 'partialViews/Modal/PasswordErrorModal.html',
	HistoryModal		  : proPath + 'partialViews/Modal/HistoryModal.html',
	LoginModal			  : proPath + 'partialViews/Modal/LoginModal.html',
	passwordChangeModal   : proPath + 'partialviews/Modal/passwordChangeModal.html',
};

module.exports = constants;
