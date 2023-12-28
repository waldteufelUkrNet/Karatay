var express = require('express');
var router = express.Router();
var publisher = require('../../../libs/publisher');


/** @api {get} /mobile_api/v1/specialty/list Список специальностей
 * @apiName SpecialtyList
 * @apiGroup Specialty
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": [
        {
            "name": "GR1",
            "info": "Info field",
            "group_id": "5de8ba7ed8533e18410ed35c"
        },
        {
            "name": "GR1",
            "info": "Info field",
            "group_id": "5de8ba7ed8533e18410ed35c"
        }
    ]
}
 */
router.get('/list', async function (req, res, next) {
    publisher.sendTask( 'get_list_specialities', req, res, {});
});

/** @api {get} /mobile_api/v1/specialty/group_list Список групп специальностей
 * @apiName SpecialtyList
 * @apiGroup Specialty
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": [
        {
            "name": "123",
            "_id": "5de8ba7ed8533e18410ed35c"
        }
    ]
}
 */
router.get('/group_list', async function (req, res, next) {
    publisher.sendTask( 'get_group_list', req, res,
        {
            search: req.query.search ? req.query.search : null
        });
});

/** @api {get} /mobile_api/v1/specialty/list_detailed Список специальностей (детальный)
 * @apiName SpecialtyDetailedList
 * @apiGroup Specialty
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": {
        "configs": {
            "senior_order_count_needed": 10,
            "middle_order_count_needed": 3
        },
        "specialties": [
            {
                "name": "GR1",
                "info": "Info field",
                "group_id": "5de8ba7ed8533e18410ed35c",
                "enabled": true,
                "_id": "5de8bb8d05158d1b6d10eb6f"
            },
            {
                "name": "GR1",
                "info": "Info field",
                "group_id": "5de8ba7ed8533e18410ed35c",
                "enabled": true,
                "_id": "5de8bb90e6f7501b98db2ec4"
            }
        ]
    }
}
 */
router.get('/list_detailed', async function (req, res, next) {
    publisher.sendTask( 'get_list_detailed_specialities', req, res, {});
});

/** @api {get} /mobile_api/v1/specialty/:id Детали специальности
 * @apiName SpecialtyInfo
 * @apiGroup Specialty
 * @apiVersion 1.0.0
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": {
        "name": "GR1",
        "info": "Info field",
        "group_id": "5de8ba7ed8533e18410ed35c",
        "enabled": true,
        "_id": "5de8bb8d05158d1b6d10eb6f"
    }
}
 */
router.get('/:id', async function (req, res, next) {
    let {id} = req.params;

    publisher.sendTask( 'get_speciality_detail', req, res, {id});
});

module.exports = router;
