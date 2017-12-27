// Users
db = db.getSiblingDB('auth');
db.createCollection('users')
db.users.insertMany([{
        email: "zhe3145@yandex.ru",
        name: "Evgeniy",
        surname: "Morozov",
        password: "14881488"
    }, {
        email: "example@example.com",
        name: "Example",
        surname: "User",
        password: "example_user"
    }
])
db.createCollection('tokens')

var userId1 = db.users.findOne({email: 'zhe3145@yandex.ru'}, {_id: 1})._id
var userId2 = db.users.findOne({email: 'example@example.com'}, {_id: 1})._id

// Stuff for flats microservice
db = db.getSiblingDB('flats');
db.createCollection('flats')
db.flats.insertMany([{
        square: 120,
        type:   'private',
        address: {
            city:   'Voronezh',
            street: 'Moskovsiy prospekt',
            building: '32A',
            apartment: 14
        },
        owner: userId1
    }, {
        square: 120,
        type:   'office',
        address: {
            city:   'Voronezh',
            street: 'Volgogradskaya',
            building: '8',
            apartment: 135
        },
        owner: userId2
    }, {
        square: 120,
        type:   'office',
        address: {
            city:   'Voronezh',
            street: 'Svobody',
            building: '69A',
            apartment: 50
        },
        owner: userId2
    },
])

db = db.getSiblingDB('measurements')
db.createCollection('measurements')
db.measurements.insertMany([
    {
        type: 'water',
        value: 14881488,
        createdAt: new Date(),
        ownerId: userId1
    },
    {
        type: 'electricity',
        value: 1231123,
        createdAt: new Date(),
        ownerId: userId2
    }
])
