const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();

const db = require("../../models");

const db_url = process.env.DATABASE_URL;
const db_name = process.env.DATABASE_NAME;

async function getAllEntries(collectionName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      db_url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        const db = client.db(db_name);
        const collection = db.collection(collectionName);

        collection
          .find()
          .toArray()
          .then((doc) => {
            if (client) {
              client.close();
            }
            resolve(doc);
          })
          .catch((error) => {
            if (client) {
              client.close();
            }
            reject(error);
          });
      }
    );
  });
}

async function getEntriesByQuery(collectionName, query) {
  return await new Promise((resolve, reject) => {
    MongoClient.connect(
      db_url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        if (err !== null) {
          reject(err);
        } else {
          const db = client.db(db_name);
          const collection = db.collection(collectionName);

          collection
            .find(query)
            .toArray()
            .then((doc) => {
              if (client) {
                client.close();
              }
              resolve(doc);
            })
            .catch((error) => {
              if (client) {
                client.close();
              }
              reject(error);
            });
        }
      }
    );
  });
}

async function addNewEntry(collectionName, query) {
  return await new Promise((resolve, reject) => {
    const expense_db = db_url + "/" + db_name;
    db.mongoose
      .connect(expense_db, function (err, client) {
        console.log("connected");
      })
      .then(() => {
        console.log("db is", expense_db);
      })
      .catch((error) => {
        console.error(("Connection error", error));
        process.exit();
      });

    /*    MongoClient.connect(database.url + database.database_name, function (
      err,
      client,
    ) {
      console.log('masuk sini')
      if (err !== null) {
        console.log(err)
        client.close()
        reject(err)
      } else {
        console.log('no error')
        const db = client.db(database.database_name)
        const collection = db.collection(collectionName)
        console.log(db)
        console.log(collection)
        collection
          .insertOne(query)
          .then((doc) => {
            if (client) {
              client.close()
            }
            resolve(doc)
          })
          .catch((error) => {
            if (client) {
              client.close()
            }
            reject(error)
          })
      }
    }).catch((error) => {
      console.log(error)
      console.log('failed to connect')
    }) */
  });
}

async function updateEntry(collectionName, filter, data) {
  return await new Promise((resolve, reject) => {
    MongoClient.connect(
      db_url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        if (err !== null) {
          reject(err);
        } else {
          const db = client.db(db_name);
          const collection = db.collection(collectionName);

          collection
            .updateOne(filter, { $set: data })
            .then((res) => {
              if (client) {
                client.close();
              }
              resolve(res.result);
            })
            .catch((error) => {
              if (client) {
                client.close();
              }
              reject(error);
            });
        }
      }
    );
  });
}

module.exports = {
  getAllEntries: getAllEntries,
  getEntriesByQuery: getEntriesByQuery,
  addNewEntry: addNewEntry,
  updateEntry: updateEntry,
};
