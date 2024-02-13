const AWS = require("aws-sdk");
var ejs = require('ejs');
var fs = require('fs');

// Set the region
const awsConfig = {
  accessKeyId: "AKIAZZYGXMSD24YP6F3Y",
  secretAccessKey: "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",
  region: "us-west-2",
};
AWS.config.update(awsConfig);

// Create SES service object
const ses = new AWS.SES({ apiVersion: "2012-11-05" });

function sendEmail(data,template) {
// console.log(data)
 var templateString = fs.readFileSync(template, 'utf-8');
  const data1 =ejs.render(templateString,data);

  // Send email
  const params = {
    Destination: {
      ToAddresses: [data.email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: data1,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `${data.subject}`,
      },
    },
    Source: "Admin@ihostyourpet.com",
  };

  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log("Email sent successfully!", data);
    return data;
  });
  
}

module.exports = { sendEmail };