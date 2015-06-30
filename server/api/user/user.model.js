'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * The USer model definition
 * @type {Object}
 * @property {String} email - The email address of the user
 * @property {String} password - The password of the user
 */
var UserDefinition = {
	email: String,
	password: String
};


/**
 * The User model schema
 * @type {User}
 */
var UserSchema = new Schema(UserDefinition);

module.exports = {

	/**
	 * The User model definition object
	 * @type {Object}
	 * @see user:UserModel~UserDefinition
	 */
	definition: UserDefinition,

	/**
	 * The User model schema
	 * @type {Schema}
	 * @see user:model~UserSchema
	 */
	schema: UserSchema,

	/**
	 *  The registered mongoose model instance of the User model
	 *  @type {User}
	 */
	model: mongoose.model('User', UserSchema)
};

