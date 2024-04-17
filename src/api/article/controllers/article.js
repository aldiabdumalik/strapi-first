"use strict";

/**
 * article controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async findOne(ctx) {
    await this.validateQuery(ctx);
    const { id } = ctx.params;
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const result = await strapi.db.query("api::article.article").findOne({
      where: { slug: id },
      ...sanitizedQueryParams,
    });
    const sanitizedResults = await this.sanitizeOutput(result, ctx);
    if (result !== null) {
      const getPopular = await strapi.entityService.findMany(
        "api::popular-article.popular-article",
        {
          filters: {
            article: result.id,
          },
        }
      );
      if (getPopular.length > 0) {
        const popular = getPopular[0];
        await strapi.entityService.update(
          "api::popular-article.popular-article",
          popular.id,
          {
            data: {
              view: ++popular.view,
            },
          }
        );
      }
    }

    return this.transformResponse(sanitizedResults);
  },
}));
