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
        port: env.port ?? 3002,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop',
        open: env.open,
    };

    const config: Configuration = buildWebpack(buildOptions);
    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'admin',
        filename: 'remoteEntry.js',
        exposes: {
            './Router': './src/router/Router.tsx',
        },
        shared: {
            ...PackageJson.dependencies,
            react: {
                eager: true,
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

