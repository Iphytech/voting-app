/**
 * Candidate.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user: {
      model: 'user',
      required: true,
    },
    election: {
      model: 'election',
      required: true,
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
  validationMessages: {
    user: {
      required: 'User details is required',
    },
    election: {
      required: 'Election is required',
    },
  },
};

