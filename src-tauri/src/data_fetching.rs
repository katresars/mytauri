use reqwest;
use serde_json;
use serde::{Deserialize, Serialize};
use crate::UserInfo;

#[derive(Debug, Serialize, Deserialize)]
struct BiliOtherInfo {
    face: String,
    uname: String,
}

pub async fn bili_reqwest(roomid: String) -> Result<UserInfo, String> {
    let client = reqwest::Client::new();
    let res = client.get("https://api.live.bilibili.com/room/v1/Room/get_info")
        .query(&[("room_id", roomid)])
        .send()
        .await
        .map_err(|e| e.to_string())?;

    let user_info = res.json::<serde_json::Value>()
        .await
        .map_err(|e| e.to_string())?;
    let user_data = &user_info["data"];

    // println!("user_data: {:?}", user_data);
    let mut user_info_struct = serde_json::from_value::<UserInfo>(user_data.clone())
        .map_err(|e| e.to_string())?;
    
    let res2 = client.get("https://api.live.bilibili.com/live_user/v1/Master/info")
        .query(&[("uid", user_info_struct.uid.to_string())])
        .send()
        .await
        .map_err(|e| e.to_string())?;
    
    let other_info = res2.json::<serde_json::Value>()
        .await
        .map_err(|e| e.to_string())?;
    let other_data = &other_info["data"]["info"];
    let other_info_struct = serde_json::from_value::<BiliOtherInfo>(other_data.clone())
        .map_err(|e| e.to_string())?;
   
    user_info_struct.avatar = other_info_struct.face;
    user_info_struct.following = other_info_struct.uname;
    // print!("user_info_struct: {:?}", user_info_struct);
    
    // let user_info_struct_json = serde_json::to_string(&user_info_struct)
    // .map_err(|e| e.to_string())?;

    // println!("user_info_struct_json: {}", user_info_struct_json);
    Ok(user_info_struct)
}