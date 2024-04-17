import type { Schema, Attribute } from '@strapi/strapi';

export interface AttributesTags extends Schema.Component {
  collectionName: 'components_attributes_tags';
  info: {
    displayName: 'Tags';
  };
  attributes: {
    tag: Attribute.String;
  };
}

export interface SeoMetaData extends Schema.Component {
  collectionName: 'components_seo_meta_data';
  info: {
    displayName: 'MetaData';
  };
  attributes: {
    meta_title: Attribute.String;
    meta_description: Attribute.Text;
    meta_keyword: Attribute.String;
    meta_img: Attribute.Media;
    is_prevent_indexing: Attribute.Boolean & Attribute.DefaultTo<false>;
    canonical_url: Attribute.String;
  };
}

export interface SeoRelatedArticles extends Schema.Component {
  collectionName: 'components_seo_related_articles';
  info: {
    displayName: 'related_articles';
  };
  attributes: {
    articles: Attribute.Relation<
      'seo.related-articles',
      'oneToMany',
      'api::article.article'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'attributes.tags': AttributesTags;
      'seo.meta-data': SeoMetaData;
      'seo.related-articles': SeoRelatedArticles;
    }
  }
}
