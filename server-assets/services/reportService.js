var Database = require('../models/index');
var Models = Database.models;
var Sequelize = Database.sequelize;
var Promise = require('bluebird');
var services = {
	addReport: addReport,
	putReport: putReport,
	delReport: delReport,
	getOneByMonth: getOneByMonth,
	getAllByMonth: getAllByMonth,
	getAllByRange: getAllByRange
};

module.exports = services;

//logic
function addReport(rData){
	var report = Models.reports.build({
		userId: rData.userId,
		centerId: rData.centerId,
		date: rData.date,
		visitor_total: rData.visitor_total,
		visitor_tour: rData.visitor_tour,
		visitor_tournonmember: rData.visitor_tournonmember,
		referral_cards: rData.referral_cards,
		referral_called: rData.referral_called,
		referral_inbound: rData.referral_inbound,
		referral_member: rData.referral_member,
		comments: rData.comments
	});
	return report.save();
};

function putReport(rData){
  console.log(rData);
	return Models.reports.update(rData.updatedValues,
 	{
    	where: { id: rData.id }
 	});
};

function delReport(rData){
	return Models.reports.destroy({ where: { id: rData.id } });
};

function getOneByMonth(rData){
	return Models.centers.find({
		where: {id: rData.id},
  		include: [{ 
  			model: Models.reports, 
  			as: 'Reports', 
  			where: { 'Reports.date': rData.date },
  			attributes: [
  				'id', 
  				'visitor_total', 
  				'visitor_tour', 
  				'visitor_tournonmember', 
  				'referral_cards', 
  				'referral_called', 
  				'referral_inbound', 
  				'referral_member',
  				'comments',
  				[Sequelize.fn('date_format', Sequelize.col('Reports.date'), '%Y-%m-%d'), 'date']
  			]
  	  	}]
	}, {raw: true});
};

function getAllByMonth(rData){
	return Models.centers.findAll({
  		include: [{ 
  			model: Models.reports, 
  			as: 'Reports', 
  			where: { 'Reports.date': rData.date },
  			attributes: [
  				'id', 
  				'visitor_total', 
  				'visitor_tour', 
  				'visitor_tournonmember', 
  				'referral_cards', 
  				'referral_called', 
  				'referral_inbound', 
  				'referral_member',
  				'comments',
  				[Sequelize.fn('date_format', Sequelize.col('Reports.date'), '%Y-%m-%d'), 'date']
  			]
  	  	}]
	}, {raw: true});
};

function getAllByRange(rData){
	return Models.centers.findAll({
  		include: [{ 
  			model: Models.reports, 
  			as: 'Reports', 
  			where: { 'Reports.date': { between: [rData.start, rData.end] } },
  			attributes: [
  				'id', 
  				'visitor_total', 
  				'visitor_tour', 
  				'visitor_tournonmember', 
  				'referral_cards', 
  				'referral_called', 
  				'referral_inbound', 
  				'referral_member',
  				'comments',
  				[Sequelize.fn('date_format', Sequelize.col('Reports.date'), '%Y-%m-%d'), 'date']
  			]
  	  	}]
	}, {raw: true});
};

