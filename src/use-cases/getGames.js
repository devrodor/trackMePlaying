import { ApiClient } from "../classes/ApiClient"; 
import { DataMapper} from "../classes/DataMapper";

/**
 * 
 * @param {Object} fields 
 * @param {Object} params 
 * @returns {Promise}
 */
export const getGames = async () => {

    const apiClient = new ApiClient();
    try {
        const accessToken = await apiClient.generateToken();
        if (!accessToken) {
            throw new Error('Unable to retrieve access token');
        }
        const games = await apiClient.getGames(
                accessToken, '/games', 
                { fields: 'fields name, summary, cover.url, artworks.url, screenshots.url, similar_games.name;' }, 
                { limit: 10 }
            );

        return games.map(DataMapper.mapGame);
   
    } catch (error) {
        console.error('Error:', error);
    }
};
 