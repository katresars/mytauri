// File: data_handling.rs

use std::fs;
use std::path::PathBuf;
use serde::{Serialize, Deserialize};
use serde::de::DeserializeOwned;

#[derive(Debug, Serialize, Deserialize, Clone)]
// use alias to replace serde(rename="live_status") add Clone method
pub struct UserInfo {
    pub uid: u64,
    #[serde(default)]
    pub avatar: String,
    #[serde(default)]
    pub following: String,
    #[serde(alias="live_status")]
    pub livestate: u64,
    pub title: String,
    #[serde(alias="user_cover")]
    pub cover: String,
    #[serde(alias="live_time")]
    pub prelive: String,
    #[serde(alias="parent_area_name")]
    pub classification: String,
    #[serde(alias="room_id")]
    pub live_room_id: u64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OtherStruct {
    pub id: u64,
    // Define fields for the other struct here
    // Example: 
    // id: u64,
    // name: String,
}

// Define a generic struct for data storage
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Data<T> {
    items: Vec<T>,
}

impl<T> Data<T> {
    pub fn new() -> Self {
        Data { items: Vec::new() }
    }
}

impl<T: Serialize + DeserializeOwned + Clone> Data<T> {
    // Load data from a JSON file
    pub fn load(filename: &str) -> Result<Self, String> {
        let file_path = get_data_file_path(filename)?;
        match fs::File::open(&file_path) {
            Ok(file) => {
                let data: Self = serde_json::from_reader(file).map_err(|e| e.to_string())?;
                Ok(data)
            },
            Err(_) => {
                Ok(Self::new())
            },
        }
    }

    // Save data to a JSON file
    pub fn save(&self, filename: &str) -> Result<(), String> {
        let file_path = get_data_file_path(filename)?;
        let json_data = serde_json::to_string_pretty(self).map_err(|e| e.to_string())?;
        fs::write(&file_path, json_data).map_err(|e| e.to_string())?;
        Ok(())
    }

    // Update data using a closure
    pub fn update(&mut self, update_fn: impl FnOnce(&mut Vec<T>)) -> Result<(), String> {
        update_fn(&mut self.items);
        self.save("userinfo.json")
    }

    // Add an item to the data
    pub fn add(&mut self, item: T) -> Result<(), String> {
        self.update(|items| {
            items.push(item.clone());
        }) 
    }

    // Delete an item from the data
    pub fn delete(&mut self, compare_fn: impl Fn(&T) -> bool) -> Result<(), String> {
        self.update(|items| {
            items.retain(|item| !compare_fn(item));
        })
    }
}

// Get the data file path based on the installation path or AppData path
fn get_data_file_path(filename: &str) -> Result<PathBuf, String> {
    // Check if the APPDATA environment variable is set
    let file_folder = tauri::api::path::local_data_dir();
    let file_path = file_folder.unwrap().join("tauri-nextjs-template")
        .join("data").join(filename);
    
    // create parent folder if not exists
    if let Some(parent) = file_path.parent() {
        if !parent.exists() {
            fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
    }
    // println!("file_path: {:?}", file_path);
    // need to add identifier manually
    Ok(file_path)
}
