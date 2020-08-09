import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.css";
import "animate.css/animate.css";

import "./index.css";

import "material-design-icons/iconfont/material-icons.css";
import "react-notifications/lib/notifications.css";

import "./assets/styles/master.css";
import "jquery/dist/jquery.js";
import "popper.js/dist/umd/popper.js";
import "bootstrap/dist/js/bootstrap.js";

import storage from "./storage";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={storage}>
        <App />
    </Provider>
    , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
