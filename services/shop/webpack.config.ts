import path from 'path';
import webpack, { Configuration } from 'webpack';
import {BuildMode, BuildPlatform, BuildPaths, BuildOptions, buildWebpack} from '@packages/build-config';
import PackageJson from './package.json';
 
export interface EnvVariables {
    mode?: BuildMode;
    analyzer?: boolean;
    port?: number;
    platform?: BuildPlatform;
    open?: boolean;
}

const dir: string = __dirname;

// ES Export system
export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        entry: path.resolve(dir, 'src', 'index.tsx'),
        html: path.resolve(dir, 'public', 'index.html'),
        public: path.resolve(dir, 'public'),
        output: path.resolve(dir, 'build'),
        src: path.resolve(dir, 'src'),
    };
    const buildOptions: BuildOptions = {
        port: env.port ?? 3001,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop',
        open: env.open,
    };

    const config: Configuration = buildWebpack(buildOptions);
    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'shop', // название микрофронтенда
        filename: 'remoteEntry.js', // название выходного файла, который удалённо будет подключаться в hostContainer, это его название по умолчанию
        exposes: { // открывает доступ к модулям из вне, предоставляет возможность загрузить модуль в hostContainer, в параметре remotes
            './Router': './src/router/Router.tsx',
        },
        shared: { // указываем, какие библиотеки общие, и какие библиотеки должны распространяться на все сервисы. Также можно указать требуемую версию
            ...PackageJson.dependencies,
            react: {
                eager: true, // говорим о необходимости мгновенной подгрузки библиотке, в отличии от lazy loading
                requiredVersion: PackageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: PackageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                requiredVersion: PackageJson.dependencies['react-dom'],
            },
        },
    }));
    return config;
}

