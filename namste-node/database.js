
const {MongoClient} = require ("mongodb");

const url = "mongodb+srv://namastedev:Rciup3egOoPplVc4@namastenode.goq08ma.mongodb.net/"
 
const client = new MongoClient(url);

const dbName = 'helloworld';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('user');

//   const data = {

//         firstname: "amit",
//         lastname: "kumar",
//         city: "mumbai",
//         phonenumber: "9873104121",
//   }

//   const insertResult = await collection.insertMany([data]);
// console.log('Inserted documents =>', insertResult);

  
//   const findResult = await collection.find({}).toArray();
// console.log('Found documents =>', findResult);

// return 'done.';

// }
//   main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());
           


