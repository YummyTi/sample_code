import {compose} from '@shared/helpers';

import withi18n from './withi18n';
import withMui from './withMui';
import withReactquery from './withReactQuery';
import withRouter from './withRouter';

export const withHocs = compose(withRouter, withReactquery, withi18n, withMui);
