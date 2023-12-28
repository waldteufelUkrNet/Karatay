var exports = module.exports = {};

async function adminSupportInfo(input) {
    let resp;

    if(Array.isArray(input)){
        resp = [];

        for(let i=0; i<input.length; i++)
            resp.push(await adminSupportInfo(input[i]));

        return resp;
    }

    resp = {
        id: input._id,
        email: input.email,
        text: input.text,
        phone: input.phone,
        status: input.status,
        createdAt: input.createdAt
    };

    return resp;
}

exports.adminSupportInfo=adminSupportInfo;
