/**
 * @see https://webpack.js.org/configuration/dev-server/
 */
import {join} from 'path';

import {rootDir} from '../utils/env';

export const aliasItems = {
    '@src': join(rootDir, '/src'),
    '@images': join(rootDir, '/src/images'),
    '@styles': join(rootDir, '/src/shared/styles'),
    '@api': join(rootDir, '/src/shared/api'),
    '@components': join(rootDir, '/src/shared/components'),
    '@shared': join(rootDir, '/src/shared'),
    '@models': join(rootDir, '/src/shared/models'),
    '@views': join(rootDir, '/src/views'),
    '@store': join(rootDir, '/src/shared/store'),
    '@features': join(rootDir, '/src/features'),
    '@entities': join(rootDir, '/src/entities'),
    '@widgets': join(rootDir, '/src/widgets'),
};
