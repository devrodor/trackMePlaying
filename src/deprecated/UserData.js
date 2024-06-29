

class UserData {
 
    constructor() { 

        this.uSearch = 'searchLog';

        //creates userObj and inserts it into localStorage
        const loadedData = localStorage.getItem(this.uSearch);

        if(loadedData === null) {

            this.userObj = {
                lastSearchTerm: null,
                platform: null,
                limit: 30,
                offset: 0,
                resulTerms: null 
            };
            
            localStorage.setItem(this.uSearch, JSON.stringify(this.userObj));
            
        }

    }

    initState(data) {
 
        const userLog = JSON.parse(localStorage.getItem(this.uSearch));
        userLog.resulTerms = data;
        localStorage.setItem(this.uSearch, JSON.stringify(userLog));

    }

    getUserData() {

        const userData = {};
        const userLog = JSON.parse(localStorage.getItem(this.uSearch));
 
        userData.lastSearchTerm = userLog.lastSearchTerm;
        userData.platform = eval(userLog.platform);
        userData.limit = userLog.limit;
        userData.offset = userLog.offset;
        userData.resulTerms = userLog.resulTerms;

        return userData;
    }
     

    setUserData(prop,value) {
         
        const userLog = JSON.parse(localStorage.getItem(this.uSearch));

        userLog[prop] = value;

        localStorage.setItem(this.uSearch, JSON.stringify(userLog));

    }




}

export default UserData;