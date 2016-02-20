using UnityEngine;
using System.Collections;
using VoxelBusters.Utility;

namespace VoxelBusters.NativePlugins.Nwzboards
{
	using Internal;
	public class LeaderboardsAgent : MonoBehaviour {

		#if UNITY_ANDROID
			private string  boardName = "CgkIuOWWrdUJEAIQAA";
		#endif

		#if UNITY_IPHONE
			private string boardName = "jumpypounder.leaders";
		#endif

		#pragma warning disable
			[SerializeField, Header("Leaderboard Properties")]
			private		eLeaderboardTimeScope	m_timeScope;
			[SerializeField]
		#pragma warning restore

		void PostScore(int score){
		}

		void ShowLeaderboards(){	
			Debug.Log("ShowLeaderboards");
			if(NPBinding.GameServices.LocalUser.IsAuthenticated){
				NPBinding.GameServices.ShowLeaderboardUIWithGlobalID(boardName, m_timeScope, (string _error)=>{
					Debug.Log("Closed leaderboard UI.");
				});
			} else {
				DoLoginWithBoard();
			}
		}

		void DoLogin(){
			NPBinding.GameServices.LocalUser.Authenticate((bool _success, string _error)=>{				
				if (_success)
				{
					Debug.Log("Sign-In Successfully");
					Debug.Log("Local User Details : " + NPBinding.GameServices.LocalUser.ToString());
					ShowLeaderboards();
				}
				else
				{
					Debug.Log("Sign-In Failed with error " + _error);
				}
			});
		}

		void DoLoginWithBoard(){
			NPBinding.GameServices.LocalUser.Authenticate((bool _success, string _error)=>{				
				if (_success)
				{
					Debug.Log("Sign-In Successfully");
					Debug.Log("Local User Details : " + NPBinding.GameServices.LocalUser.ToString());
					ShowLeaderboards();
				}
				else
				{
					Debug.Log("Sign-In Failed with error " + _error);
				}
			});
		}

		// Use this for initialization
		void Start () {
			DoLogin();
		}
		
		// Update is called once per frame
		void Update () {
		
		}
	}
}