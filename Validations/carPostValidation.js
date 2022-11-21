const yup = require('yup')


const carPostSchema = yup.object({

brand: yup.string().required(),
email: yup.string().email().required()

})



module.exports = carPostSchema