#pragma strict

var url : String;


function Click(){
	Application.OpenURL("http://www.facebook.com/sharer/sharer.php?u=" + url);
}