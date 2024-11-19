import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
var Shop = function () {
    var _a = React.useState(new Date().toLocaleTimeString()), time = _a[0], setTime = _a[1];
    setInterval(function () {
        setTime(function (prev) {
            return prev = new Date().toLocaleTimeString();
        });
    }, 1000);
    return (_jsx("h2", { children: time }));
};
export default Shop;
