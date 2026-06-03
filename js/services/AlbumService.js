import ApiUtils from "../utils/ApiUtils.js";

export default class AlbumService {
    static async getAlbumById(id) {
        return ApiUtils.get('/albums/' + id)
    }
}