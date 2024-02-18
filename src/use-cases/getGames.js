import { ApiClient } from "../classes/ApiClient"; 
import { DataMapper} from "../classes/DataMapper";

/**
 * 
 * @param {Object} fields 
 * @param {Object} params 
 * @returns {Promise}
 */
export const getGames = async ( endpoint, fields, limit ) => {

    const apiClient = new ApiClient();
    try {
        const accessToken = await apiClient.generateToken();
        if (!accessToken) {
            throw new Error('Unable to retrieve access token');
        }
        const games = await apiClient.apiConn(
                accessToken,
                endpoint,
                fields,
                limit
            );

        return games.map(DataMapper.mapGame);
   
    } catch (error) {
        console.error('Error:', error);
    }
};
 