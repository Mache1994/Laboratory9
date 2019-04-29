const express = require('express');
const router = express.Router();
const {ListBlogs} = require('./model');
const uuidv4 = require('uuid/v4')


router.get('/list-blogs', (req, res, next) => {

	ListBlogs.get()
	.then( blogs => {
		res.status(200).json({
			message : 'Successfully sending the list of blogs',
			status : 200,
			blogs : blogs
		});
	}).catch( err => {
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();

	});
});


router.post('/postBlog', (req, res, next) => {
	
	let requiredFields = ['id','title','content','author', 'publish'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			return next();
		}
	}

	let objectToAdd = {
		id: req.body.id,
		title : req.body.title,
		content : req.body.content,
		author: req.body.author,
		publish : req.body.publish
	};
	
	ListBlogs.post(objectToAdd)
		.then(blog => {
			res.status(201).json({
				message : "Successfully added the sport",
				status : 201,
				blog : blog
			});
		})
		.catch( err => {
			res.status(500).json({
				message : `Internal server error no se agrego.`,
				status : 500
			});
			return next();
		});
});

router.get('/list-blogs/:id', (req, res) => {
	let blogId = req.params.id.slice(1);
	
	ListBlogs.getById(blogId)
		.then(blog => {
			res.status(200).json({
				message : "Successfully sent the sport",
				status : 200,
				blog : blog
			});
		})
		.catch(err => {
			res.status(404).json({
				message : "Sport not found in the list",
				status : 404
			});
		});
});

router.put('/update-blog/', (req, res,next) => {
	
	let blogId = req.body.id;
	console.log(blogId)

	if (blogId){	

	

		if (req.body.title)
 			ListBlogs.put(blogId,{title:req.body.title})	
 		.then(sport => {
				res.status(200).json({
					message : "Successfully updated the sport",
					status : 200,
					sport : sport
				});
			})
			.catch(err => {
				res.status(404).json({
					message : "Sport not found in the list",
					status : 404
				});

				next();
			});	

 		if (req.body.content)
 			ListBlogs.put(blogId,{content:req.body.content})
 			.then(sport => {
				res.status(200).json({
					message : "Successfully updated the sport",
					status : 200,
					sport : sport
				});
			})
			.catch(err => {
				res.status(404).json({
					message : "Sport not found in the list",
					status : 404
				});

				next();
			});	
 		if (req.body.author)
 			ListBlogs.put(blogId,{author:req.body.author})
 				.then(sport => {
				res.status(200).json({
					message : "Successfully updated the sport",
					status : 200,
					sport : sport
				});
			})
			.catch(err => {
				res.status(404).json({
					message : "Sport not found in the list",
					status : 404
				});

				next();
			});		
 		if (req.body.publish)
 			ListBlogs.put(blogId,{publish:req.body.publish})
 			.then(sport => {
				res.status(200).json({
					message : "Successfully updated the sport",
					status : 200,
					sport : sport
				});
			})
			.catch(err => {
				res.status(404).json({
					message : "Sport not found in the list",
					status : 404
				});

				next();
			});	


	
	}
	else{
		res.status(406).json({
			message : "Missing param 'id'",
			status : 406
		});

		next();
	}

		res.status(406).json({
			message : "No data was sent to update",
			status : 406
		});

		next();
	
});

router.delete('/remove-sport/', (req, res,next) => {
	let requiredFields = ['id'];
		console.log(req.body.id)
	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});

			next();
		}
	}

	let sportId = req.body.id;
	console.log(sportId)
	if (sportId){
		if(sportId == req.body.id){

			ListBlogs.delete(sportId)
				.then(blog => {
					res.status(204).json({
						message : "Successfully deleted the blog",
						status : 204,
						blog : blog
					});
				})
				.catch(err => {
					res.status(404).json({
						message : "Blog not found in the list",
						status : 404
					}).send("Finish");
				})
	
		}
		else{
			res.status(400).json({
				message : "Param and body do not match",
				status : 400
			});

			next();
		}
	}
	else{
		res.status(406).json({
			message : "Missing param 'id'",
			status : 406
		});

		next();
	}
});

module.exports = router;



/*

app.get('/list-sports-with-headers', (req, res) =>{
	let sportId = req.get('id');


	sportsArray.forEach(item => {
		if (item.id == sportId){
			res.status(200).json({
				message : "Successfully sent the sport",
				status : 200,
				sport : item
			});
		}
	});

	res.status(404).json({
		message : "Sport not found in the list",
		status : 404
	});
});


*/