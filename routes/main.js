const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const mongoClient = require('mongodb').MongoClient
const app = express()
app.set('port', process.env.Port || 3000)
app.use(morgan('dev'))

var db;
var databaseUrl="mongodb+srv://admin:1234@cluster0.uzxwi96.mongodb.net/?    retryWrites=true&w=majority"

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html");
})

app.get('/users', (req, res) => {
	mongoClient.connect(databaseUrl, function(err, database){
		if(err != null){
			return res.json({'count':0})
		}else{
			db = database.db('test')
			db.collection('user').find({},{name:1}).toArray(function(err, result){
				if(err) throw err
				console.log('result : ')
				console.log(result)
				// res.json(JSON.stringify(result))

				res.writeHead(200);
				var template = `
					<table border="1" margin: auto; text-align: center;>
					<tr>
						<th> 유저 명 </th>
					</tr>
				`;

				result.forEach((item) => {
					template += `
					<tr>
						<th>${item.name}</th>
					</tr>`
				});
				template += `</table>`;
			return res.end(template);

			});
		}
	});
});

module.exports = app;
