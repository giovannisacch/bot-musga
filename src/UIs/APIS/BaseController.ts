import express from "express";
import cors from 'cors';

class BaseController{
    app : express
    port : number
    
    constructor() {
        this.app = express();
        this.port = Number.parseInt(process.env.port ?? "3000");
        this.app.use(cors())

        this.app.get('/teste', async (req, res) => {
            res.send('opa')
        });
    }
}
export default BaseController;