import express from 'express';
import router from './routes/index.js';
import { handlerError } from './common/helper.js';
const app = express();
app.use(express.json());
router(app);
app.use(
    (err,req,res,next)=>{
        handlerError(res,err);
    }
)
export default app;