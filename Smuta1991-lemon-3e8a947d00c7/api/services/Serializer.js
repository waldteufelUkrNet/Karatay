
var def_field_info = {
    maxElems: 0,
    name: null,
    group: null
}; 


function handle (group, itemVal, removeEmpty, field_info) {
    removeEmpty = removeEmpty||false;
    field_info = field_info||def_field_info;

    if (_.isUndefined(itemVal) || _.isNull(itemVal) || !itemVal) {
        return itemVal;
    }

    if(_.isArray(itemVal)){
        itemVal = handleCollect(group, itemVal, removeEmpty, field_info.maxElems);
    } else if (_.isDate(itemVal)){
        itemVal = itemVal.toISOString();
    } else if (_.isObject(itemVal)) {
        if (_.isFunction(itemVal.getGrpFields)) {
            itemVal = handleModel(group, itemVal, removeEmpty);
        }
        else {
            itemVal = handleCollect(group, itemVal, removeEmpty, field_info.maxElems);
        }
    }
    return itemVal;
}

function handleModel(group, obj, removeEmpty) {
    removeEmpty = removeEmpty||false;

    var map = obj.getGrpFields(group);

    var result = {};
    var itemVal;
    var field;
    var _group;
    var _name;
    var field_info;

    for (field in map) {
        field_info = map[field];
        _group = (field_info.group ? field_info.group : group);
        _name = (field_info.name ? field_info.name : field);

        if (typeof obj[field] == "function") {
            itemVal = obj[field]();
            itemVal = handle(_group, itemVal, removeEmpty, field_info);
        } else {
            itemVal = obj[field];
            itemVal = handle(_group, itemVal, removeEmpty, field_info);
        }

        if (itemVal==null  && removeEmpty) {
            continue;
        }
        result[_name] = itemVal;
    }
    return result;
}

function handleCollect(group, ar, removeEmpty, maxElems) {

    maxElems = maxElems||0;
    removeEmpty = removeEmpty||false;

    var result;
    var count = 0;

    if (_.isArray(ar)) {
        var result = [];
    } else {
        var result = {};
    }

    for (var i in ar) {
        result[i] = handle(group, ar[i], removeEmpty);
        count++;

        if (maxElems && maxElems == count) {
            break;
        }
    }
    return result;
}


module.exports = handle;