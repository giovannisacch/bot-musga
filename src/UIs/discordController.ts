import pkg, { MessageType } from 'discord.js';
import Spotify from '../entities/Playlist/spotify';
import dontenv from 'dotenv';
dontenv.config()
const { Client, GatewayIntentBits } = pkg;

export function handlePlaylists(spotify : Spotify){
    const client = new Client({ intents: [GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
    client.once('ready', () => {
        console.log('Ready!');
    });
    client.on("messageCreate", async (firstMessage) => {
        if (firstMessage.author.bot) return;
        
        if (firstMessage.type === MessageType.UserJoin) {
            return;
        }
        let playlistId = ''
        if (firstMessage.content.startsWith('!ff '))
            playlistId = firstMessage.content.substring(4)
        else
            return;

        const response = await spotify.getSongs(playlistId)
        response?.songs.forEach( (element, index) => {
            setTimeout(() => {
                firstMessage
                .reply("#p " + element.name + " " + element.artists)
                .then(() => console.log("respondi"))
            }, index*500);
        });
    })
    client.login(process.env.discordKey);

}