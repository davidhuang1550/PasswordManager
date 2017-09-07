class Password {
	/**
	 *@param pass password for the given object which is encrypted
	 *@param secure bool value that signifies if the password is secure or note
	 *@param keyVal key/value pair of what ever the user wants
	 *@param title the title of the password ex(facebook).
	 */
	constructor(key, pass, secure, keyVal, description, title){
		this._key = key;
		this._password = pass;
		this._secure = secure;
		this._keyVal = keyVal;
		this._description = description
		this._title = title;
	}

	set key(ke){
		this._key = ke;
	}

	get key(){
		return this._key;
	}

	set pass(passw){
		this._password = passw;
	}

	get pass(){
		return this._password;
	}

	set secure(sec){
		this._secure = sec;
	}

	get secure(){
		return this._secure;
	}

	set keyVal(keyV){
		this._keyVal = keyV;
	}

	get keyVal(){
		return this._keyVal;
	}

	set description(desc){
		this._description = desc;
	}

	get description(){
		return this._description;
	}

	set title(tit){
		this._title = tit;
	}

	get title(){
		return this._title;
	}
}

module.exports = Password;
