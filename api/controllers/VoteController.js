/**
 * VoteController
 *
 * @description :: Server-side logic for managing votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /**
  * @api {post} /vote Create vote
  * @apiName Create Vote
  * @apiGroup Vote
  * @apiVersion 0.0.1
  *
  * @apiUse VoteParams
  *
  * @apiUse VoteSuccessResponse
  *
  * @apiUse ValidationErrorExample
  */
  create(req, res) {
    let data = req.body;
    Vote.create(data).then((vote) => {
      if (vote.role === 'admin') NotificationService.sendWelcomeEmail(data);
      return ResponseService.json(
        200, res, 'Vote created successfully', vote
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Vote, res);
    });
  },

  /**
  * @api {put} /vote/:id Update vote
  * @apiName Update Vote
  * @apiGroup Vote
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id             vote's id
  *
  * @apiUse VoteParams
  *
  * @apiUse VoteSuccessResponse
  *
  * @apiUse ValidationErrorExample
  * @apiUse NotFoundExample
  */
  update(req, res) {
    let data = req.body;
    Vote.update({
      id: req.param('id'),
    }, data).then((updatedVote) => {
      if (!updatedVote.length) {
        return ResponseService.json(404, res, 'Vote not found');
      }

      return ResponseService.json(
        200, res, 'Updated vote successfully', updatedVote[0]
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Vote, res);
    });
  },

  /**
  * @api {get} /vote/:id Fetch vote
  * @apiName Fetch Vote
  * @apiGroup Vote
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id      vote's id
  *
  * @apiUse VoteSuccessResponse
  *
  * @apiUse NotFoundExample
  */
  view(req, res) {
    QueryService.findOne(Vote, req).then(vote => {
      if (!vote) {
        return ResponseService.json(404, res, 'Vote not found');
      }

      return ResponseService.json(
        200, res, 'Vote retrieved successfully', vote
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Vote, res);
    });
  },

  /**
  * @api {get} /vote Fetch all votes
  * @apiName Fetch All Vote
  * @apiGroup Vote
  * @apiVersion 0.0.1
  *
  * @apiUse VoteSuccessResponse
  * @apiUse NotFoundExample
  */
  list(req, res) {
    var conditions = { isDeleted: false };
    QueryService.find(Vote, req, conditions).then(records => {
      return ResponseService.json(
        200,
        res,
        'Votes retrieved successfully',
        records.data,
        records.meta
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Vote, res);
    });
  },

  /**
  * @api {delete} /vote/:id Remove vote
  * @apiName Remove Vote
  * @apiGroup Vote
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id      employee's id
  *
  * @apiUse VoteParams
  *
  * @apiSuccessExample Success-Response
  * HTTP/1.1 200 OK
  * {
  *    "response": {
  *       "message": "Vote removed successfully",
  *       "data": {
  *          "isDeleted": "true",
  *          "createdAt": "2015-01-07T09:43:40.100Z",
  *          "updatedAt": "2015-01-07T09:43:40.100Z",
  *          "id": "54acffcc902ab22e59bc507a"
  *       }
  *    }
  * }
  *
  * @apiUse NotFoundExample
  */
  delete(req, res) {
    let id = req.params.id;
    Vote.update(
      { id: id, isDeleted: false },
      { isDeleted: true }
    ).then((deletedVote) => {
      if (!deletedVote.length) {
        return ResponseService.json(404, res, 'Vote not found');
      }

      return ResponseService.json(
        200, res, 'Vote removed successfully', deletedVote[0]
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Vote, res);
    });
  },
};
