#pragma strict

var player 			: GameObject;
var scoreText 		: GameObject;
var highScoreText 	: GameObject;

var playScene 		: GameObject;
var menuScene 		: GameObject;

var enemyObject 	: GameObject;
var enemySpawns 	: GameObject[];
var enemyParent 	: GameObject;
var activeEnemies 	: GameObject[];

var spawnDelay 		: float 		= .75;
var lastSpawn 		: float 		= 0;
var currentScore 	: float 		= 0;

var playing 		: boolean 		= false;


function StartRound(){
	currentScore = 0;
	scoreText.GetComponent(TextMesh).text = currentScore.ToString();
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

	activeEnemies = GameObject.FindGameObjectsWithTag("Enemy");
	for (var baddie: GameObject in activeEnemies) {
		Destroy(baddie);
	}

	menuScene.GetComponent(Animator).SetTrigger("DoResetMenu");
	playScene.SetActive(false);

	var theHigh = 0;
	if(PlayerPrefs.HasKey("highscore")){
		theHigh = PlayerPrefs.GetInt("highscore");
	} else {
		PlayerPrefs.SetInt("highscore", 0);
	}
	if(theHigh < currentScore){
		PlayerPrefs.SetInt("highscore", currentScore);
		highScoreText.SetActive(true);
	}
}


function SpawnEnemy(){
	var spawnPoint : GameObject;
		spawnPoint = enemySpawns[Random.Range(0, enemySpawns.Length)];

	var newBaddie = Instantiate(enemyObject, spawnPoint.transform.position, Quaternion.identity);
	newBaddie.transform.parent = enemyParent.transform;
	
	if(spawnPoint.transform.position.x > .1){
		// spawning from right;
		newBaddie.transform.eulerAngles = Vector3(0, 180, 0);
		newBaddie.SendMessage("Go", "left");
	} else {
		newBaddie.SendMessage("Go", "right");
	}
}


function AddPoint(){
	currentScore++;
	scoreText.GetComponent(TextMesh).text = currentScore.ToString();
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