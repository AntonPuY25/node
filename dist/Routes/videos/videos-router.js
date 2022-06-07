"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRoute = void 0;
const express_1 = require("express");
const video_repository_1 = require("../../Repositories/Video/video-repository");
exports.videoRoute = (0, express_1.Router)();
const { body, validationResult } = require('express-validator');
const errorMiddleWAre = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
const titleCorrectValidatorMiddleWare = (req, res, next) => {
    const title = req.body.title;
    if (!title || !title.length) {
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "Incorrect Title",
                    "field": "title"
                }
            ]
        });
        return;
    }
    else {
        next();
    }
};
const titleMaxLengthValidator = (req, res, next) => {
    const title = req.body.title;
    if (title && title.length > 40) {
        res.status(400).send({ "errorsMessages": [{ "message": "Title length is not valid", "field": "title" }] });
        return;
    }
    else {
        next();
    }
};
const videoIdMiddleWare = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        res.send(404);
    }
    else {
        next();
    }
};
exports.videoRoute.get('/', (req, res) => {
    res.status(200).send(video_repository_1.productRepository.getVideo());
});
exports.videoRoute.get('/:id', videoIdMiddleWare, (req, res) => {
    const currentVideo = video_repository_1.productRepository.findVideo(+req.params.id);
    if (currentVideo) {
        res.send(currentVideo);
    }
    else {
        res.send(404);
    }
});
exports.videoRoute.post('/', titleMaxLengthValidator, titleCorrectValidatorMiddleWare, errorMiddleWAre, (req, res) => {
    const newVideo = video_repository_1.productRepository.createVideo(req.body.title);
    res.status(201).send(newVideo);
});
exports.videoRoute.put('/:id', videoIdMiddleWare, titleMaxLengthValidator, titleCorrectValidatorMiddleWare, errorMiddleWAre, (req, res) => {
    const videos = video_repository_1.productRepository.updateVideo(+req.params.id, req.body.title);
    if (videos === null || videos === void 0 ? void 0 : videos.length) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.videoRoute.delete('/:id', videoIdMiddleWare, (req, res) => {
    const deletedVideos = video_repository_1.productRepository.deleteVideo(+req.params.id);
    if (deletedVideos === null || deletedVideos === void 0 ? void 0 : deletedVideos.length) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
//# sourceMappingURL=videos-router.js.map