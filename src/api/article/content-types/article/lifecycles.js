module.exports = {
  beforeCreate: async ({ params }) => {
    const adminId = params.data.createdBy;
    const author = (
      await strapi.entityService.findMany("api::author.author", {
        filters: {
          admin_user: adminId,
        },
      })
    )[0];

    params.data.author.connect = [...params.data.author.connect, author.id];
  },
  afterCreate: async ({ result }) => {
    const { id } = result;
    await strapi.service("api::popular-article.popular-article").create({
      data: {
        article: [id],
      },
    });
  },
  beforeDelete: async ({ params }) => {
    const articleId = params.where.id;
    const popular = (
      await strapi.entityService.findMany(
        "api::popular-article.popular-article",
        {
          filters: {
            article: articleId,
          },
        }
      )
    )[0];
    await strapi.entityService.delete(
      "api::popular-article.popular-article",
      popular.id
    );
  },
};
