
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uuidv4 = require('uuid/v4')

let BlogSchema = mongoose.Schema({
	id : {type : String, required : true, unique : true},
	title : {type : String, required : true},
	content : {type : String, required : true},
	author : {type : String, required : true},
	publish : {type : String, required : true}
});

let Blogs = mongoose.model('Blogs', BlogSchema);

const ListBlogs = {
	get : function(){
		return Blogs.find()
			.then(blogs => {
				return blogs;
			})
			.catch(err => {
				 throw new Error(err);
			});
	} ,
	post : function(newBlog){
		console.log(newBlog);
		return Blogs.create(newBlog)
			.then(blog => {
				return blog;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},

	getById : function(blogId){
		return Blogs.findOne({id : blogId})
			.then(blog => {
				if (blog){
					return blog;
				}
				throw new Err("Sport not found");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
	put : function(blogId, newData){
		return Blogs.findOneAndUpdate({id : blogId}, { $set: newData }, { new: true })
			.then(blog => {
				if (blog){
					return blog;
				}
				throw new Err("Sport not found");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
	delete : function(sportId){
		return Blogs.findOneAndRemove({id : sportId})
			.then(sport => {
				if (sport){
					return sport;
				}
				throw new Err("Sport not found");
			})
			.catch(err => {
				throw new Error(err);
			})
	}
}

module.exports = {ListBlogs};





