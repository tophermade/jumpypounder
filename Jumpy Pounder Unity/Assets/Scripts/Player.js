#pragma strict


var playing 		: boolean 		= true;
var canJump 		: boolean 		= true;
var inAir 			: boolean 		= false;



function OnCollisionEnter2D(coll: Collision2D) {
	if (coll.transform.tag == "Enemy"){
		print("Hit Enemey");
		for (var theHit: ContactPoint2D in coll.contacts) {
			var hitPoint: Vector2 = theHit.point;
			//Instantiate(explosion, new Vector3(hitPoint.x, hitPoint.y, 0), Quaternion.identity);
		}
	} else if(coll.transform.tag == "Ground"){
		canJump = true;
		inAir = false;
		GetComponent(Rigidbody2D).velocity = Vector2(0, 6);
	}
}



function Start () {

}



function Update () {
	if(Input.GetMouseButtonDown(0) && playing){
		if(canJump){
			print("tapped");
			canJump = false;
			inAir = true;
			GetComponent(Rigidbody2D).velocity = Vector2(0, 20);
		} else if(!canJump && inAir){			
			GetComponent(Rigidbody2D).velocity = Vector2(0, -16);
		}
	}// mouse down & playing
}