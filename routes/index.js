'use strict';
var express = require("express");
var router  = express.Router();
//------------------
const middleware = require(global.appRoot+"/middleware/index");
const { isLoggedIn, checkLogin, requireLogin } = middleware; // destructuring assignment
const errex = require(global.appRoot+"/mano/errex_handle");
const funcWrap = require(global.appRoot+"/auxiliary/functional_paradigm").functionWrapperByObj;
//------------------
//Controllers aka Route-Functions  (Via the 'functionWrapper' they are wrapped inside an Error-Exception Handler & Logger)
const Ctrl = funcWrap(errex.handler_wrapping, require(global.appRoot+"/controllers/indexCtrl"));


router.route('/')
 .get(Ctrl.root_get)

router.route('/login')
 .get(Ctrl.login_get)
 .post(Ctrl.login_post)

router.route('/logout')
 .all(Ctrl.logout_get)

//===============================================
//===============================================
// Export
//===============================================
module.exports = {
	router,
	router_star
}