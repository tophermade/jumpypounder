#pragma strict

var goRight 		: boolean 		= true;
var alive 			: boolean 		= true;

function Go(dir : String){
	if(dir == "left"){
		goRight = false;
	} else {
		goRight = true;
	}
}


function KilledByPlayer(){
	print("Fuck, I've been trounced");

	alive = false;
	GetComponent(BoxCollider2D).isTrigger = true;

	if(goRight){
		GetComponent(Rigidbody2D).velocity = Vector2(3, -12);
	} else {
		GetComponent(Rigidbody2D).velocity = Vector2(-3, -12);
	}
}



function Start () {

}



function Update () {

	if(alive){
		if(goRight){
			GetComponent(Rigidbody2D).velocity = Vector2(3, 0);
		} else {
			GetComponent(Rigidbody2D).velocity = Vector2(-3, 0);
		}
	}

}