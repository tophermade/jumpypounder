#pragma strict

var url 	: String;
var text 	: String;


function Click(){
	Application.OpenURL("https://twitter.com/share?url=" + url + "&text=" + text);
}