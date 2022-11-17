//Code to insert data into mongodb

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
        "_id": 3001,
        "comfort-feature": "Blind Spot Monitoring"
    }, {
        "_id": 3002,
        "comfort-feature": "Premium Sound System"
    },
    {
        "_id": 3003,
        "comfort-feature": "Wireless Connectivity"
    },
    {
        "_id": 3004,
        "comfort-feature": "Digital Keys"
    },
    {
        "_id": 3005,
        "comfort-feature": "AI Bot Alexa Enabled"
    },
    {
        "_id": 3006,
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