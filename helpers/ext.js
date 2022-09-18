import express from 'express';
import { unlink } from 'fs';
import { exec, execSync } from 'child_process';

const router = express.Router();


router.get('/', (req, res) => {
    res.send('hi~');
});

router.post('/test', async(req, res) => {
    console.log(req.body);
    const cmd ='SnippingTool.exe';
    exec(cmd);
    
    res.send(req.body);
});

export default router;
