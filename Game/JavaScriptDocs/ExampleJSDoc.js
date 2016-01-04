/**
 * this function sets cookies in the browser
 * param {string} cname - the name of cookie
 * param {string} cvalue - the value of cookie
 * param {string} exdays - for a specific amount of days
*/

function setCookie(cname,cvalue,exdays)
		{
		   var d = new Date();
		   d.setTime(d.getTime()+(exdays*24*60*60*1000));
		   var expires = "expires="+d.toGMTString();
		}