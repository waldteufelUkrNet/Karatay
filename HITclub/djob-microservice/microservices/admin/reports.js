var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true)

async function getReportsList(data) {
    return new Promise(async (response, reject) => {
        if(data.range)
            data.range = JSON.parse(data.range);

        let range = {
            start: data.range && data.range.start ? data.range.start : 0,
            limit: data.range && data.range.limit ? data.range.limit : 20,
        };

        let status_arr = [];

        if(data.filters){
            data.filters = JSON.parse(data.filters);

            if(data.filters.processed)
                status_arr.push(2);

            if(data.filters.not_processed)
                status_arr.push(1);
        }

        if(!status_arr.length)
            status_arr = [1, 2];

        let findCondition = {
            status: {$in: status_arr}
        };

        console.log('!!!!!!!!!!!!!!!!: ', findCondition);


        let reportsList = await api.OrderReport.aggregate([
            {$lookup:
                    {
                        from: 'customers',
                        localField: "customer_id",
                        foreignField: "_id",
                        as: "customer",
                    }
            },
            {$lookup:
                    {
                        from: 'executors',
                        localField: "executor_id",
                        foreignField: "_id",
                        as: "executor"
                    }
            },
            {$lookup:
                    {
                        from: 'orders',
                        localField: "order_id",
                        foreignField: "_id",
                        as: "order"
                    }
            },
            { $match: findCondition },
            { $skip: range.start },
            { $limit: range.limit }
        ]);
        // let reportsList = await api.OrderReport.find(findCondition).skip(range.start).limit(range.limit);

        reportsList = await api.Serialize('ADMIN_REPORTS_LIST',reportsList);
        response({
            status: "OK",
            error:null,
            data: reportsList
        });
    });

}

async function getReportsCount(data) {
    return new Promise(async (response, reject) => {
        let status_arr = [];

        if(data.filters){
            data.filters = JSON.parse(data.filters);

            if(data.filters.processed)
                status_arr.push(2);

            if(data.filters.not_processed)
                status_arr.push(1);
        }

        if(!status_arr.length)
            status_arr = [1, 2];

        let findCondition = {
            status: {$in: status_arr}
        };

        console.log('!!!!!!!!!!!???????????????!!!!!!!!!!!!!!!: ', findCondition);

        let count = await api.OrderReport.count(findCondition);
        response({
            status: "OK",
            error:null,
            data: count
        });
    });

}

async function updateReport(data) {
    return new Promise(async (response, reject) => {
        if(!data.id || !data.data || !data.data.status)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let report = await api.OrderReport.findById(data.id);
        report.status = data.data.status;
        await report.save();

        response({
            status: "OK",
            error:null,
            data: report
        });
    });

}

var exports = module.exports = {};
exports.getReportsList = getReportsList;
exports.updateReport = updateReport;
exports.getReportsCount = getReportsCount;
