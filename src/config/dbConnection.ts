const db = require("mongoose")

function mongoConn()
{
    db.connect('mongodb+srv://akanksha315:Ak%40nkshaisthebest@akanksha.mis3acq.mongodb.net/Ecommerce', { useNewUrlParser: true, useUnifiedTopology: true,
     })
  .then(() => console.log('Connected to MongoDB-----------'))
  .catch((err:any) => console.error('Error connecting to MongoDB', err));
}

module.exports ={mongoConn}