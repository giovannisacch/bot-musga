export class PlaylistResponse{
    songs :  Music[]
    filters: Filter
    name : string
    
    constructor(songs : Music[], filters : Filter, name : string) {
        this.songs = songs;
        this.filters = filters;
        this.name = name;
    }
}

export class Filter{
    artists: string[]

    constructor(artists : string[]) {
        this.artists = artists;
    }
}

export class Music{
    name : string
    artists : string
    duration : number
    pictureUrl : string
    constructor(name : string, artists : string, duration : number, pictureUrl : string) {
        this.name = name;
        this.artists = artists;
        this.duration = duration;
        this.pictureUrl = pictureUrl;
    }
}
