import ApiUtils from "../utils/ApiUtils.js";

export default class PlaylistService {
    static async createPlaylist(nom, id_utilisateur) {
        return ApiUtils.post('/playlists', {nom: nom, id_utilisateur: id_utilisateur})
    }
    static async getPlaylistById(id) {
        return ApiUtils.get('/playlists/'+id)
    }
    static async getMine() {
        return ApiUtils.get('/playlists/mine')
    }
    static async addSongToPlaylist(playlistId, song) {
        return ApiUtils.post('/playlists/' + playlistId + '/add-musiques', {musiques: [song.id]})
    }
    static async removeSongToPlaylist(playlistId, song) {
        return ApiUtils.post('/playlists/' + playlistId + '/remove-musiques', {musiques: [song.id]})
    }
}