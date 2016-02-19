#pragma strict

var player 	: GameObject;


function Start () {

	//gameObject.transform.localScale = Vector3(.3,.3,.3);
}

function Update () {
	var distance = player.transform.position.y - transform.position.y;
	distance = 1-(distance *.1);
	gameObject.transform.localScale = Vector3(distance, distance, distance);
}