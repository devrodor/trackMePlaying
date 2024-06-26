import { ApiClient } from "../classes/ApiClient"; 
import { DataMapper} from "../classes/DataMapper";
import { ManageErrors } from "../classes/ManageErrors";

const root = document.getElementById('app');

/**
 * 
 * @param {Object} fields 
 * @param {Object} params 
 * @returns {Promise}
 */
export const getData = async (endpoint, fields) => {

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
        const showError = new ManageErrors(root,"Failed to get gamelist. Refresh or report");
        showError.printError();
        throw new Error(error);
    }
};
 