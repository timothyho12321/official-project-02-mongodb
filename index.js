const express = require('express');
const cors = require('cors');


require('dotenv').config();
const MongoUtil = require('./MongoUtil');
const { ObjectId } = require('mongodb');


const MONGO_URI = process.env.MONGO_URI;

const app = express();


// IMPORT MIDDLEWARES AND VALIDATION
const validation = require('./Middlewares/validationMiddleWare');
const carPostSchema = require('./Validations/carPostValidation');

app.use(express.json());

app.use(cors());






async function main() {
    await MongoUtil.connect(MONGO_URI, "mongodb-official-proj-2-date-17-nov");


    app.get('/', function (req, res) {

        res.send("Basic test route is working")

    })

    /*--------------------------------------------- START OF GET -------------------------------------------*/

    // Search one car details by id
    app.get('/car/:car_id', async function (req, res) {


        try {
            let results = await MongoUtil.getDB().collection("car").find({

                "_id": ObjectId(req.params.car_id)
            }).toArray();


            let searchIDForEngine = results[0].engine_id
            // console.log(searchIDForEngine);

            let arrayOfEngineByCarSearch = await MongoUtil.getDB().collection("engine").find(
                { _id: ObjectId(searchIDForEngine) }


            ).toArray();
            // console.log(arrayOfEngineByCarSearch)


            results[0].engine_id = arrayOfEngineByCarSearch[0].engine_name



            //Make variable for comfort_features_id of car 
            let extractComfortFeaturesIDArray = results[0].comfort_features_id
            // console.log("variable",extractComfortFeaturesIDArray);

            //Create new array of comfort features name after searching
            let comfort_features_name = []

            for (let c of extractComfortFeaturesIDArray) {
                let oneComfortFeatureName = await MongoUtil.getDB().collection("comfort_features").find(
                    { _id: ObjectId(c) }).toArray()
                // console.log(oneComfortFeatureName)
                let extractComfortFeatureName = oneComfortFeatureName[0].comfort_feature
                //console.log(extractComfortFeatureName)
                comfort_features_name.push(extractComfortFeatureName)

            }

            results[0].comfort_features_id = comfort_features_name

            // ADD NEW KEY VALUE PAIR TO KEEP COMFORT FEATURES ID WHEN
            // CALL INFO FOR ONE CAR --> IN ORDER TO DO PUT FOR 
            // COMMENTS 

            let resultObject = results[0]
            resultObject['keep_comfort_features_id'] = extractComfortFeaturesIDArray






            // console.log(results);
            res.status(200);
            res.json(results);
        } catch (e) {
            console.log(e)
            res.status(500);
            res.json({
                "error": e
            })
        }


    }

    )


    app.get('/car', async function (req, res) {



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


        if (req.query.type) {
            // adding the 'description' key to the criteria object and assign req.query.description
            // as the value
            criteria['type'] = {
                "$regex": req.query.type,  // use regex expression search
                "$options": "i"  // ignore case
            }
        }

        if (req.query.year_of_launch) {
            // adding the 'description' key to the criteria object and assign req.query.description
            // as the value
            // console.log("This is query string seats ==> " , req.query.seats)
            criteria["year_of_launch"] = { "$gte": parseInt(req.query.year_of_launch) }


        }



        if (req.query.min_price && req.query.max_price) {
            criteria["$and"] =
                [
                    { "cost_price": { "$gte": parseInt(req.query.min_price) } },
                    { "cost_price": { "$lte": parseInt(req.query.max_price) } }
                ]
        }

        if (req.query.min_price && !req.query.max_price) {
            criteria["cost_price"] = { "$gte": parseInt(req.query.min_price) }
        }
        if (req.query.max_price && !req.query.min_price) {
            criteria["cost_price"] = { "$lte": parseInt(req.query.max_price) }

        }



        if (req.query.rating) {
            // adding the 'description' key to the criteria object and assign req.query.description
            // as the value
            // console.log("This is query string seats ==> " , req.query.seats)
            criteria["rating"] = { "$eq": parseInt(req.query.rating) }

            // criteria['seats'] = req.query.seats

        }

        console.log("CURRENT CRITERIA", criteria);







        let results = await MongoUtil.getDB().collection("car").find(criteria).toArray();
        console.log(results);


        // RENAME THE ENGINE ID SENT BACK AS RESULTS TO THE NAME OF THE ENGINE
        for (let eachcar of results) {

            let searchIDForEngine = eachcar.engine_id
            // console.log(searchIDForEngine);

            let arrayOfEngineByCarSearch = await MongoUtil.getDB().collection("engine").find(
                { _id: ObjectId(searchIDForEngine) }


            ).toArray();
            // console.log(arrayOfEngineByCarSearch);
            let nameOfEngineByCarSearch = arrayOfEngineByCarSearch[0].engine_name;
            // console.log(nameOfEngineByCarSearch);
            // SET THE RETURN OF THE ENGINE PERFORMANCEC TO NAME OF ENGINE

            eachcar.engine_id = nameOfEngineByCarSearch

        }

        // RENAME THE COMFORT FEATURES (CF) TAGS ID SENT BACK AS RESULTS TO THE NAME OF THE TAGS
        for (let eachcar of results) {

            // console.log("Step 0", eachcar);
            let searchIDForCFTags = eachcar.comfort_features_id
            // console.log("Step 1", searchIDForCFTags);
            //searchIDForTags is an array of comfort features tags

            let nameForCFTags = []
            for (let eachCF of searchIDForCFTags) {
                // console.log("Step 2", eachCF)
                let arrayOfCF = await MongoUtil.getDB().collection("comfort_features").find(
                    { _id: ObjectId(eachCF) }
                ).toArray();
                // console.log("Step 3", arrayOfCF)

                let selectFirstZero = arrayOfCF[0]
                // console.log("Step 4 [0]",selectFirstZero);

                let getNameFromEachCFArray = arrayOfCF[0].comfort_feature
                // console.log(getNameFromEachCFArray);

                nameForCFTags.push(getNameFromEachCFArray);
            }
            // console.log("Step 5", nameForCFTags);
            // SET THE RETURN OF THE COMFORT FEATURES TO ARRAY OF NAME OF COMFORT FEATURES
            eachcar.comfort_features_id = nameForCFTags

        }





        res.status(200);
        res.json(results);  // send the results back as JSON





    })


    ///////////////////////// GET ROUTE FOR CURRENTENGINESDB /////////////////////////////////////////


    app.get('/engine', async function (req, res) {

        try {
            let criteria = {}

            let results = await MongoUtil.getDB().collection("engine").find(criteria).toArray();
            console.log(results);
            res.status(200)
            res.json(results)
        }
        catch (e) {
            res.status(500);
            res.json(
                { "error": e }
            )
        }


    })

    ///////////////////////// GET ROUTE Search Engine by ID /////////////////////////////////////////

    app.get('/engine/:engine_id', async function (req, res) {

        let criteria = {}
        criteria["_id"] = ObjectId(req.params.engine_id)

        let results = await MongoUtil.getDB().collection("engine").find(criteria).toArray();
        console.log(results);

        res.json(results)

    })

    /*--------------------------------------------- START OF POST -------------------------------------------*/


    // POST A NEW CAR WITH NEW ENGINE 
    app.post('/newcarandengine', validation(carPostSchema), async function (req, res) {


        try {
            let name_of_model = req.body.name_of_model;
            let year_of_launch = req.body.year_of_launch;
            let brand = req.body.brand;
            let type = req.body.type;
            let seats = req.body.seats;
            // KEY INTO PARAMS AS OBJECT IN FRONT END FOR COLOR (NAME AND SHADE)
            let color = req.body.color;
            let land_terrain = req.body.land_terrain;
            let username = req.body.username;
            let email = req.body.email;
            let rating = req.body.rating;
            let description = req.body.description;
            let cost_price = req.body.cost_price;
            let image = req.body.image;

            let engine_name = req.body.engine_name
            // let top_speed = req.body.top_speed
            // let engine_power = req.body.engine_power
            // let oil_consumption = req.body.oil_consumption

            // Setting the tags of comfort feature in the body -
            // take in ID as the value, not name 
            let comfort_features_id = req.body.comfort_features_id

            // For comments, key as an empty array when first post is 
            //created
            let comments = [];


            if (!name_of_model || !year_of_launch) {
                // they don't end the route function
                res.status(400);
                res.json({
                    'error': 'Things must be filled in'
                })
                return; // explictly return because a route
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
            //     "cost_price": cost_price,

            //     "comments": comments,

            // }

            // INSERT NEW ENGINE FIRST THEN GET THE ID

            let engineNew = {
                "engine_name": engine_name,
                // "top_speed": top_speed,
                // "engine_power": engine_power,
                // "oil_consumption": oil_consumption

            }


            const db = MongoUtil.getDB();

            // create search whether engine type number already exists
            let haveEngine = null;

            let engineCheck = {}
            engineCheck["engine_name"] = {
                '$regex': req.body.engine_name,
                '$options': 'i'

            }

            haveEngine = await db.collection("engine").find(engineCheck).toArray()
            // console.log(haveEngine.length);


            // Create new engine if does not exists
            if (!haveEngine.length) {
                const resultEngine = await db.collection("engine").insertOne(engineNew);

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



            if (req.body.engine_name) {

                criteria['engine_name'] = {
                    "$regex": req.body.engine_name,
                    "$options": "i"
                }
            }

            // if (req.body.top_speed) {

            //     criteria['top_speed'] = req.body.top_speed
            // }
            // if (req.body.engine_power) {

            //     criteria['engine_power'] = req.body.engine_power
            // }
            // if (req.body.oil_consumption) {

            //     criteria['oil_consumption'] = req.body.oil_consumption
            // }



            let newEngineArray = await MongoUtil.getDB().collection("engine").find(criteria, {
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
                "cost_price": cost_price,
                "image": image,
                // add new engine ID to new car entry
                "engine_id": idNewEngine,

                // add array of comfort features id to new car entry
                "comfort_features_id": comfortFeaturesTags,

                // push into an array of comments
                // each comment is an object
                // "comments": comments
                "comments": comments
            }


            const result = await db.collection("car").insertOne(carNew);
            res.status(200);  // set the status to 200, meaning "OK"
            res.json(result);
        } catch (e) {
            console.log(e);
            res.status(500);
        }

    })


    /*--------------------------------------------- END OF POST -------------------------------------------*/

    /*--------------------------------------------- START OF PUT -------------------------------------------*/


    // UPDATE


    // ROUTE TO GET ALL POST FROM A USER FROM THEIR EMAIL 
    app.get("/getposts", async (req, res) => {
        let emailAccepted = false;

        //getEmail means there is an actual user with this email in Mongodb
        let getEmail = false;

        let criteria = {};

        // CHECK IF AN ACCEPTABLE FORMAT OF EMAIL IS KEYED IN
        if (req.query.email.includes("@") && req.query.email.includes(".")) {
            console.log("Email accepted")
            emailAccepted = true;

            let searchEmailCriteria = {};
            searchEmailCriteria["email"] = {
                "$regex": req.query.email,
                "$options": "i"
            }
            let resultEmailExist = await MongoUtil.getDB().collection("car").find(searchEmailCriteria).toArray();

            if (resultEmailExist.length) {


                getEmail = true
            }
        } else {
            res.send("Key in a proper email addresss.")
            return;
        }

        if (getEmail) {
            criteria["email"] = {
                "$regex": req.query.email,
                "$options": "i"
            }

            // result is all posts of the user identified by email keyed in
            let result = await MongoUtil.getDB().collection("car").find(criteria).toArray();


            // THINK ABOUT WHETHER WANT TO DISPLAY ENGINE AND COMFORT FEATURES IN ALL RESULTS 
            // console.log(result);
            res.status(200);
            res.send(result)

        } else {
            res.status(401)
            res.send("Such user email does not exist")
            return;

        }



    })




    // ROUTE TO GET DETAILS OF ONE POST FROM A USER BY the POST ID  

    app.get('/car/comfort-feature-id-to-edit/:id', async function (req, res) {

        // to build a search engine, we an empty criteria object (that means we want all the documents)


        let result = await MongoUtil.getDB().collection("car").find({
            "_id": ObjectId(req.params.id)

        }).toArray();
        console.log(result);

        // CONSIDER REFACTORING INTO FUNCTION 
        for (let eachcar of result) {

            let searchIDForEngine = eachcar.engine_id
            // console.log(searchIDForEngine);

            let arrayOfEngineByCarSearch = await MongoUtil.getDB().collection("engine").find(
                { _id: ObjectId(searchIDForEngine) }


            ).toArray();
            // console.log(arrayOfEngineByCarSearch);
            let nameOfEngineByCarSearch = arrayOfEngineByCarSearch[0].engine_name;
            // console.log(nameOfEngineByCarSearch);
            // SET THE RETURN OF THE ENGINE PERFORMANCEC TO NAME OF ENGINE

            eachcar.engine_id = nameOfEngineByCarSearch

        }


        // KEEP AS ID - FRONT END INPUT AS ID COMFORT FEATURES FOR EDIT 
        // DELETE 

        // for (let eachcar of result) {

        //     let searchIDForCFTags = eachcar.comfort_features_id
        //     console.log(searchIDForCFTags);
        //     searchIDForTags is an array of comfort features tags

        //     let nameForCFTags = []
        //     for (let eachCF of searchIDForCFTags) {
        //         let arrayOfCF = await MongoUtil.getDB().collection("comfort_features").find(
        //             { _id: ObjectId(eachCF) }


        //         ).toArray();
        //         console.log("Each CF Search", arrayOfCF)

        //         let getNameFromEachCFArray = arrayOfCF[0].comfort_feature
        //         console.log(getNameFromEachCFArray);

        //         nameForCFTags.push(getNameFromEachCFArray);
        //     }
        //     console.log(nameForCFTags);
        //     SET THE RETURN OF THE COMFORT FEATURES TO ARRAY OF NAME OF COMFORT FEATURES
        //     eachcar.comfort_features_id = nameForCFTags

        // }



        res.send(result);

    }

    )


    app.put('/car/:car_id', validation(carPostSchema), async function (req, res) {
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
            let cost_price = req.body.cost_price;
            let image = req.body.image;

            let engine_name = req.body.engine_name
            // let top_speed = req.body.top_speed
            // let engine_power = req.body.engine_power
            // let oil_consumption = req.body.oil_consumption

            // Setting the tags of comfort feature in the body -
            // take in ID as the value, not name 
            let comfort_features_id = req.body.comfort_features_id


            // For comments, key as object in Front End
            let comments = req.body.comments;



            let engineNew = {
                "engine_name": engine_name,
                // "top_speed": top_speed,
                // "engine_power": engine_power,
                // "oil_consumption": oil_consumption

            }


            const db = MongoUtil.getDB();

            // create search whether engine type number already exists
            let haveEngine = null;

            let engineCheck = {}
            engineCheck["engine_name"] = {
                '$regex': req.body.engine_name,
                '$options': 'i'

            }

            haveEngine = await db.collection("engine").find(engineCheck).toArray()
            // console.log(haveEngine.length);


            // Create new engine if does not exists
            if (!haveEngine.length) {
                const resultEngine = await db.collection("engine").insertOne(engineNew);

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



            if (req.body.engine_name) {

                criteria['engine_name'] = {
                    "$regex": req.body.engine_name,
                    "$options": "i"
                }
            }

            // if (req.body.top_speed) {

            //     criteria['top_speed'] = req.body.top_speed
            // }
            // if (req.body.engine_power) {

            //     criteria['engine_power'] = req.body.engine_power
            // }
            // if (req.body.oil_consumption) {

            //     criteria['oil_consumption'] = req.body.oil_consumption
            // }



            let newEngineArray = await MongoUtil.getDB().collection("engine").find(criteria, {
                // PROJECTION 
                '_id': 1
            }).toArray();

            const idNewEngine = newEngineArray[0]._id

            // convert Engine ID to string 
            let engineIdToString = idNewEngine.toString();




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
                "cost_price": cost_price,
                "image": image,
                // add new engine ID to new car entry
                "engine_id": engineIdToString,

                // add array of comfort features id to new car entry
                "comfort_features_id": comfort_features_id


            }

            console.log("Checking content comments", comments)

            let result = await MongoUtil.getDB().collection('car')
                .updateOne({
                    "_id": ObjectId(req.params.car_id)
                }, {
                    '$set': modifiedDocument
                });


            result = await MongoUtil.getDB().collection('car')
                .updateOne({
                    "_id": ObjectId(req.params.car_id)
                }, {
                    '$push': { "comments": comments }
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


    /*--------------------------------------------- END OF PUT ------------------------------------------------*/

    /*--------------------------------------------- START OF DELETE -------------------------------------------*/

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

    /////////////////// DELETE COMMENT/////////////////////////////////
    app.put('/delete-comment/:car_id', async function (req, res) {
        try {

            await MongoUtil.getDB().collection('car').updateOne({
                "comments.email": req.body.email
            }, {
                "$pull": {
                    comments: { "email": req.body.email }
                }
            }

            )

            res.status(200)
            res.json({ "message": "Succesfully deleted comment." })

        } catch (e) {
            res.status(500)
            res.json({
                "error": e
            })
            console.log(e)

        }

    })
   

}

main();

app.listen(process.env.PORT||3080, function () {
    console.log("Server has started!")

})