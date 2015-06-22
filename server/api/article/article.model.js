'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('../comment/comment.model');

/**
 * The Article model definition
 * @type {Object}
 * @property {String} title - The title of the article
 * @property {String} slug - The slug of the article
 * @property {String} content - The content of the article
 * @property {String} author - The author name of the article
 * @property {Comment} comments - The comments of the article
 */
var ArticleDefinition = {
	title: String,
	slug: String,
	content: String,
	author: String,
	comments: [Comment.schema]
};


/**
 * The Article model schema
 * @type {Article}
 */
var ArticleSchema = new Schema(ArticleDefinition);

module.exports = {

	/**
	 * The Article model definition object
	 * @type {Object}
	 * @see article:ArticleModel~ArticleDefinition
	 */
	definition: ArticleDefinition,

	/**
	 * The Article model schema
	 * @type {Schema}
	 * @see article:model~ArticleSchema
	 */
	schema: ArticleSchema,

	/**
	 *  The registered mongoose model instance of the Article model
	 *  @type {Article}
	 */
	model: mongoose.model('Article', ArticleSchema)
};
