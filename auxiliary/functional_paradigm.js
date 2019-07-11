'use strict';

//Function-Wrapper
//wrapping functions from an object, containing several inside another function
//and return a new object with all the wrapped functions.
//- - - - - 
//- It also supports to pass additional arguments, which are then every time appended to the arguments passed to the wrapper function (and if implemented there, possibly to the wrapped-function).
// "persistent Arguments". These are one time prepared, when the functionWrapper is called and then passed to the wrapping&wrapped function every time that is called
//--> In other words: Pass arguments to the functionWrapper. When you afterwards call a function from the returned object (which are now wrapped), these initially passed arguments are passed every time to the called function at the end of the actually manually passed arguments.
//-> The outer-function (aka wrapping function) receives the 'persistentArgs' (aka additional args) as an array and after the function-to-wrap
//-> The inner-function (aka wrapped function) shall receive the 'persistentArgs' normal (i.e. as comma-seperated-values) and at the end of it's own arguments
//- the wrapping-function may be implemented in different ways: Either it just uses the persistentArgs itself and do not pass them to the inner-function, or it only passes them or both. Depending on the use-case
//- Furthermore, now you can pass an Argument for 'this', if desired. Of course, the thisArg can just be "null" or be omitted; omitted for sure only, if no additional arguments are wanted.
//- The "thisArg" and the "persistentArgs" are totally optional
//   - A proper wrapper-function shall treat them as such. If the wrapper-function is intended to expect persistentArgs, it shall check for empty array and in case throw an error.
// - - - - - - - - - - -
//For a proper use-case of this look into "errex_handle.js" -> the "function handler_wrapping(innerFunc, persistentArgs, req, res, ...args)"
//    and for a concrete application of these two together, look into the "index-routes"
module.exports.functionWrapperByObj=(wrapf, fobj, thisArg, ...persistentArgs)=>{//wrapf: the function, inside which the passed functions are wrapped. fobj: A Object, containing several functions. These functions become wrapped inside the wrapper-function
	let retObj = {};
	let keys = Object.getOwnPropertyNames(fobj);
	keys.forEach((el,idx,arr)=>{
		retObj[el]=wrapf.bind(thisArg,fobj[el],persistentArgs);
	});
	return retObj;
}