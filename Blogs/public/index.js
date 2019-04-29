
let baseURL = "https://herokuapp.com/sportsAPI";

function displayResults(data){
	$('#listOfSports').empty();
	$('#listOfSports').append('<br> <h3>List of blogs </h3>')


	for(let i = 0; i < data.blogs.length; i ++){
		$('#listOfSports').append(`<li> "${data.blogs[i].title}" writen by ${data.blogs[i].author} <br> Content:${data.blogs[i].content} 
			<br> published on: ${data.blogs[i].publish} <br> id is: ${data.blogs[i].id}
			</li>`);
	}
}

function displayResults2(data){
	$('#listOfSports').empty();
	$('#listOfSports').append('<br> <h3>Result </h3>')

		$('#listOfSports').append(`<li> "${data.blog.title}" writen by ${data.blog.author} <br> Content:${data.blog.content} 
			<br> published on: ${data.blog.publish} <br> id is: ${data.blog.id}
			</li>`);
	
}

function fetchSports(){
	let url = '/blogs/api/list-blogs';
	
	fetch(url)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => displayResults(responseJSON))
		.catch(err => {
			console.log(err);
		});

}

function createFetchSport(authorName, blogId,Pcontent,Ptitle,Pdate){
	let url = '/blogs/api/postBlog';
	let settings = {
		method : 'POST',
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify({
			id: blogId,
			title : Ptitle,
			content : Pcontent,
			author: authorName,
			publish : Pdate
		})
	};
	fetch(url, settings)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => {
			console.log(responseJSON);
			alert("Your blog was added correclty. Hit the CLICK ME BUTTON to load it")
		})
		.catch(err => {
			console.log(err);
		});
}



function deleteFetchSport(blogId){
	
	let url = "/blogs/api/remove-sport/";
	let settings = {
		method : 'DELETE',
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify({
			id: blogId
		})
	};
	
	fetch(url, settings)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => {
			console.log(responseJSON);
			alert("Your blog was deleted. Hit the CLICK ME BUTTON to load it")
		})
		.catch(err => {
			console.log(err);
		});
}

function searchFetchSport(BId){
	let url = '/blogs/api/list-blogs/:'+BId;
	
	fetch(url)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => displayResults2(responseJSON))
		.catch(err => {
			console.log(err);
		});

}

function editFetchSport(authorName, blogId,Pcontent,Ptitle,Pdate){
	

	let url = '/blogs/api//update-blog/';
	let settings = {
		method : 'PUT',
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify({
			id: blogId,
			title : Ptitle,
			content : Pcontent,
			author: authorName,
			publish : Pdate
		})
	}
	
	fetch(url, settings)
		.then(response => {
			if(response.ok){
				return response.json();
			}
			else{
				throw Error("Something went wrong.");
			}
		})		
		.then(responseJSON => {
			console.log(responseJSON);
			alert("Your blog was edited. Hit the CLICK ME BUTTON to load it")
		})
		.catch(err => {
			console.log(err);
		});
}





function watchForm(){
	$('.retrieveSports').on('submit', function(e){
		e.preventDefault();
		fetchSports();
	});

	$('.createSport').on('submit', function(e){
		e.preventDefault();
		let title = $('#sportTitle').val();
		let id = $('#sportId').val();
		let author = $('#sportAuthor').val();
		let content = $('#sportContent').val();
		let date = $('#sportDate').val();
		createFetchSport(author, id,content,title,date);
	});

	$('.DeleteSport').on('submit', function(e){
		e.preventDefault();
		let id = $('#sportId2').val();

		deleteFetchSport(id);
	});

	$('.SearchSport').on('submit', function(e){
		e.preventDefault();
		let id = $('#sportId4').val();

		searchFetchSport(id);
	});

	$('.EditSport').on('submit', function(e){
		e.preventDefault();
		let id = $('#sportId3').val();

		let title = $('#sportTitle2').val();
		let author = $('#sportAuthor2').val();
		let content = $('#sportContent2').val();
		let date = $('#sportDate2').val();

		editFetchSport(author, id,content,title,date);
	});


}

$(watchForm);