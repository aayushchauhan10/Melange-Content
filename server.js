import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// CORS middleware to allow requests from your React app (update with your frontend URL)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://melange-content-page.netlify.app');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/send-email', async (req, res) => {
    const {
        name,
        email,
        phone,
        need,
        budget,
        message
    } = req.body;

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Update with your email service (e.g., 'gmail')
        auth: {
            user: 'ai.ronycode@gmail.com', // Update with your email address
            pass: 'msgx chrq cokf qlhj' // Update with your email password
        }
    });

    // Define email options
    const mailOptions = {
        from: ${email},
        to: 'ai.ronycode@gmail.com', // Update with your recipient email address
        subject: 'New Form Submission',
        text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Need: ${need}
      Budget: ${budget}
      Message: ${message}
    `
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});