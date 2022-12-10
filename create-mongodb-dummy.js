//Code to insert data into mongodb

db.car.insertOne({

    {
        "name_of_model": "Altitude 01",
        "year_of_launch": 2019,
        "brand": "Lexus",
        "type": "SUV",
        "seats": 6,
        "color": {
          "name": "Silver",
          "shade": "Matte"
        },
        "land_terrain": "smooth road",
        "username": "Timothy",
        "email": "timothyho2@gmail.com",
        "rating": 5,
        "description": "Smooth sleek car",
        "cost_price": 80000,
        "image": "https://assets.autobuzz.my/wp-content/uploads/2017/12/04173713/2017-Lexus-RX-L-Unveiled-in-LA-15.jpg",
        "engine_name": "A1",
        "comfort_features_id": [
          "637b79c39b9228988ebddfe1"
        ],
        "comments": {
              "username": "Aim",
              "email": "Aim@gmail.com",
              "other_comment": "Aim say Great post. I will buy this car."
            }
       
      }
})

db.car.insertOne({

    "name_of_model": "Vios 8",
    "year_of_launch": 2006,
    "brand": "Toyota",
    "type": "SUV",
    "seats": 4,
    "color": "black",
    "land_terrain": "urban road",
    "username": "Timothy Ho",
    "email": "timothy@gmail.com",
    "rating": 4,
    "description": "My favourite car to drive the family around",
    "still_in_production": true,
    "cost_price": 50000,
    "reviews": [
        {
            "id": 4001,
            "other_users_reviews": "Great post. I will buy this car."
        },
        {
            "id": 4002,
            "other_users_reviews": "Best review article. I agree."
        }
    ],
    "engine_performance_id": 2001,
    "comfort_features_id": [
        3001,
        3003,
        3004
    ]
})

db.car.insertOne({

    "name_of_model": "Vios 9",
    "year_of_launch": 2006,
    "brand": "Toyota",
    "type": "SUV",
    "seats": 4,
    "color": "black",
    "land_terrain": "urban road",
    "username": "Timothy Ho",
    "email": "timothy@gmail.com",
    "rating": 4,
    "description": "My favourite car to drive the family around",
    "still_in_production": true,
    "cost_price": 50000,
    "reviews": [
        {
            "id": 4001,
            "other_users_reviews": "Great post. I will buy this car."
        },
        {
            "id": 4002,
            "other_users_reviews": "Best review article. I agree."
        }
    ],
    "engine_performance_id": 2001,
    "comfort_features_id": [
        3001,
        3003,
        3004
    ]
})



//RETHINK THE CAR NAMES LATER
db.car.insertOne({
    // "_id": 1001,
    "name-of-model": "X Class",
    "year-of-launch": 2010,
    "brand": "Mercedes",
    "seats": 4,
    "color": "silver",
    "land-terrain": "urban road",
    "username": "Timothy Ho",
    "email": "timothy@gmail.com",
    "rating": 5,
    "description": "Safe and reliable",
    "still-in-production": true,
    "cost-price": 90000,
    "engine_performance_id": 2001,
    "comfort-features_id": [
        3001,
        3002,
        3003,
        3004,
        3005,
        3006
    ],
    "type_id": 4001,
    "reviews_id": 5001
})

db.engine_performance.insertOne({

    "top_speed": "80kmh",
    "engine_power": "230kwH",
    "oil_consumption": "2l/H"

})

db.engine_performance.find({
    _id: 2001
})

db.car.insertOne({
    "_id": 1001,
    "name-of-model": "Vios 7",
    "year-of-launch": 2006,
    "brand": "Toyota",
    "seats": 4,
    "color": "black",
    "land-terrain": "urban road",
    "username": "Timothy Ho",
    "email": "timothy@gmail.com",
    "rating": 4,
    "description": "My favourite car to drive the family around",
    "still-in-production": true,
    "cost-price": 50000,
    "engine_performance_id": 2001,
    "comfort-features_id": [
        3001,
        3002,
        3003,
        3004,
        3005,
        3006
    ],
    "type_id": 4001,
    "reviews_id": 5001
})


db.comfort_features.insertMany(
    [{
        "comfort-feature": "Blind Spot Monitoring"
    }, {
        "comfort-feature": "Premium Sound System"
    },
    {

        "comfort-feature": "Wireless Connectivity"
    },
    {

        "comfort-feature": "Digital Keys"
    },
    {

        "comfort-feature": "AI Bot Alexa Enabled"
    },
    {

        "comfort-feature": "Ventilated Seats"
    }]

)


db.engine_performance.insertOne(
    {
        "_id": 2001,
        "top-speed": "90kmh",
        "engine-power": "80kwH",
        "oil-consumption": "1l/H"
    }

)


db.type.insertOne(
    {
        "id": 4001,
        "car-type": "SUV",
        "size": "1200CC"
    }
)


//  CODE TO DELETE FROM DATABASE

db.engine_performance.deleteOne(
    {
        "_id": ObjectId("637611ca667009f8d61ac8ae"),

    }

)


db.car.deleteOne(
    {
        "_id": 1001

    }

)


db.car.deleteOne(
    {
        "name-of-model": "Vios 7"

    }

)


// show databases
// ```

// use sample_airbnb
// ```

// ```
// show collections


//rename collection

db.rrecord.renameCollection("record")
db.engine_performance.renameCollection("engine")