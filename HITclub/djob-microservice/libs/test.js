let orderArr = ['project_id', 'worklog_id', 'issue_id', 'version_id'];
let resultArray = [
    {
        issue_id: 1,
        worklog_id: 5,
        project_id: 1,
        version_id: 12
    //    ..........
    },
    {
        issue_id: 1,
        worklog_id: 5,
        project_id: 1,
        version_id: 12
    //    ..........
    },
    {
        issue_id: 1,
        worklog_id: 7,
        project_id: 1,
        version_id: 12
    //    ..........
    },
    {
        issue_id: 2,
        worklog_id: 8,
        project_id: 3,
        version_id: 12
    //    ..........
    },
    {
        issue_id: 2,
        worklog_id: 1,
        project_id: 3,
        version_id: 13
    //    ..........
    }
];

{
    '1': {
        5: {...,
        7: {...,
    },
    '3': {

    }
}


let currentPosition = {
    childs: {}
};
for(let i=0;i<orderArr.length;i++){
    currentPosition = currentPosition[orderArr[i]];

    for(let j=0;j<resultArray.length;j++){
        if(!currentPosition.childs[resultArray[j][orderArr[i]]]){
            currentPosition.childs[resultArray[j][orderArr[i]]] = getItemInfo(orderArr[i]);
        }
    }
}


function getItemInfo(key, item) {
    let resData = null;
    switch (key){
        case 'project_id':
            resData = {
                projectName: item.name,
                projectIcon: item.icon,
                // .......
                childs: {}
            };
            break;
        case 'worklog_id':
            resData = {
                worklogName: item.name,
                worklogComment: item.worklogComment,
                // .......
                childs: {}
            };
            break;
    //        ............
    }

}