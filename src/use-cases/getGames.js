import { ApiClient } from "../classes/ApiClient"; 
import { DataMapper} from "../classes/DataMapper";
import { ManageErrors } from "../classes/ManageErrors";

/**
 * 
 * @param {Object} fields 
 * @param {Object} params 
 * @returns {Promise}
 */
export const getGames = async (endpoint, fields) => {

    const apiClient = new ApiClient();
    try {
        const accessToken = await apiClient.generateToken();
        if (!accessToken) {
            throw new Error('Unable to generate access token');
        }
        const games = await apiClient.apiConn(
                accessToken,
                endpoint,
                fields
            );

        return games.map(DataMapper.mapGame);
   
    } catch (error) {
 
        throw new Error('Connection error');
    }
};
 