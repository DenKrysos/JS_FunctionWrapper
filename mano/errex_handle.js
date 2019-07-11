'use strict';
// Error and Exception Handling
const logf= require(global.appRoot+'/mano/logging/log_functions'),
      logt= require(global.appRoot+'/mano/logging/logObject_templates')


//"Wrapping-Error&Exception Handler and Logger"
// - With proper Usage, this wraps the Handling and Logging of errors automatically around other function.
//To fully understand this function here, have a look at the "functionWrapperByObj()" inside "functional_paradigm.js"
//   and also at the index-routes, where all this construct is applied.
//(This needs to be used together with 'functionWrapperByObj', Example seen inside the index Routes)
// - - - - - -
//persistentArgs is passed here as an array. These args are appended to the arguments given to the inner function, every time it is called; attached to the end of the actually manually passed arguments.
function handler_wrapping(innerFunc, persistentArgs, req, res, ...args){
	let argsPassed = [req,res].concat(args).concat(persistentArgs);
	try{
		logf.log_request(global.gLogging.client.info, 'server.routes.errex_handler.begun', req, res, req.user);
		innerFunc.apply(this,argsPassed);
		//innerFunc(...argsPassed);//refactored via ES2015 would be this, but we keep it with apply to pass the this, which is prepared by the functionWrapper
	}catch(err){
		logf.log_request(global.gLogging.error.error, 'server.routes.errex_handler.failed', req, res, req.user, {'err':`${err}`});
		res.status(500).render('index/500',{page: '500'});
	}
	logf.log(global.gLogging.client.info, 'server.routes.errex_handler.end', req, res);
};

module.exports={
	handler_wrapping,
	handler
}