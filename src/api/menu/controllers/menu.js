"use strict";

/**
 * menu controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::menu.menu", ({ strapi }) => ({
  async findOne(ctx) {
    await this.validateQuery(ctx);
    const { id } = ctx.params;
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const result = await strapi.db.query("api::menu.menu").findOne({
      where: { slug: id },
      ...sanitizedQueryParams,
    });
    const sanitizedResults = await this.sanitizeOutput(result, ctx);

    return this.transformResponse(sanitizedResults);
  },
}));
