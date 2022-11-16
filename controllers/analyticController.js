const analytic = require('./../models/analytic')
const nodemailer = require("nodemailer");

exports.getAll = async (req, res) => {
  if (Object.keys(req.params).length === 0 && req.params.portfolio_id === undefined) {
    throw '400:Parameter not Valid'
  }
  let total = await analytic.totalWeightage(req.params.portfolio_id);
  let result = await analytic.getAll(req.params.portfolio_id)
  res.json({ total: total, data: result })
};

exports.printcanquestions = async (req, res) => {

  if (Object.keys(req.params).length === 0 && req.params.candidate_id === undefined) {
    throw '400:Parameter not Valid'
  }
  //let sendmail = await analytic.mail(req.params.candidate_id)
  let result = await analytic.printcanquestions(req.params.candidate_id)
  res.json({ data: result })
};
exports.printcanquestionstwo = async (req, res) => {

  if (Object.keys(req.params).length === 0 && req.params.candidate_id === undefined) {
    throw '400:Parameter not Valid'
  }

  let result = await analytic.printcanquestionstwo(req.params.candidate_id)
  res.json({ data: result })
};
//msg: sendmail,
exports.getmarks = async (req, res) => {
  let data = await analytic.getmarks();

  res.json({ data: data })
};

exports.getallqstns = async (req, res) => {
  let data = await analytic.getallqstns();

  res.json({ data: data })
};
exports.insertresult = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw '400:Parameter not Valid'
  }
  const { details, type } = req.body
  let data = await analytic.insertresult(details, type);

  res.json({ data: data })
}
exports.getcustomcandidateqstnmarks = async (req, res) => {
  //let insertresult = await analytic.insertresult(req.body.candidate_id);
  let data = await analytic.getcustomcandidateqstnmarks(req.body.candidate_id);

  res.json({ data: data })
};
exports.getcandidateqstnmarks = async (req, res) => {
  //let insertresult = await analytic.insertresult(req.body.candidate_id);
  let data = await analytic.getcandidateqstnmarks(req.body.candidate_id);

  res.json({ data: data })
};
exports.fetch = async (req, res) => {
  //let total = await analytic.totalWe(); 
  let result = await analytic.fetch(req.body.testlog_id, req.body.candidate_id)
  res.json({ data: result })
};

exports.customquestions = async (req, res) => {
  let result = await analytic.customquestions(req.body.testlog_id, req.body.candidate_id)
  res.json({ data: result })
};

exports.insertcandidate = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw '400:Parameter not Valid'
  }

  const result = await analytic.insertcandidate(req.body)
  res.json({
    message: `candidate inserted successfully`,
    insert_id: result
  })
};
exports.insertqstn = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw '400:Parameter not Valid'
  }

  const result = await analytic.insertqstn(req.body)
  res.json({
    message: `questions inserted successfully`,
    insert_id: result
  })
};

exports.editqstn = async (req, res) => {

  if (Object.keys(req.params).length === 0 && req.params.question_id === undefined) {
    throw '400:Parameter not Valid'
  }
  //let sendmail = await analytic.mail(req.params.candidate_id)
  let result = await analytic.editqstn(req.params.question_id, req.body)
  res.json({ data: result })
};


// exports.upexcel = async (req, res) => {
//   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//     throw '400:Parameter not Valid'
//   }

//   const result = await analytic.insert( req.body )
//   res.json({
//     message: `analytic insert successfully`,
//     insert_id : result
//   })
// };

exports.delete = async (req, res) => {
  if (Object.keys(req.params).length === 0 && req.params.analytic_id === undefined) {
    throw '400:Parameter not Valid'
  }

  const result = await analytic.delete(req.params)
  res.json({
    message: 'record delete successfully'
  })

};

exports.deletecan = async (req, res) => {
  // if (Object.keys(req.params).length === 0 && req.param === undefined) {
  //   throw '400:Parameter not Valid'
  // }

  const result = await analytic.deletecan(req.params)
  res.json({
    message: 'record delete successfully'
  })

};
// exports.uploadRecord = async (req,res) => {

//   const result = await analytic.uploadRecord()
//     res.json({
//       message: `analytic updated successfully`,
//     })
// }

exports.postUploadRecord = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw '400:Parameter not Valid'
  }
  const result = await analytic.postUploadRecord(req.body)
  res.json({
    message: `analytic updated successfully`,
  })
}

exports.upload = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw '400:Parameter not Valid'
  }
  const result = await analytic.upload(req.body)
  res.json({
    message: `analytic updated successfully`,
    insert_id: result
  })
}

exports.uploadnse = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw '400:Parameter not Valid'
  }
  const result = await analytic.uploadnse(req.body)
  res.json({
    message: `analytic updated successfully`,
    insert_id: result
  })
}

exports.updateRecord = async (req, res) => {
  if (Object.keys(req.params).length === 0 && req.params.analytic_id === undefined) {
    throw '400:Parameter not Valid'
  }
  const result = await analytic.updateRecord(req.params.analytic_id, req.body)
  res.json({
    message: `analytic updated successfully`,
  })

}

exports.starttest = async (req, res) => {
  if (Object.keys(req.body).length === 0 && req.body.candidate_id === undefined) {
    throw '400:Parameter not Valid'
  }
  const result = await analytic.starttest(req.body.candidate_id, req.body.company_id, req.body.category_id)
  res.json({
    message: `analytic updated successfully`,
    'check': 1,
    testlog_id: result
  })

}
exports.starttesttwo = async (req, res) => {
  if (Object.keys(req.body).length === 0 && req.body.candidate_id === undefined) {
    throw '400:Parameter not Valid'
  }
  const result = await analytic.starttesttwo(req.body.candidate_id, req.body.company_id, req.body.uniquedate)
  res.json({
    message: `analytic updated successfully`,
    'check': 1,
    testlog_id: result
  })

}

exports.answertest = async (req, res) => {
  if (Object.keys(req.body).length === 0 && req.body.candidate_id === undefined) {
    throw '400:Parameter not Valid'
  }
  await analytic.answertest(req.body.testlog_id, req.body.candidate_id, req.body.userAnswers, req.body.timepassed)
  res.json({
    message: `analytic updated successfully`,
  })

}
exports.deleteqstn = async (req, res) => {
  if (Object.keys(req.params).length === 0 && req.params.question_id === undefined) {
    throw '400:Parameter not Valid'
  }

  const result = await analytic.deleteqstn(req.params)
  res.json({
    message: 'record delete successfully'
  })

}
exports.deletecategory = async (req, res) => {
  if (Object.keys(req.params).length === 0 && req.params.category_id === undefined) {
    throw '400:Parameter not Valid'
  }

  const result = await analytic.deletecategory(req.params)
  res.json({
    message: 'category deleted successfully'
  })
}

exports.editcategory = async (req, res) => {

  if (Object.keys(req.params).length === 0 && req.params.category_id === undefined) {
    throw '400:Parameter not Valid'
  }
  //let sendmail = await analytic.mail(req.params.candidate_id)
  let result = await analytic.editcategory(req.params.category_id, req.body)
  res.json({ data: result })
};

exports.deleteresults = async (req, res) => {
  if (Object.keys(req.params).length === 0 && req.params.candidate_id === undefined) {
    throw '400:Parameter not Valid'
  }
  //let sendmail = await analytic.mail(req.params.candidate_id)
  let result = await analytic.deleteresults(req.params)
  res.json({ data: result })

}
// exports.update = async (req,res) => {
//   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
//     throw '400:Parameter not Valid'
//   }
//   const result = await analytic.update( req.body )
//     res.json({
//       message: `analytic updated successfully`,
//       insert_id : result
//     })
// }

