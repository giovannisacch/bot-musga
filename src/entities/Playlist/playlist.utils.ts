import { PlaylistType } from "."

function getPlaylistType(playlistValue: string): PlaylistType | undefined {
    if (playlistValue.includes("spotify.com")) {
        return "SPOTIFY"
    }

    return undefined;
}