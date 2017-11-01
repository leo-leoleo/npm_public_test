require.context('./containers', true, /index\.jsx$/);
require.context('./containers', true, /reducer\.js$/);
require.context('./containers', true, /sagas\.js$/);
require.context('./translations', false, /\.json$/);
import 'intl';
import 'intl/locale-data/jsonp/en.js';