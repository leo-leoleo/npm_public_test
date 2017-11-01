/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
// import 'aio.js';

/* eslint-disable import/no-unresolved, import/extensions */
// Load the favicon, the manifest.json file and the .htaccess file
import "file-loader?name=[name].[ext]!./favicon.ico";
import "!file-loader?name=[name].[ext]!./manifest.json";
import "file-loader?name=[name].[ext]!./.htaccess";
/* eslint-enable import/no-unresolved, import/extensions */

// Import all the third party stuff
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyRouterMiddleware, Router, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { useScroll } from "react-router-scroll";
import configureStore from "./store";
// logger 组件
import Logger from "js-logger";

// import SwalNotification from 'components/antd/notification/SwalNotification';
// Import Language Provider
import LanguageProvider from "containers/LanguageProvider";

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
// import styles from 'containers/App/styles.css';
import "containers/App/styles/index.less";

// // When Open Sans is loaded, add a font-family using Open Sans to the body
// openSansObserver.load().then(() => {
//   document.body.classList.add(styles.fontLoaded);
// }, () => {
//   document.body.classList.remove(styles.fontLoaded);
// });
// window.swal = SwalNotification;
// Import i18n messages
import { translationMessages } from "./i18n";

// Create redux store with history
// this uses the singleton hashHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const hashHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, hashHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { selectLocationState } from "containers/App/selectors";
const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState: selectLocationState()
});

// Set up the router, wrapping all Routes in the App component
import App from "containers/App";
import createRoutes from "./routes";
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store)
};

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <Router
          history={history}
          routes={rootRoute}
          render={// Scroll to top when going to a new page, imitating default browser
          // behaviour
          applyRouterMiddleware(useScroll())}
        />
      </LanguageProvider>
    </Provider>,
    document.getElementById("AppRoot")
  );
};

// 将logger放入window
Logger.useDefaults();
window.Logger = {
  debug: function(module, message, args) {
    this.message("debug", module, message, this._getArgs(arguments, 2));
  },
  info: function(module, message, args) {
    this.message("info", module, message, this._getArgs(arguments, 2));
  },
  warn: function(module, message, args) {
    this.message("warn", module, message, this._getArgs(arguments, 2));
  },
  error: function(module, message, args) {
    this.message("error", module, message, this._getArgs(arguments, 2));
  },
  message: function(level, module, message, args) {
    message =
      new Date().toLocaleTimeString() +
      " " +
      level +
      " ---- " +
      "[" +
      module +
      ".js] :" +
      message;
    var _args = [];
    _args[0] = message;
    for (var i = 0; i < args.length; i++) {
      _args[i + 1] = args[i];
    }
    Logger[level].apply(Logger, _args);
  },
  _getArgs: function(args, start) {
    var _args = [];
    for (var i = start; i < args.length; i++) {
      _args[i - start] = args[i];
    }
    return _args;
  }
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept("./i18n", () => {
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(System.import("intl"));
  })
    .then(() => Promise.all([System.import("intl/locale-data/jsonp/en.js")]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === "production") {
  require("offline-plugin/runtime").install(); // eslint-disable-line global-require
  Logger.setLevel(Logger.ERROR);
}
