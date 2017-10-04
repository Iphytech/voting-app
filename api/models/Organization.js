/**
 * Organization.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    elections: {
      collection: 'election',
      via: 'organization',
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
  validationMessages: {
    name: {
      required: 'Name of Organization is required',
    },
  },
};

