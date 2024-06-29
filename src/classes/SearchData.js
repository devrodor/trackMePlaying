

class SearchData {
 
    constructor() {  

        if(!this.userObj) {
          
            this.userObj = {
                lastSearchTerm: null,
                platform: null,
                limit: 30,
                offset: 0,
                resulTerms: null 
            }; 
        }
 
    }

    initState(data) {

        this.userObj.resulTerms = data; 

    }

    getUserData() {

        this.userObj;
    }
      
    setUserData(prop,value) { 

        this.userObj[prop] = value;

    } 

}

export default SearchData;