const { Food } = require('../../models')
const getFoodByQuery = async (req,  res) => {
    try {
        console.log(req.params.title)
        const title = req.params.title
        // const data = await Foods.find({ title } ) ;
         const data =  await Food.find({ title:RegExp(title) });
    return data
    
    } catch (err) {
        console.error('no food was found with that name:', err);
       
    }
};
    
module.exports = getFoodByQuery;