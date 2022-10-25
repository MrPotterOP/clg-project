// import Mailjet from "node-mailjet";
import SibApiV3Sdk from "sib-api-v3-sdk";

import dotenv from "dotenv";

dotenv.config();



 let defaultClient = SibApiV3Sdk.ApiClient.instance;
 
 let apiKey = defaultClient.authentications['api-key'];
 apiKey.apiKey = process.env.SBAPIKEY;
 
 let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
 
 let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();


const sendMail = (email, name, OTP)=>{

  



  const emailTemplate = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">MCQ PORTAL</a>
    </div>
    <p style="font-size:1.1em">Hi, ${name}</p>
    <p>Welcome to MCQ PORTAL VERIFICATION. Use the following OTP to complete your verification procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />MCQ PORTAL</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>MCQ PORTAL</p>
      <p>COETA</p>
      <p>AKOLA</p>
    </div>
  </div>
  </div>`
  
  const too = {email: email, name: name};
  console.log(too);



 
 sendSmtpEmail.subject = "My {{params.subject}}";
 sendSmtpEmail.htmlContent = emailTemplate;
 sendSmtpEmail.sender = {"name":"MCQ PORTAL","email":"shubhamubarhande1114@gmail.com"};
 sendSmtpEmail.to = [{...too}];
//  sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"Janice Doe"}];
//  sendSmtpEmail.bcc = [{"email":"John Doe","name":"example@example.com"}];
 sendSmtpEmail.replyTo = {"email":"shubhamubarhande1114@gmail.com","name":"Shubham UBarhande"};
 sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
 sendSmtpEmail.params = {"subject":"OTP VERIFICATION"};
 
 apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
   console.log('API called successfully. Returned data: ' + JSON.stringify(data));
 }, function(error) {
   console.error(error);
 });

  
}

// const sendMail = (email, name, OTP) =>{
//     const mailjet = Mailjet.apiConnect(
//         process.env.JETAPIKEY,
//         process.env.JETSECKEY,
//     );
// const emailTemplate = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
//     <div style="margin:50px auto;width:70%;padding:20px 0">
//       <div style="border-bottom:1px solid #eee">
//         <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">MCQ PORTAL</a>
//       </div>
//       <p style="font-size:1.1em">Hi, ${name}</p>
//       <p>Welcome to MCQ PORTAL VERIFICATION. Use the following OTP to complete your verification procedures. OTP is valid for 5 minutes</p>
//       <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
//       <p style="font-size:0.9em;">Regards,<br />MCQ PORTAL</p>
//       <hr style="border:none;border-top:1px solid #eee" />
//       <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
//         <p>MCQ PORTAL</p>
//         <p>COETA</p>
//         <p>AKOLA</p>
//       </div>
//     </div>
//   </div>`


    
//     const request = mailjet
//             .post('send', { version: 'v3.1' })
//             .request({
//               Messages: [
//                 {
//                   From: {
//                     Email: "shubhamubarhandeawm@gmail.com",
//                     Name: "MCQ PORTAL VERIFICAION"
//                   },
//                   To: [
//                     {
//                       Email: email,
//                       Name: name
//                     }
//                   ],
//                   Subject: "Verify Your Email To Access MCQ PORTAL SERVICES.",
//                   HTMLPart: emailTemplate
//                 }
//               ]
//             })
    
//     request
//         .then((result) => {
//             console.log(result);
//         })
//         .catch((err) => {
//             console.log(result);
//         })
// }



export default sendMail;