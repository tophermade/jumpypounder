using System;
using System.Text;
using UnityEngine;
using ChartboostSDK;
using System.Collections.Generic;

public class NWZChartboost : MonoBehaviour {
	void ShowInterstertial(){
		if(PlayerPrefs.GetString("ShowAds") != "false"){
			Debug.Log("show interstertial");
	    	Chartboost.showInterstitial(CBLocation.HomeScreen);
		}		
	}
}