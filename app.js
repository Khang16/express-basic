import express from 'express';
import router from './routes/index.js';
const app = express();
app.use(express.json());
router(app);
app.use(
    (err,req,res,next)=>{
        console.log(err.stack);
        res.status(500).send('Something broke!');
    }
)
export default app;