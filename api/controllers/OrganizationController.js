/**
 * OrganizationController
 *
 * @description :: Server-side logic for managing organizations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /**
  * @api {post} /organization Create organization
  * @apiName Create Organization
  * @apiGroup Organization
  * @apiVersion 0.0.1
  *
  * @apiUse OrganizationParams
  *
  * @apiUse OrganizationSuccessResponse
  *
  * @apiUse ValidationErrorExample
  */
  create(req, res) {
    let data = req.body;
    Organization.create(data).then((organization) => {
      if (organization.role === 'admin') NotificationService.sendWelcomeEmail(data);
      return ResponseService.json(
        200, res, 'Organization created successfully', organization
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Organization, res);
    });
  },

  /**
  * @api {put} /organization/:id Update organization
  * @apiName Update Organization
  * @apiGroup Organization
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id             organization's id
  *
  * @apiUse OrganizationParams
  *
  * @apiUse OrganizationSuccessResponse
  *
  * @apiUse ValidationErrorExample
  * @apiUse NotFoundExample
  */
  update(req, res) {
    let data = req.body;
    Organization.update({
      id: req.param('id'),
    }, data).then((updatedOrganization) => {
      if (!updatedOrganization.length) {
        return ResponseService.json(404, res, 'Organization not found');
      }

      return ResponseService.json(
        200, res, 'Updated organization successfully', updatedOrganization[0]
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Organization, res);
    });
  },

  /**
  * @api {get} /organization/:id Fetch organization
  * @apiName Fetch Organization
  * @apiGroup Organization
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id      organization's id
  *
  * @apiUse OrganizationSuccessResponse
  *
  * @apiUse NotFoundExample
  */
  view(req, res) {
    QueryService.findOne(Organization, req).then(organization => {
      if (!organization) {
        return ResponseService.json(404, res, 'Organization not found');
      }

      return ResponseService.json(
        200, res, 'Organization retrieved successfully', organization
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Organization, res);
    });
  },

  /**
  * @api {get} /organization Fetch all organizations
  * @apiName Fetch All Organization
  * @apiGroup Organization
  * @apiVersion 0.0.1
  *
  * @apiUse OrganizationSuccessResponse
  * @apiUse NotFoundExample
  */
  list(req, res) {
    var conditions = { isDeleted: false };
    QueryService.find(Organization, req, conditions).then(records => {
      return ResponseService.json(
        200,
        res,
        'Organizations retrieved successfully',
        records.data,
        records.meta
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Organization, res);
    });
  },

  /**
  * @api {delete} /organization/:id Remove organization
  * @apiName Remove Organization
  * @apiGroup Organization
  * @apiVersion 0.0.1
  *
  * @apiParam {String} id      employee's id
  *
  * @apiUse OrganizationParams
  *
  * @apiSuccessExample Success-Response
  * HTTP/1.1 200 OK
  * {
  *    "response": {
  *       "message": "Organization removed successfully",
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
    Organization.update(
      { id: id, isDeleted: false },
      { isDeleted: true }
    ).then((deletedOrganization) => {
      if (!deletedOrganization.length) {
        return ResponseService.json(404, res, 'Organization not found');
      }

      return ResponseService.json(
        200, res, 'Organization removed successfully', deletedOrganization[0]
      );
    }).catch(err => {
      return ValidationService.jsonResolveError(err, Organization, res);
    });
  },
};
