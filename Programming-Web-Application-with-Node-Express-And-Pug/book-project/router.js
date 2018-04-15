function route(pathname, handler) {
    console.log('Route for path requested: ' + pathname);
    if (typeof handler[pathname] === 'function') {
        handler[pathname]();
        return true;
    } else {
        console.log('no method found for ' + pathname);
        return null;
    }
}

exports.route = route;
