import { NewQuestion } from '../survalytics/services/question';
import { InsertQuestions, GetAllQuestions } from '../survalytics/services/localdb';


var awsReturnData = require('../assets/aws_data.json');


export const GetAWSReturnData = () => {
    return awsReturnData;
}

export const InsertIntoLocalDB = async () => {
    let data = GetAWSReturnData();
    
    let localq = await GetAllQuestions();

    let localguids = localq.map( (item, idx) => {
        return item.questionguid_str
    });
    
    let num = data.length;

    var l = [];
    var processes = [];

    for (var i = 0; i < num; i ++) {

        var q = await NewQuestion(data[i].questionguid_str.S, data[i].json_str.S, data[i].ordinalposition_int.N);
        
        if (localguids.indexOf(q.questionguid_str) >= 0) {
            continue;
        }

        l.push(q);
    }

    let values = await InsertQuestions(l);

}