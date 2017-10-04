/**
 * CandidateController
 *
 * @description :: Server-side logic for managing candidates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /**
  * @api {post} /candidate Create candidate
  * @apiName Create Candidate
  * @apiGroup Candidate
  * @apiVersion 0.0.1
  *
  * @apiUse CandidateParams
  *
  * @apiUse CandidateSuccessResponse
  *
  * @apiUse ValidationErrorExample
  */
  create(req, res) {
    let data = req.body;
    Candidate.create(data).then((candidate) => {
      if (candidate.role === 'admin') NotificationService.sendWelcomeEmail(data);
      return ResponseService.json(
        200, res, 'Candidate created successfully', candidate
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Candidate, res);
    });
  },

  /**
  * @api {put} /candidate/:id Update candidate
  * @apiName Update Candidate
  * @apiGroup Candidate
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id             candidate's id
  *
  * @apiUse CandidateParams
  *
  * @apiUse CandidateSuccessResponse
  *
  * @apiUse ValidationErrorExample
  * @apiUse NotFoundExample
  */
  update(req, res) {
    let data = req.body;
    Candidate.update({
      id: req.param('id'),
    }, data).then((updatedCandidate) => {
      if (!updatedCandidate.length) {
        return ResponseService.json(404, res, 'Candidate not found');
      }

      return ResponseService.json(
        200, res, 'Updated candidate successfully', updatedCandidate[0]
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Candidate, res);
    });
  },

  /**
  * @api {get} /candidate/:id Fetch candidate
  * @apiName Fetch Candidate
  * @apiGroup Candidate
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id      candidate's id
  *
  * @apiUse CandidateSuccessResponse
  *
  * @apiUse NotFoundExample
  */
  view(req, res) {
    QueryService.findOne(Candidate, req).then(candidate => {
      if (!candidate) {
        return ResponseService.json(404, res, 'Candidate not found');
      }

      return ResponseService.json(
        200, res, 'Candidate retrieved successfully', candidate
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Candidate, res);
    });
  },

  /**
  * @api {get} /candidate Fetch all candidates
  * @apiName Fetch All Candidate
  * @apiGroup Candidate
  * @apiVersion 0.0.1
  *
  * @apiUse CandidateSuccessResponse
  * @apiUse NotFoundExample
  */
  list(req, res) {
    var conditions = { isDeleted: false };
    QueryService.find(Candidate, req, conditions).then(records => {
      return ResponseService.json(
        200,
        res,
        'Candidates retrieved successfully',
        records.data,
        records.meta
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Candidate, res);
    });
  },

  /**
  * @api {delete} /candidate/:id Remove candidate
  * @apiName Remove Candidate
  * @apiGroup Candidate
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id      employee's id
  *
  * @apiUse CandidateParams
  *
  * @apiSuccessExample Success-Response
  * HTTP/1.1 200 OK
  * {
  *    "response": {
  *       "message": "Candidate removed successfully",
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
    Candidate.update(
      { id: id, isDeleted: false },
      { isDeleted: true }
    ).then((deletedCandidate) => {
      if (!deletedCandidate.length) {
        return ResponseService.json(404, res, 'Candidate not found');
      }

      return ResponseService.json(
        200, res, 'Candidate removed successfully', deletedCandidate[0]
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Candidate, res);
    });
  },
};
