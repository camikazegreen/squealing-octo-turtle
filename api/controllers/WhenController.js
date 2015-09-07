/**
 * WhenController
 *
 * @description :: Server-side logic for managing whens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	pick: function(req,res){
		return res.view('when');
	}
};

