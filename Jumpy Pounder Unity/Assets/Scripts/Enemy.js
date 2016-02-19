#pragma strict

var deathEffect 	: GameObject;

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
	//var newEffect = Instantiate(deathEffect, transform.position, Quaternion.identity);
	//newEffect.transform.parent = gameObject.transform;
	//gameObject.SetActive(false);

	if(goRight){
		GetComponent(Rigidbody2D).velocity = Vector2(3, -16);
	} else {
		GetComponent(Rigidbody2D).velocity = Vector2(-3, -16);
	}
	transform.localScale = Vector3(.35,.35,.35);
}


function EndOfLife(){

	yield WaitForSeconds(9);
	Destroy(gameObject);

}



function Start () {
	EndOfLife();
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