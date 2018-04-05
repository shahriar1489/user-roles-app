// originally volpost.server.routes -> This can be the model for posts 


module.exports = function(app){

 var volposts = require('./../controllers/volposts.server.controller.js');
 var users = require('./../controllers/users.server.controller.js');

 app.route('/api/volposts')
	.get(volposts.list)
	.post(users.requiresLogin, users.isOrganization, volposts.create);    // add the callback for Organization verification. 


//  app.route('/api/volposts/:volpostId')
//	.get(volposts.read)
//  .delete(users.requiresLogin, users.isOrganization ,volposts.delete);

//	app.route('/api/volposts/edit/:volpostId')
//	.get(volposts.read)
//	.put(users.requiresLogin, users.isOrganization, volposts.update);

//app.route('/volposts/all').get(volposts.listView);

app.route('/volposts/new').get(volposts.createView);

//app.route('/volposts/:volpostId').get(volposts.singleView);


app.param('volpostId', volposts.volpostByID);


}