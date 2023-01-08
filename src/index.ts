import Spotify from "./entities/Playlist/spotify.js"
import {handlePlaylists} from "./UIs/discordController.js"
import PlaylistsController from "./UIs/APIS/PlaylistsController.js"
import CheckController from './UIs/APIS/CheckController.js'
import BaseController from "./UIs/APIS/BaseController.js"

async function main(){
    const spotify = new Spotify()
    handlePlaylists(spotify)
    // const controllerBase = new BaseController();
    const controller = new PlaylistsController(spotify);
    // const controllerBot = new CheckController(controllerBase);
    console.log(controller)
}

main()