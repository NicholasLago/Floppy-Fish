/** This function retrieves a created cookie
* param {string} cname - name of the cookie to be retrieved
*/
function getCookie(cName){
	var name = cName + "=";
	var ca = document.cookie.split(';');

	for(var i=0; i<ca.length; i++){
		var c = ca[i].trim();
		if (c.indexOf(name)==0)
			return c.substring(name.length,c.length);
	}
	return "";
}

/** This function sets the value of a named cookie and its expiry date
* param {cname} - name of the cookie being set
* param {cvalue} - value of the cookie being set
* param {exdays} - number of days the cookie is to last
*/
function setCookie(cName, cValue, exDays){
	var d = new Date();

	d.setTime(d.getTime()+(exDays*24*60*60*1000));

	var expires = "expires="+d.toGMTString();

	document.cookie = cNmae + "=" cValue + "; " + expires;
}