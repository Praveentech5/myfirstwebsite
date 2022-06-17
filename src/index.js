import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import './index.css';
import {AppProvider} from './Context';

ReactDom.render(
<div>
<AppProvider>
 <App />
 </AppProvider>
</div>, document.getElementById("root")
);