"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["admin::user"],
      afterCreate: async ({ result }) => {
        const { id, firstname, lastname, username, createdAt, updatedAt } =
          result;
        await strapi.service("api::author.author").create({
          data: {
            name: `${firstname} ${lastname}`,
            username,
            createdAt,
            updatedAt,
            admin_user: [id],
          },
        });
      },
    });
  },
};
