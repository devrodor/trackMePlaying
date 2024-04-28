

class UserData {

    //todo: fix user object, saves values bad
    //todo: fix searchTerm
    constructor(userData) { 
        const loadedData = localStorage.getItem('trackUserPrefs');

        if (loadedData !== null) { 
            this.userObj = JSON.parse(loadedData);
        } else {
            
            this.userObj = {
                lastSearchTerm: null,
                limit: 30,
                offset: 0,
                resulTerms: userData // Asumiendo que quieres iniciar con userData si no hay datos previos
            };
            localStorage.setItem('trackUserPrefs', JSON.stringify(this.userObj));
        } 
    }

    getUserData() {

        const userData = {};
        const userLog = JSON.parse(localStorage.getItem('trackUserPrefs'));

        userData.lastSearchElement = userLog.lastSearchElement;
        userData.limit = userLog.limit;
        userData.offset = userLog.offset;
        userData.resulTerms = userLog.resulTerms;

        return userData;
    }
     

    setUserData(prop,value) {
         
        const userLog = JSON.parse(localStorage.getItem('trackUserPrefs'));
        
        userLog[prop] = value;
        localStorage.setItem('trackUserPrefs', JSON.stringify(userLog));

    }




}

export default UserData;