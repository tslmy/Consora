programs.push('me');
function program_me(){
	show("    Code Name        = <span class='quote'>" + navigator.appCodeName + "</span>");
	show("    Minor Version    = <span class='quote'>" + navigator.appMinorVersion + "</span>");
	show("    Name             = <span class='quote'>" + navigator.appName + "</span>");
	show("    Version          = <span class='quote'>" + navigator.appVersion + "</span>");
	show("    Cookie Enabled   = <span class='quote'>" + navigator.cookieEnabled + "</span>");
	show("    CPU Class        = <span class='quote'>" + navigator.cpuClass + "</span>");
	show("    On Line          = <span class='quote'>" + navigator.onLine + "</span>");
	show("    Platform         = <span class='quote'>" + navigator.platform + "</span>");
	show("    User-Agent String = <span class='quote'>" + navigator.userAgent + "</span>");
	show("    Browser Language = <span class='quote'>" + navigator.browserLanguage + "</span>");
	show("    System Language  = <span class='quote'>" + navigator.systemLanguage + "</span>");
	show("    User Language    = <span class='quote'>" + navigator.userLanguage + "</span>");
	return 0;
};