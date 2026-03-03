import express from 'express';
import  { connDB } from './DB/dbConnection.js';
import authRoutes from './Src/modules/auth/routes/auth.routes.js';

const app = express();
const port = 3000;
app.use(express.json());

app.use("/api/v1/auth",authRoutes)



connDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port port`);
});


