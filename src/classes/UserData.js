

export class UserData {

    constructor(){
        
        //loads userDataObject
        this.loadUserData = localStorage.getItem('trackUserPrefs'); 

        if(this.loadUserData === null) {
            const userObj = {
                lastSearchTerm: null,
            }
            localStorage.setItem('trackUserPrefs', JSON.stringify(userObj));
        }

        return this.loadUserData;
    
    }

    setUserData(data) {
        
        const updatedPrefs = { ...data };
        localStorage.setItem('trackUserPrefs', JSON.stringify(updatedPrefs));
        
    }

    #getUserData() {

    }


}

export default UserData;