const express = require('express'); 
const app = express();
const { DBConnection } = require('./database/db.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const AuthRoutes = require('./routes/Auth.js');
const AdminRoutes = require('./routes/AdminRoutes.js');
const ProblemRoutes = require('./routes/ProblemRoute.js');
const SubmissionRoutes = require('./routes/SubmissionRoute.js');
const ContestRoutes = require('./routes/ContestRoutes.js');
const PORT=process.env.PORT || 8000
// Middlewares
app.use(express.json());

app.use(cookieParser());


app.use(cors({
    origin: 'http://localhost:3000', // your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // if you are using cookies
  }));

// Initialize database
DBConnection();

app.use('/api/auth',AuthRoutes)
app.use('/api/admin',AdminRoutes)
app.use('/api',ProblemRoutes)
app.use('/api', ContestRoutes)

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
});