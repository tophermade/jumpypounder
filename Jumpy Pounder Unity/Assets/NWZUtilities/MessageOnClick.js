#pragma strict

var sendTo 			: GameObject;
var message 		: String;

function Click(){
	sendTo.SendMessage(message);
	#if UNITY_EDITOR
		print("sent " + message + " to " + sendTo);
	#endif
}