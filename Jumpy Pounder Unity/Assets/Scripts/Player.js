#pragma strict

var killZone 		: GameObject;
var lumbergh 		: GameObject;


var playing 		: boolean 		= false;
var canJump 		: boolean 		= true;
var inAir 			: boolean 		= false;



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
		GetComponent(Rigidbody2D).velocity = Vector2(0, 6);
	}
}



function StartRound(){
	playing = true;
}


function EndRound(){
	playing = false;
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
			GetComponent(Rigidbody2D).velocity = Vector2(0, 19.2);
		} else if(!canJump && inAir){			
			GetComponent(Rigidbody2D).velocity = Vector2(0, -16);
		}
	}// mouse down & playing
}