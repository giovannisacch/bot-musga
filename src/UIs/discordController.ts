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
        const response = await spotify.getSongs(firstMessage.content)
        response?.songs.forEach(element => {
            firstMessage
            .reply("!play " + element.name + " " + element.artists)
            .then(() => console.log("respondi"))
        });
    })
    client.login(process.env.discordKey);

}