import express from "express";
import cors from 'cors';
import Spotify from "../../entities/Playlist/spotify";
import { GetAnswer } from "../../entities/Bot/bot.js";
import dontenv from 'dotenv';

class PlaylistsController{
    app : express
    port : number
    spotify : Spotify

    constructor(spotify: Spotify) {
        this.app = express();
        this.port = Number.parseInt(process.env.port ?? "3000");
        this.app.use(cors())
        dontenv.config()

        this.spotify = spotify;
        this.app.get('/playlists/:id', async (req, res) => {
            var response = await spotify.getSongs(req.params.id)
            res.send(response)
        });

        this.app.post('/playlists', async (req, res) => {
            let body = req.body as iPlaylistRequestModel
        });

        this.app.get('/feedback', async (req, res) => {
            const theme = req.query.theme
            const text = req.query.text
            const request = process.env.textBasePrompt?.replace('{tema}', theme).replace('{redacao}', text);
            console.log(request)
            const response = await GetAnswer(request)
            res.send(response)
        });

        this.app.get('/feedback/themes', async (req, res) => {
            const suggestion = req.query.suggestion;
            const text = process.env.themeBasePrompt?.replace('{tema}', suggestion);
            console.log(text)
            const response = await GetAnswer(text)
            res.send(response)
        });
        
        this.app.listen(this.port, () => console.log(`Hello world app listening on port ${this.port}!`))
    }
 
}


export default PlaylistsController
