// main.rs

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
use commands::{
    inject_command, 
    launch_game_command, 
    fetch_players_command, 
    fetch_packages_command, 
    downloader_command,
    find_executable_command,
};


fn main() {
    // Tauri app builder and run
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        inject_command::inject, 
        launch_game_command::launch_game,
        launch_game_command::launch_game_non_steam,
        fetch_players_command::fetch_players_online, 
        fetch_packages_command::fetch_package_metadata,
        fetch_packages_command::fetch_packages,
        fetch_packages_command::fetch_dependency_tree,
        downloader_command::download_package,
        find_executable_command:: find_executable,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");

}
