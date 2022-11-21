const express = require('express');
const cors = require('cors');


require('dotenv').config();
const MongoUtil = require('./MongoUtil');
const { ObjectId } = require('mongodb');


const MONGO_URI = process.env.MONGO_URI;


const app = express();


app.use(express.json());

app.use(cors());




async function main() {
    await MongoUtil.connect(MONGO_URI, "mongodb-official-proj-2-date-17-nov");


    app.get('/', function (req, res) {

        res.send("This is working yippee")
        console.log("Warabi")
    })


    // EDIT THIS CONTINUE MONGO EXPRESS RESTFUL API
    app.get('/car', async function (req, res) {

        console.log(req.query);
        console.log("bunny");

        // query string are retrieved using req.query
        // console.log(req.query);

        // to build a search engine, we an empty criteria object (that means we want all the documents)
        let criteria = {};

        // if the user specifies to search by description, then we add the description to the criteria
        if (req.query.brand) {
            // adding the 'description' key to the criteria object and assign req.query.description
            // as the value
            criteria['brand'] = {
                "$regex": req.query.brand,  // use regex expression search
                "$options": "i"  // ignore case
            }
        }

        // if (req.query.food) {
        //     criteria['food'] = {
        //         "$in": [req.query.food]
        //     }
        // }

        console.log(criteria);

        let results = await MongoUtil.getDB().collection("car").find(criteria).toArray();
        console.log(results);
        res.status(200);
        res.json(results);  // send the results back as JSON

    })



    // POST FIRST GENERIC ATTEMPT 

    app.post('/car', async function (req, res) {

        try {
            let name_of_model = req.body.name_of_model;
            let year_of_launch = req.body.year_of_launch;
            let brand = req.body.brand;
            let type = req.body.type;
            let seats = req.body.seats;
            let color = req.body.color;
            let land_terrain = req.body.land_terrain;
            let username = req.body.username;
            let email = req.body.email;
            let rating = req.body.rating;
            let description = req.body.description;
            let still_in_production = req.body.still_in_production;
            let cost_price = req.body.cost_price;

            // TO FILL IN SOME MORE

            // handle cases where description or food is falsely
            if (!name_of_model || !year_of_launch) {
                // they don't end the route function
                res.status(400);
                res.json({
                    'error': 'Things must be filled in'
                })
                return; // we must explictly return because a route
                // can perform res.json, res.render or res.send once
            }


            let carNew = {
                "name_of_model": name_of_model,
                "year_of_launch": year_of_launch,
                "brand": brand,
                "type": type,
                "seats": seats,
                "color": color,
                "land_terrain": land_terrain,
                "username": username,
                "email": email,
                "rating": rating,
                "description": description,
                "still_in_production": still_in_production,
                "cost_price": cost_price

            }

            const db = MongoUtil.getDB();
            const result = await db.collection("car").insertOne(carNew);
            res.status(200);  // set the status to 200, meaning "OK"
            res.send(result);
        } catch (e) {
            console.log(e);
            res.status(500);
        }

    })


    // POST A NEW CAR WITH NEW ENGINE ATTEMPT
    app.post('/newcarandengine', async function (req, res) {

        try {
            let name_of_model = req.body.name_of_model;
            let year_of_launch = req.body.year_of_launch;
            let brand = req.body.brand;
            let type = req.body.type;
            let seats = req.body.seats;
            let color = req.body.color;
            let land_terrain = req.body.land_terrain;
            let username = req.body.username;
            let email = req.body.email;
            let rating = req.body.rating;
            let description = req.body.description;
            let still_in_production = req.body.still_in_production;
            let cost_price = req.body.cost_price;



            let engine_type_number = req.body.engine_type_number
            let top_speed = req.body.top_speed
            let engine_power = req.body.engine_power
            let oil_consumption = req.body.oil_consumption

            // Setting the tags of comfort feature in the body -
            // take in ID as the value, not name 
            let comfort_features_id = req.body.comfort_features


            // handle cases where description or food is falsely
            if (!name_of_model || !year_of_launch) {
                // they don't end the route function
                res.status(400);
                res.json({
                    'error': 'Things must be filled in'
                })
                return; // we must explictly return because a route
                // can perform res.json, res.render or res.send once
            }

            // INSERTED BODY VALUES PUT DO NOT ADD THE LAST THREE 
            // {
            //     "name_of_model": name_of_model,
            //     "year_of_launch": year_of_launch,
            //     "brand": brand,
            //     "type": type,
            //     "seats": seats,
            //     "color": color,
            //     "land_terrain": land_terrain,
            //     "username": username,
            //     "email": email,
            //     "rating": rating,
            //     "description": description,
            //     "still_in_production": still_in_production,
            //     "cost_price": cost_price,

            //     "top_speed": top_speed,
            //     "engine_power": engine_power,
            //     "oil_consumption": oil_consumption

            // }

            // INSERT NEW ENGINE FIRST THEN GET THE ID

            let engineNew = {
                "engine_type_number": engine_type_number,
                "top_speed": top_speed,
                "engine_power": engine_power,
                "oil_consumption": oil_consumption

            }


            const db = MongoUtil.getDB();

            // create search whether engine type number already exists
            let haveEngine = null;

            let engineCheck = {}
            engineCheck["engine_type_number"] = {
                '$regex': req.body.engine_type_number,
                '$options': 'i'

            }

            haveEngine = await db.collection("engine_performance").find(engineCheck).toArray()
            // console.log(haveEngine.length);


            // Create new engine if does not exists
            if (!haveEngine.length) {
                const resultEngine = await db.collection("engine_performance").insertOne(engineNew);

            }




            // FIND ID OF NEW ENGINE
            let criteria = {};

            // add to criteria if have matching string 
            // if (req.body.top_speed) {

            //     criteria['top_speed'] = {
            //         "$regex": req.body.top_speed,  
            //         "$options": "i"  
            //     }
            // }



            if (req.body.engine_type_number) {

                criteria['engine_type_number'] = {
                    "$regex": req.body.engine_type_number,
                    "$options": "i"
                }
            }

            if (req.body.top_speed) {

                criteria['top_speed'] = req.body.top_speed
            }
            if (req.body.engine_power) {

                criteria['engine_power'] = req.body.engine_power
            }
            if (req.body.oil_consumption) {

                criteria['oil_consumption'] = req.body.oil_consumption
            }



            let newEngineArray = await MongoUtil.getDB().collection("engine_performance").find(criteria, {
                // PROJECTION 
                '_id': 1
            }).toArray();

            const idNewEngine = newEngineArray[0]._id


            // Pushing the comfort features id into an array to 
            // include in the new car entity


            // CODE THE VALUE OF CHECKBOX FOR COMFORTFEATURE AS THE 
            // OBJECTID IN MONGODB
            // FOR RECORD
            // ObjectId('637b79c39b9228988ebddfdd') - "Blind Spot Monitoring"
            // ObjectId('637b79c39b9228988ebddfde') - "Premium Sound System"
            // ObjectId('637b79c39b9228988ebddfdf') - "Wireless Connectivity"
            // ObjectId('637b79c39b9228988ebddfe0') - "Digital Keys"
            // ObjectId('637b79c39b9228988ebddfe1') - "AI Bot Alexa Enabled"
            // ObjectId('637b79c39b9228988ebddfe2') - "Ventilated Seats"

            let comfortFeaturesObjectIDArray = []


            for (let tag of comfort_features_id) {
                comfortFeaturesObjectIDArray.push(ObjectId(tag))
            }

            let comfortFeaturesTags = comfortFeaturesObjectIDArray





            let carNew = {
                "name_of_model": name_of_model,
                "year_of_launch": year_of_launch,
                "brand": brand,
                "type": type,
                "seats": seats,
                "color": color,
                "land_terrain": land_terrain,
                "username": username,
                "email": email,
                "rating": rating,
                "description": description,
                "still_in_production": still_in_production,
                "cost_price": cost_price,

                // add new engine ID to new car entry
                "engine_performance_id": idNewEngine,

                // add array of comfort features id to new car entry
                "comfort_features_id": comfortFeaturesTags
            }


            const result = await db.collection("car").insertOne(carNew);
            res.status(200);  // set the status to 200, meaning "OK"
            res.send(result);
        } catch (e) {
            console.log(e);
            res.status(500);
        }

    })


    // UPDATE

    app.put('/car/:car_id', async function (req, res) {
        try {

            let name_of_model = req.body.name_of_model;
            let year_of_launch = req.body.year_of_launch;
            let brand = req.body.brand;
            let type = req.body.type;
            let seats = req.body.seats;
            let color = req.body.color;
            let land_terrain = req.body.land_terrain;
            let username = req.body.username;
            let email = req.body.email;
            let rating = req.body.rating;
            let description = req.body.description;
            let still_in_production = req.body.still_in_production;
            let cost_price = req.body.cost_price;

            let engine_type_number = req.body.engine_type_number
            let top_speed = req.body.top_speed
            let engine_power = req.body.engine_power
            let oil_consumption = req.body.oil_consumption

            // Setting the tags of comfort feature in the body -
            // take in ID as the value, not name 
            let comfort_features_id = req.body.comfort_features


            let engineNew = {
                "engine_type_number": engine_type_number,
                "top_speed": top_speed,
                "engine_power": engine_power,
                "oil_consumption": oil_consumption

            }


            const db = MongoUtil.getDB();

            // create search whether engine type number already exists
            let haveEngine = null;

            let engineCheck = {}
            engineCheck["engine_type_number"] = {
                '$regex': req.body.engine_type_number,
                '$options': 'i'

            }

            haveEngine = await db.collection("engine_performance").find(engineCheck).toArray()
            // console.log(haveEngine.length);


            // Create new engine if does not exists
            if (!haveEngine.length) {
                const resultEngine = await db.collection("engine_performance").insertOne(engineNew);

            }




            // FIND ID OF NEW ENGINE
            let criteria = {};

            // add to criteria if have matching string 
            // if (req.body.top_speed) {

            //     criteria['top_speed'] = {
            //         "$regex": req.body.top_speed,  
            //         "$options": "i"  
            //     }
            // }



            if (req.body.engine_type_number) {

                criteria['engine_type_number'] = {
                    "$regex": req.body.engine_type_number,
                    "$options": "i"
                }
            }

            if (req.body.top_speed) {

                criteria['top_speed'] = req.body.top_speed
            }
            if (req.body.engine_power) {

                criteria['engine_power'] = req.body.engine_power
            }
            if (req.body.oil_consumption) {

                criteria['oil_consumption'] = req.body.oil_consumption
            }



            let newEngineArray = await MongoUtil.getDB().collection("engine_performance").find(criteria, {
                // PROJECTION 
                '_id': 1
            }).toArray();

            const idNewEngine = newEngineArray[0]._id

            // convert Engine ID to string 
            let engineIdToString = idNewEngine.toString();

            // STOP HERE LINK THE OBJECT ID AS REFERENCE FOR THE NEW CAR
            // CONTINUE HERE TONIGHT


            let modifiedDocument = {

                "name_of_model": name_of_model,
                "year_of_launch": year_of_launch,
                "brand": brand,
                "type": type,
                "seats": seats,
                "color": color,
                "land_terrain": land_terrain,
                "username": username,
                "email": email,
                "rating": rating,
                "description": description,
                "still_in_production": still_in_production,
                "cost_price": cost_price,

                // add new engine ID to new car entry
                "engine_performance_id": engineIdToString,

                // add array of comfort features id to new car entry
                "comfort_features_id": comfort_features_id


            }

            const result = await MongoUtil.getDB().collection('car')
                .updateOne({
                    "_id": ObjectId(req.params.car_id)
                }, {
                    '$set': modifiedDocument
                });

            res.status(200);
            res.json({
                'message': 'Update success'
            });

        } catch (e) {
            res.status(500);
            res.send(e);
            console.log(e);

        }
    })

    // DELETE

    app.delete('/car/:car_id', async function (req, res) {
        try {
            await MongoUtil.getDB().collection('car').deleteOne({
                "_id": ObjectId(req.params.car_id)
            })

            res.status(200);
            res.json({
                'message': "Car has been deleted"
            })

        } catch (e) {
            res.status(500);
            res.json({
                "error": e
            });
            console.log(e);
        }
    })





}

main();

app.listen(3000, function () {
    console.log("Server has started!")

})