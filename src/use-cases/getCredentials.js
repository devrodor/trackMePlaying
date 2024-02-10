
import { ApiClient } from "../classes/ApiClient";

export const getCredentials = () => {

    const api = new ApiClient();
    return api.generateToken()
              .then((data) => console.log(data));
         

}