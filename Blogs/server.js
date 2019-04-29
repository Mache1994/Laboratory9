const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sportsRouter = require('./router');
const app = express();
mongoose.Promise  = global.Promise;
const jsonParser = bodyParser.json();
const uuidv4 = require('uuid/v4')

app.use(express.static('public'));

app.use('/blogs/api', jsonParser, sportsRouter);

let server;

function runServer(port, databaseUrl){
	return new Promise( (resolve, reject) => {
		mongoose.connect(databaseUrl,
				err => {
					if (err){
						return reject(err);
					}
					else{
						server = app.listen(port, () =>{
							console.log('Your app is running in port ', port);
							resolve();
						})
						.on('error', err => {
							mongoose.disconnect();
							return reject(err);
						});
					}
				}
			);
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing the server');
				server.close( err => {
					if (err){
						return reject(err);
					}
					else{
						resolve();
					}
				});
			});
		});
}

runServer(8080, 'mongodb://localhost/Marcelo-blog-post')
	.catch(err => console.log(err));

module.exports = { app, runServer, closeServer };





