#pragma strict

var goRight 		: boolean 		= true;

function Start () {

}

function Update () {

	if(goRight){
		GetComponent(Rigidbody2D).velocity = Vector2(3, 0);
	} else {
		GetComponent(Rigidbody2D).velocity = Vector2(-3, 0);
	}

}