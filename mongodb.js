const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = "mongodb+srv://shurik409:Shurikthisisi1_@fvmcluster-giofi.azure.mongodb.net/test?retryWrites=true&w=majority";
const crypto = require('crypto');


const isTask = async(value, from) => {

    userData = await new Promise((res, rej) => {
        client = new MongoClient(uri, { useNewUrlParser: true })
        client.connect(async err => {
            if(err) console.log(err);
            const infoColection = client.db("Telegram").collection("Info");
            let data = await infoColection.findOne({id: `${value}`});

            await client.close();
            if(data)
                res(true);
            else
                res(false)
        })
    });

    return userData;
}

module.exports.isTask = isTask;