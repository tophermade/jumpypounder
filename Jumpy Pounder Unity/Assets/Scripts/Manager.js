#pragma strict

var player 			: GameObject;
var scoreText 		: GameObject;
var highScoreText 	: GameObject;

var playScene 		: GameObject;
var menuScene 		: GameObject;

var enemyObject 	: GameObject;
var enemySpawns 	: GameObject[];

var spawnDelay 		: float 		= .75;
var lastSpawn 		: float 		= 0;

var playing 		: boolean 		= false;


function StartRound(){
	highScoreText.SetActive(false);
	player.transform.position = Vector3(0,4,0);
	menuScene.GetComponent(Animator).SetTrigger("DoMenuOut");

	yield WaitForSeconds(.5);
	playing = true;
	playScene.SetActive(true);
	player.SetActive(true);
	player.SendMessage("StartRound");
	scoreText.SetActive(true);
	//menuScene.SetActive(false);
}


function EndRound(){
	playing = false;

	yield WaitForSeconds(.3);
	menuScene.GetComponent(Animator).SetTrigger("DoResetMenu");
	playScene.SetActive(false);
}


function SpawnEnemy(){
	var spawnPoint : GameObject;
		spawnPoint = enemySpawns[Random.Range(0, enemySpawns.Length)];

	var newBaddie = Instantiate(enemyObject, spawnPoint.transform.position, Quaternion.identity);
	
	if(spawnPoint.transform.position.x > .1){
		// spawning from right;
		transform.eulerAngles = Vector3(0, 180, 0);
		newBaddie.SendMessage("Go", "left");
	} else {
		newBaddie.SendMessage("Go", "right");
	}

}


function Start () {

}

function Update () {

	if(playing){
		if(Time.time > lastSpawn + spawnDelay){
			SpawnEnemy();
			lastSpawn = Time.time;
		}
	}

}