/**
 * Election.js
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
    organization: {
      model: 'organization',
    },
    candidates: {
      collection: 'candidate',
      via: 'election',
    },
    voters: {
      collection: 'voter',
      via: 'election',
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
  validationMessages: {
    name: {
      required: 'Name of Election is required',
    },
  },
};

