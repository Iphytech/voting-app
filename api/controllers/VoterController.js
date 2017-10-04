/**
 * VoterController
 *
 * @description :: Server-side logic for managing voters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /**
  * @api {post} /voter Create voter
  * @apiName Create Voter
  * @apiGroup Voter
  * @apiVersion 0.0.1
  *
  * @apiUse VoterParams
  *
  * @apiUse VoterSuccessResponse
  *
  * @apiUse ValidationErrorExample
  */
  create(req, res) {
    let data = req.body;
    Voter.create(data).then((voter) => {
      if (voter.role === 'admin') NotificationService.sendWelcomeEmail(data);
      return ResponseService.json(
        200, res, 'Voter created successfully', voter
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Voter, res);
    });
  },

  /**
  * @api {put} /voter/:id Update voter
  * @apiName Update Voter
  * @apiGroup Voter
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id             voter's id
  *
  * @apiUse VoterParams
  *
  * @apiUse VoterSuccessResponse
  *
  * @apiUse ValidationErrorExample
  * @apiUse NotFoundExample
  */
  update(req, res) {
    let data = req.body;
    Voter.update({
      id: req.param('id'),
    }, data).then((updatedVoter) => {
      if (!updatedVoter.length) {
        return ResponseService.json(404, res, 'Voter not found');
      }

      return ResponseService.json(
        200, res, 'Updated voter successfully', updatedVoter[0]
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Voter, res);
    });
  },

  /**
  * @api {get} /voter/:id Fetch voter
  * @apiName Fetch Voter
  * @apiGroup Voter
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id      voter's id
  *
  * @apiUse VoterSuccessResponse
  *
  * @apiUse NotFoundExample
  */
  view(req, res) {
    QueryService.findOne(Voter, req).then(voter => {
      if (!voter) {
        return ResponseService.json(404, res, 'Voter not found');
      }

      return ResponseService.json(
        200, res, 'Voter retrieved successfully', voter
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Voter, res);
    });
  },

  /**
  * @api {get} /voter Fetch all voters
  * @apiName Fetch All Voter
  * @apiGroup Voter
  * @apiVersion 0.0.1
  *
  * @apiUse VoterSuccessResponse
  * @apiUse NotFoundExample
  */
  list(req, res) {
    var conditions = { isDeleted: false };
    QueryService.find(Voter, req, conditions).then(records => {
      return ResponseService.json(
        200,
        res,
        'Voters retrieved successfully',
        records.data,
        records.meta
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Voter, res);
    });
  },

  /**
  * @api {delete} /voter/:id Remove voter
  * @apiName Remove Voter
  * @apiGroup Voter
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id      employee's id
  *
  * @apiUse VoterParams
  *
  * @apiSuccessExample Success-Response
  * HTTP/1.1 200 OK
  * {
  *    "response": {
  *       "message": "Voter removed successfully",
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
    Voter.update(
      { id: id, isDeleted: false },
      { isDeleted: true }
    ).then((deletedVoter) => {
      if (!deletedVoter.length) {
        return ResponseService.json(404, res, 'Voter not found');
      }

      return ResponseService.json(
        200, res, 'Voter removed successfully', deletedVoter[0]
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Voter, res);
    });
  },
};
