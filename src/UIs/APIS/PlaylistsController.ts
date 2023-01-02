import express from "express";
import { rmSync } from "fs";
import Spotify from "../../entities/Playlist/spotify";
class PlaylistsController{
    app : express
    port : number
    spotify : Spotify

    constructor(spotify: Spotify) {
        this.app = express();
        this.port = Number.parseInt(process.env.port ?? "3000");

        this.spotify = spotify;
        this.app.get('/playlists/:id', async (req, res) => {
            var response = await spotify.getSongs(req.params.id)
            res.send(response)
        });
        
        this.app.listen(this.port, () => console.log(`Hello world app listening on port ${this.port}!`))
    }
 
}


export default PlaylistsController
