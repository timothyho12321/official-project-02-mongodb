const yup = require('yup')


const carPostSchema = yup.object({


name_of_model: yup.string().required(),
year_of_launch: yup.number().required(),
brand: yup.string().required(),
type: yup.string().required(),
seats: yup.number().required(),
color: yup.object().required(),
land_terrain: yup.string().required(),
username: yup.string().min(5).required(),
email: yup.string().email().required(),
rating: yup.number().min(1, "Minimum is 1 star").max(5, "Maximum is 5 star").required(),
description: yup.string().required(),
cost_price: yup.number().required(),

engine_name: yup.string().required(),
// top_speed: yup.number().required(),
// engine_power: yup.number().required(),
// oil_consumption: yup.number().required(),
comfort_features_id:  yup.array().required()
})



module.exports = carPostSchema