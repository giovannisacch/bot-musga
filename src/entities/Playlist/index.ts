import { AxiosError } from "axios"
import Axios from "../../instances/axios.js"

import { iPlaylistSendSongs } from "./types"

export type PlaylistType = "SPOTIFY" | "YOUTUBE" | "SONG_NAMES"

class Playlist {
    name

    songValue: string[]
    type: PlaylistType

    error = false

    constructor(name: string, songValue: string[]) {
        this.name = name;
        this.songValue = songValue
    }
    
    sendSongs(callback: iPlaylistSendSongs) {
        this.songValue.forEach(songValue => {
            callback(songValue)
        })
    }
}

export default Playlist