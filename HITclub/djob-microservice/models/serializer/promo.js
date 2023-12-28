var exports = module.exports = {};

async function adminPromoInfo(input) {
    let resp = {
        id: input._id,
        code: input.code,
        type: input.type,
        amount: input.amount,
        customer_id: input.customer_id,
        active: input.active,
        activated_date: input.activated_date
    };
    return resp;
}

async function adminExecutorPromoInfo(input) {
    let resp = {
        id: input._id,
        code: input.code,
        type: input.type,
        amount: input.amount,
        executor_id: input.executor_id,
        active: input.active,
        activated_date: input.activated_date
    };
    return resp;
}

exports.adminPromoInfo=adminPromoInfo;
exports.adminExecutorPromoInfo=adminExecutorPromoInfo;
