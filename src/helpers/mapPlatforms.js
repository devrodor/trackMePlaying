export const mapPlatforms = (objs) => {

    let platforms = [];

    objs.forEach(element => {

        console.log(element);

        if(element.status !== false) {
          
            switch(element.name) {

                case 'xbox':
                    platforms.push(11);
                    break;
                case 'psn':
                    platforms.push(48);
                    break; 
                case 'nintendo':
                    platforms.push(1);
                    break;

            }    


        }

    });

    console.log(platforms);

    return platforms;
}