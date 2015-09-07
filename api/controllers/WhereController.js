/**
 * WhereController
 *
 * @description :: Server-side logic for managing wheres
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	pick: function(req,res){
		return res.view('where');
	}
	
};

