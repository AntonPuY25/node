import {NextFunction, Request, Response, Router} from "express";
import {productRepository} from "../../Repositories/Video/video-repository";


export const videoRoute = Router()
const { body, validationResult } = require('express-validator');

const errorMiddleWAre = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
};


const titleCorrectValidatorMiddleWare = (req:Request, res:Response, next:NextFunction)=>{
    const title = req.body.title;
    if(!title || !title.length ){
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "Incorrect Title",
                    "field": "title"
                }
            ]
        })
        return
    }else{
        next()
    }
}

const titleMaxLengthValidator = (req:Request, res:Response, next:NextFunction)=>{
    const title = req.body.title;
    if(title && title.length > 40 ){
        res.status(400).send({"errorsMessages":[{"message":"Title length is not valid","field":"title"}]})
        return
    }else{
        next()
    }
}

const videoIdMiddleWare = (req:Request, res:Response, next:NextFunction)=>{
    const id = req.params.id;
    if(!id){
        res.send(404)
    }else{
        next()
    }
}


videoRoute.get('/',
    (req:Request, res:Response) => {
        res.status(200).send(productRepository.getVideo())
    })

videoRoute.get('/:id', videoIdMiddleWare,(req:Request, res:Response) => {
    const currentVideo = productRepository.findVideo(+req.params.id)
    if(currentVideo){
        res.send(currentVideo)
    }else{
        res.send(404)
    }
})

videoRoute.post('/',titleMaxLengthValidator,titleCorrectValidatorMiddleWare, errorMiddleWAre,(req: Request, res: Response) => {

    const  newVideo = productRepository.createVideo(req.body.title)
    res.status(201).send(newVideo)
})


videoRoute.put('/:id',videoIdMiddleWare,titleMaxLengthValidator,titleCorrectValidatorMiddleWare, errorMiddleWAre,(req: Request, res: Response)=> {

    const videos = productRepository.updateVideo(+req.params.id, req.body.title)

    if (videos?.length) {
        res.send(204)
    } else {
        res.send(404)
    }
})

videoRoute.delete('/:id',videoIdMiddleWare,(req: Request, res: Response)=>{
    const deletedVideos = productRepository.deleteVideo(+req.params.id)
    if(deletedVideos?.length){
        res.send(204)
    }else{
        res.send(404)
    }
})
