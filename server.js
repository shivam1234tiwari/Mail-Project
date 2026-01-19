const express=require('express');
const dotenv=require('dotenv');
const nodemailer=require('nodemailer');
const path=require('path');
// const fs=require('fs);
const app=express();
const port=process.env.PORT||3000
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join('public')));
app.set('view engine','ejs');

const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'shivam25700@gmail.com',
        pass:'ritlyyfbdhetdylt'
    }
})
app.post('/send-email',async(req,res)=>{
    const {to,subject,text}=req.body;
    // const template=fs.readfile('./views/email-template.ejs');
    // const html=ejs.render(template,{name:"john"})
    try{
        const info=await transporter.sendMail({
            from:'"Shivam" <shivam25700@gmail.com>',
            to:to,
            subject:subject,
            text:text
            // html:html 
            // attachments:[
            //     {
            //         filename:'data.pdf',
            //         path:path.json(__dirname,'files','data.pdf')
            //     }
            // ]          
        })
        // res.json({message:"email Send Sccuessfully",info});
        res.redirect('/');
    }catch(error){
        res.status(500).json({message:"Failed to send email",error});
    }
})

app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})