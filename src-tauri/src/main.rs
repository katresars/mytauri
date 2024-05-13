#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::time::{SystemTime, UNIX_EPOCH};

#[tauri::command]
fn on_button_clicked() -> String {
    let start = SystemTime::now();
    let since_the_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_millis();
    format!("on_button_clicked called from Rust! (timestamp: {since_the_epoch}ms)")
}

mod data_handling;
use data_handling::{Data, UserInfo, OtherStruct};
mod data_fetching;
use data_fetching::bili_reqwest;

#[tauri::command]
async fn fetch_data(roomid: String) -> Result<UserInfo, String> {
    bili_reqwest(roomid).await
}

#[tauri::command]
fn add_userinfo(user_info: UserInfo) -> Result<(), String> {
    let mut data: Data<UserInfo> = Data::load("userinfo.json")?;
    data.delete(|item| item.uid == user_info.uid)?;
    data.add(user_info)?;
    Ok(())
}

#[tauri::command]
fn delete_userinfo(uid: u64) -> Result<(), String> {
    let mut data: Data<UserInfo> = Data::load("userinfo.json")?;
    data.delete(|item| item.uid == uid)?;
    Ok(())
}

#[tauri::command]
fn load_userinfo() -> Result<Data<UserInfo>, String> {
    Data::load("userinfo.json")
}

// Example usage with OtherStruct
#[tauri::command]
fn add_other_struct(other_struct: OtherStruct) -> Result<(), String> {
    let mut data: Data<OtherStruct> = Data::load("other_struct_data.json")?;
    data.add(other_struct)?;
    Ok(())
}

#[tauri::command]
fn delete_other_struct(id: u64) -> Result<(), String> {
    let mut data: Data<OtherStruct> = Data::load("other_struct_data.json")?;
    data.delete(|item| item.id == id)?;
    Ok(())
}

#[tauri::command]
fn load_other_struct() -> Result<Data<OtherStruct>, String> {
    Data::load("other_struct_data.json")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            on_button_clicked,
            add_userinfo, delete_userinfo, load_userinfo,
            add_other_struct, delete_other_struct, load_other_struct,
            fetch_data,
        
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
