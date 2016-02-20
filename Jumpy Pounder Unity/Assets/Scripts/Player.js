#pragma strict

var killZone 		: GameObject;
var lumbergh 		: GameObject;
var comboEffect 	: GameObject;
var deadEffect 		: GameObject;

var playing 		: boolean 		= false;
var canJump 		: boolean 		= true;
var inAir 			: boolean 		= false;

var kills 			: int 			= 0;



function ComboKill(){
	lumbergh.SendMessage("PlayKill");
	var newCombo = Instantiate(comboEffect, Vector3(0,1.66,0), Quaternion.identity);
	yield WaitForSeconds(2);
	Destroy(newCombo);
}


function StandardKill(){
	lumbergh.SendMessage("PlayKill");
	lumbergh.SendMessage("TinyShake");
}


function OnCollisionEnter2D(coll: Collision2D) {
	if (coll.transform.tag == "Enemy"){
		print("Hit Enemey");
		var givenPoint : boolean = false;
		for (var theHit: ContactPoint2D in coll.contacts) {
			var hitPoint: Vector2 = theHit.point;
			//Instantiate(explosion, new Vector3(hitPoint.x, hitPoint.y, 0), Quaternion.identity);

			if(!givenPoint){
				if(hitPoint.y < killZone.transform.position.y){
					coll.transform.gameObject.SendMessage("KilledByPlayer");
					givenPoint = true;
					lumbergh.SendMessage("AddPoint");

					if(kills > 0){
						ComboKill();
					} else {
						StandardKill();
					}

					kills++;
				} else {
					EndRound();
					#if UNITY_EDITOR
						print("Round ending");
					#endif
				}
			}
		}
	} else if(coll.transform.tag == "Ground"){
		canJump = true;
		inAir = false;
		kills = 0;
		GetComponent(Rigidbody2D).velocity = Vector2(0, 6);
	}
}



function StartRound(){
	gameObject.SetActive(true);
	playing = true;
	kills = 0;
}


function EndRound(){
	playing = false;
	gameObject.SetActive(false);
	var newBody = Instantiate(deadEffect, transform.position, Quaternion.identity);
	lumbergh.SendMessage("DoShake");
	lumbergh.SendMessage("PlayHit");
	lumbergh.SendMessage("EndRound");
}



function Start () {

}



function Update () {
	if(Input.GetMouseButtonDown(0) && playing){
		if(canJump){
			print("tapped");
			canJump = false;
			inAir = true;
			lumbergh.SendMessage("PlayJump");
			GetComponent(Rigidbody2D).velocity = Vector2(0, 19.2);
		} else if(!canJump && inAir){			
			GetComponent(Rigidbody2D).velocity = Vector2(0, -16);
			lumbergh.SendMessage("PlayLanding");
		}
	}// mouse down & playing
}