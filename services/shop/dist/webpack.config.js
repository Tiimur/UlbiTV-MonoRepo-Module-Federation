var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from '@packages/build-config';
import PackageJson from './package.json';
var dir = __dirname;
// ES Export system
export default (function (env) {
    var _a, _b, _c;
    var paths = {
        entry: path.resolve(dir, 'src', 'index.tsx'),
        html: path.resolve(dir, 'public', 'index.html'),
        public: path.resolve(dir, 'public'),
        output: path.resolve(dir, 'build'),
        src: path.resolve(dir, 'src'),
    };
    var buildOptions = {
        port: (_a = env.port) !== null && _a !== void 0 ? _a : 3001,
        mode: (_b = env.mode) !== null && _b !== void 0 ? _b : 'development',
        paths: paths,
        analyzer: env.analyzer,
        platform: (_c = env.platform) !== null && _c !== void 0 ? _c : 'desktop',
        open: env.open,
    };
    var config = buildWebpack(buildOptions);
    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'shop', // название микрофронтенда
        filename: 'remoteEntry.js', // название выходного файла, который удалённо будет подключаться в hostContainer, это его название по умолчанию
        exposes: {
            './Router': './src/router/Router.tsx',
        },
        shared: __assign(__assign({}, PackageJson.dependencies), { react: {
                eager: true, // говорим о необходимости мгновенной подгрузки библиотке, в отличии от lazy loading
                requiredVersion: PackageJson.dependencies['react'],
            }, 'react-router-dom': {
                eager: true,
                requiredVersion: PackageJson.dependencies['react-router-dom'],
            }, 'react-dom': {
                eager: true,
                requiredVersion: PackageJson.dependencies['react-dom'],
            } }),
    }));
    return config;
});
