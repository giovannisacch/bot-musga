import Spotify from "./entities/Playlist/spotify.js"
import {handlePlaylists} from "./UIs/discordController.js"
import PlaylistsController from "./UIs/APIS/PlaylistsController.js"


async function main(){
    const spotify = new Spotify()
    handlePlaylists(spotify)
    const controller = new PlaylistsController(spotify);
    console.log(controller)
}

main()