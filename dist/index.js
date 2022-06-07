"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const videos_router_1 = require("./Routes/videos/videos-router");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use((0, body_parser_1.default)());
const testMiddleWare = (req, res, next) => {
    console.log('Hello');
    next();
};
app.use(testMiddleWare);
const parserMiddleWare = (0, body_parser_1.default)({});
app.use(parserMiddleWare);
app.use('/videos', videos_router_1.videoRoute);
app.get('/', (req, res) => {
    res.send('Hello World1');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map