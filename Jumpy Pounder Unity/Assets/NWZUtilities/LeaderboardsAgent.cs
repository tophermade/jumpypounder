using UnityEngine;
using System.Collections;
using VoxelBusters.Utility;

namespace VoxelBusters.NativePlugins.Nwzboards
{
#if UNITY_IPHONE || UNITY_ANDROID

	using Internal;
	public class LeaderboardsAgent : MonoBehaviour {

		public string boardID = "scoreboard";


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
				NPBinding.GameServices.ShowLeaderboardUIWithGlobalID(boardID, m_timeScope, (string _error)=>{
					Debug.Log("Closed leaderboard UI.");
				});
			} else {
				DoLogin();
			}
		}



		void DoLogin(){
			NPBinding.GameServices.LocalUser.Authenticate((bool _success, string _error)=>{				
				if (_success)
				{
					Debug.Log("Sign-In Successfully");
					Debug.Log("Local User Details : " + NPBinding.GameServices.LocalUser.ToString());
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

		

		void Start () {
			if(!Application.isEditor){
				DoLogin();
			}			
		}

		
		
		void Update () {
		
		}
	}

#endif  
}