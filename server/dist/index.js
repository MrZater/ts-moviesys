"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const MovieRoute_1 = __importDefault(require("./routes/MovieRoute"));
const UploadRoute_1 = __importDefault(require("./routes/UploadRoute"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, connect_history_api_fallback_1.default)());
app.use('/', express_1.default.static(path_1.default.join(__dirname, 'public/build')));
app.use('/upload', express_1.default.static(path_1.default.join(__dirname, 'public/upload')));
app.use(require('./corsMiddlewave'));
app.use(express_1.default.json());
app.use('/api/movie', MovieRoute_1.default);
app.use('/api/upload', UploadRoute_1.default);
app.listen(3000);