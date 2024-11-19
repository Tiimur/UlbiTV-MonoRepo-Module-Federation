import path from 'path';
import webpack, { Configuration } from 'webpack';
import {BuildMode, BuildPlatform, BuildPaths, BuildOptions, buildWebpack} from '@packages/build-config';
import PackageJson from './package.json';

export interface EnvVariables {
    mode?: BuildMode;
    analyzer?: boolean;
    port?: number;
    platform?: BuildPlatform;
    SHOP_REMOTE_URL?: string;
    ADMON_REMOTE_URL?: string;
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
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop',
    };

    const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? `http://localhost:3001`;
    const ADMON_REMOTE_URL = env.ADMON_REMOTE_URL ?? `http://localhost:3002`;
    const config: Configuration = buildWebpack(buildOptions);
    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',
        
        remotes: {
            shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`, // указываем точку входа
            admin: `admin@${ADMON_REMOTE_URL}/remoteEntry.js`,
        },
        
        shared: {
            // указываем, какие библиотеки общие, и какие библиотеки должны распространяться на все сервисы. Также можно указать требуемую версию
            ...PackageJson.dependencies,
            react: {
                eager: true, // говорим о необходимости мгновенной подгрузки библиотке, в отличии от lazy loading
                //requiredVersion: PackageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                //requiredVersion: PackageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                //requiredVersion: PackageJson.dependencies['react-dom'],
            },
        },

    }));
    console.log(config);
    return config;
}

