'use strict';

/**
 * popular-article service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::popular-article.popular-article');
