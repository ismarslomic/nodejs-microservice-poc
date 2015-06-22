'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * The Comment model definition
 * @type {Object}
 * @property {String} text - The text of the comment
 * @property {String} author - The author of the comment
 */
var CommentDefinition = {
	text: String,
	author: String
};

/**
 * The Comment model schema
 * @type {Comment}
 */
var CommentSchema = new Schema(CommentDefinition);

module.exports = {

	/**
	 * The Comment model definition object
	 * @type {Object}
	 * @see comment:commentModel~CommentDefinition
	 */
	definition: CommentDefinition,

	/**
	 * The Comment model schema
	 * @type {Schema}
	 * @see comment:model~CommentSchema
	 */
	schema: CommentSchema,

	/**
	 *  The registered mongoose model instance of the Comment model
	 *  @type {Comment}
	 */
	model: mongoose.model('Comment', CommentSchema)
};
