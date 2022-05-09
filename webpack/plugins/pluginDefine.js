import {DefinePlugin} from 'webpack';

/**
 * Created by: Umrzoq Toshkentov
 * @example
 * const config = {
 *     isProd: true
 * }
 */
import {isDev, isDevServer, isProd, mode} from '../utils/env';

require('dotenv').config();

const config = {
    'process.env': {
        NODE_ENV: JSON.stringify(mode),
        BASI_API_URL: JSON.stringify(process.env.BASI_API_URL),
    },
    IS_PROD: isProd,
    IS_DEV: isDev,
    IS_DEV_SERVER: isDevServer,
};

export const definePlugin = new DefinePlugin(config);
