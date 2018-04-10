// originally volpost.server.routes -> This can be the model for posts 


module.exports = function(app){

 var volposts = require('./../controllers/volposts.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');

 app.route('/api/volposts')
	.get(volposts.list)
	.post(users.requiresLogin, users.isOrganization, volposts.create);    // only Volunteer can create a post 


  app.route('/api/volposts/:volpostId')
	.get(volposts.read)
  .delete(users.requiresLogin, users.isOrganization, volposts.delete);  // only Volunteer can delete a post 

	app.route('/api/volposts/edit/:volpostId')
	.get(volposts.read)
	.put(users.requiresLogin, users.isOrganization, volposts.update);   // only Volunteer can update a post

// Notice the 2 routes below. Try to figure out what is happening.
app.route('/volposts/all').get(volposts.listView);  // anybody can see posts
app.route('/volposts/new').get(volposts.createView);    // What does this API do? Ans: This renders the new.ejs file  

app.route('/volposts/:volpostId').get(volposts.singleView); // Single post view 


app.param('volpostId', volposts.volpostByID);   // 

}