

class SearchData {
 
    constructor() {  

            this.userObj = {
                lastSearchTerm: null,
                platform: null,
                limit: 30,
                offset: 0,
                resulTerms: null 
            }; 
    }

    initState(data) {

        this.userObj.resulTerms = data; 
        console.log(this.userObj);

    }

    getUserData() {

        this.userObj;
        console.log(this.userObj);
    }
      
    setUserData(prop,value) { 

        this.userObj[prop] = value;
        console.log(this.userObj); 

    } 

}

export default SearchData;