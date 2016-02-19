#pragma strict

var url : String;


function Click(){
	Application.OpenURL("https://twitter.com/share?url=" + url);
}