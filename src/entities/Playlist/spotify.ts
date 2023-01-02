import Axios from "../../instances/axios.js"
import { Filter, Music, PlaylistResponse } from "./playlistResponse.js";
import dontenv from 'dotenv';
dontenv.config()

class Spotify{
    instance : Axios
    constructor() {
        this.instance = new Axios()
    }
    onlyUnique(value: string, index : number, self : string[]) : boolean {
        return self.indexOf(value) === index;
      }

    async getSongs(playlistId : string ) : Promise<PlaylistResponse | null>{
        let client = await this.instance.GetInstance();
        try {
            const responsePlaylist = await client.get(`https://api.spotify.com/v1/playlists/${playlistId}`)
            const { data, ...restAxios } = await client.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`)

            if (!data || !data.items) {
                return null
            }
            let songs = data.items.map((item) => {
                    return  new Music(item.track.name, item.track.artists?.map((artist) => artist.name).join(' '), item.track.duration_ms, item.track.album.images[1].url)   
            })
            let artists = data.items.map((item) => {
                return item.track.artists.map((artists) => artists.name)
            }).flat(1).filter(this.onlyUnique)

            return new PlaylistResponse(songs, new Filter(artists), responsePlaylist.data.name)
        } catch (error : any) {
            console.log(error)
            if(error?.response?.status == 401){
                await this.instance.UpdateToken();
                return await this.getSongs(playlistId)
            }
            return null;
        }
    }
}
export default Spotify