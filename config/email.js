  
 const nodemailer = require('nodemailer')
 
 const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: 'jhonmitchelupn@gmail.com', 
      pass: 'rapsnpbhajbelmmj', 
    },
});

transporter.verify().then(()=>{
    console.log("Listo para enviar el email");
})

module.exports = transporter;