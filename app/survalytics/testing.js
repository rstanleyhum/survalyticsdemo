import { NewQuestion } from './question';
import { InsertQuestions, GetAllQuestions } from './localdb';


var awsReturnData = require('../assets/aws_data.json');


export const GetAWSReturnData = () => {
    console.log(awsReturnData.length);
    console.log(JSON.stringify(awsReturnData, null, 2));
    return awsReturnData;
}

export const InsertIntoLocalDB = async () => {
    console.log("Insert Into Local DB");
    let data = GetAWSReturnData();
    
    let localq = await GetAllQuestions();

    console.log(localq.length);

    let localguids = localq.map( (item, idx) => {
        return item.questionguid_str
    });

    console.log(localguids);

    
    let num = data.length;

    var l = [];
    var processes = [];

    for (var i = 0; i < num; i ++) {
        var q = NewQuestion(data[i].questionguid_str.S, data[i].json_str.S, data[i].ordinalposition_int.N);
        
        if (localguids.indexOf(q.questionguid_str) >= 0) {
            continue;
        }

        l.push(q);
        //var p = InsertQuestion(q);
        //processes.push(p);
    }


    console.log(l.length);

    let values = await InsertQuestions(l);
    // for (var i = 0; i < num; i++) {
    //     console.log(JSON.stringify(l[i], null, 2));
    // }

    // var p1 = InsertQuestion(l[0]);
    // var p2 = InsertQuestion(l[1]);

    //let values = await Promise.all(processes);

    console.log(values);

    
    // for (var i = 0; i < 2; i++) {
    //     console.log(JSON.stringify(l[i], null, 2));
    // }

}