/**
 * WhatController
 *
 * @description :: Server-side logic for managing whats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	pick: function(req,res){
		return res.view('what');
	}
	
};

