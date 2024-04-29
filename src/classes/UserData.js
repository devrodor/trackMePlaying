

class UserData {
 
    constructor() { 

        //creates userObj and inserts it into localStorage
        const loadedData = localStorage.getItem('trackUserPrefs');

        if(loadedData === null) {

            this.userObj = {
                lastSearchTerm: null,
                limit: 30,
                offset: 0,
                resulTerms: null 
            };
            
            localStorage.setItem('trackUserPrefs', JSON.stringify(this.userObj));
            
        }

    }

    initState(data) {

        const userData = {};
        const userLog = JSON.parse(localStorage.getItem('trackUserPrefs'));
        

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