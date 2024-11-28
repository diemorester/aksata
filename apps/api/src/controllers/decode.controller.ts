import { Request, Response } from "express";

export class DecodeController{
    async DecodeController(req: Request, res: Response) {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).send({
                    status: 'unauthorised',
                    msg: 'invalid token'
                })
            }
            return res.status(200).send({
                user
            })
        } catch (error) {
            return res.status(400).send({
                status: 'error',
                msg: 'token expired/invalid'
            })
        }
    }
}