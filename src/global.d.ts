interface iDatabase {
    playlists: iPlaylist
}

type iPlaylist = Record<string, string[]> 