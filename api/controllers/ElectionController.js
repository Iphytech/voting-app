/**
 * ElectionController
 *
 * @description :: Server-side logic for managing elections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /**
  * @api {post} /election Create election
  * @apiName Create Election
  * @apiGroup Election
  * @apiVersion 0.0.1
  *
  * @apiUse ElectionParams
  *
  * @apiUse ElectionSuccessResponse
  *
  * @apiUse ValidationErrorExample
  */
  create(req, res) {
    let data = req.body;
    Election.create(data).then((election) => {
      if (election.role === 'admin') NotificationService.sendWelcomeEmail(data);
      return ResponseService.json(
        200, res, 'Election created successfully', election
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Election, res);
    });
  },

  /**
  * @api {put} /election/:id Update election
  * @apiName Update Election
  * @apiGroup Election
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id             election's id
  *
  * @apiUse ElectionParams
  *
  * @apiUse ElectionSuccessResponse
  *
  * @apiUse ValidationErrorExample
  * @apiUse NotFoundExample
  */
  update(req, res) {
    let data = req.body;
    Election.update({
      id: req.param('id'),
    }, data).then((updatedElection) => {
      if (!updatedElection.length) {
        return ResponseService.json(404, res, 'Election not found');
      }

      return ResponseService.json(
        200, res, 'Updated election successfully', updatedElection[0]
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Election, res);
    });
  },

  /**
  * @api {get} /election/:id Fetch election
  * @apiName Fetch Election
  * @apiGroup Election
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id      election's id
  *
  * @apiUse ElectionSuccessResponse
  *
  * @apiUse NotFoundExample
  */
  view(req, res) {
    QueryService.findOne(Election, req).then(election => {
      if (!election) {
        return ResponseService.json(404, res, 'Election not found');
      }

      return ResponseService.json(
        200, res, 'Election retrieved successfully', election
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Election, res);
    });
  },

  /**
  * @api {get} /election Fetch all elections
  * @apiName Fetch All Election
  * @apiGroup Election
  * @apiVersion 0.0.1
  *
  * @apiUse ElectionSuccessResponse
  * @apiUse NotFoundExample
  */
  list(req, res) {
    var conditions = { isDeleted: false };
    QueryService.find(Election, req, conditions).then(records => {
      return ResponseService.json(
        200,
        res,
        'Elections retrieved successfully',
        records.data,
        records.meta
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Election, res);
    });
  },

  /**
  * @api {delete} /election/:id Remove election
  * @apiName Remove Election
  * @apiGroup Election
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id      employee's id
  *
  * @apiUse ElectionParams
  *
  * @apiSuccessExample Success-Response
  * HTTP/1.1 200 OK
  * {
  *    "response": {
  *       "message": "Election removed successfully",
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
    Election.update(
      { id: id, isDeleted: false },
      { isDeleted: true }
    ).then((deletedElection) => {
      if (!deletedElection.length) {
        return ResponseService.json(404, res, 'Election not found');
      }

      return ResponseService.json(
        200, res, 'Election removed successfully', deletedElection[0]
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Election, res);
    });
  },
};
