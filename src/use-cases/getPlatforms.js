 
export const getPlatforms = async(limit,offset) => {
 
    return await getData('/platforms', 
        { fields: `fields name; limit ${limit}; offset ${offset};` }) 
        .then( (platforms) => platforms );

   
}
 