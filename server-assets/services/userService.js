var Database = require('../models/index');
var Models = Database.models;
var Sequelize = Database.sequelize;
var Promise = require('bluebird');

var services = {
	addUser: addUser,
	putUser: putUser,
	delUser: delUser
};

module.exports = services;

//logic
function addUser(uData){
	var user = Models.users.build({
		username: uData.username,
		password: uData.password,
		role: uData.role,
		email: uData.email
	});
	return user.save();
};

function putUser(uData){
	return Models.users.update(uData.updatedValues,
 	{
    	where: { id: uData.id }
 	});
};

function delUser(uData){
	return Models.users.destroy({ id: uData.id});
};

function getUser(username){
	return Models.users.find({where:{username: username}});
};


