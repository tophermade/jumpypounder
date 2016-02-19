#pragma strict

var lumbergh 		: GameObject;
var sendTo 			: GameObject;
var message 		: String;

function Start(){
	lumbergh = GameObject.Find("Lumbergh");
}

function Click(){
	lumbergh.SendMessage("PlayTap");
	sendTo.SendMessage(message);
	#if UNITY_EDITOR
		print("sent " + message + " to " + sendTo);
	#endif
}