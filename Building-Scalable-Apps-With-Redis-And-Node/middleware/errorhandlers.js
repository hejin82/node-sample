exports.notFound = function notFound(req, res, next) {
    // express deprecated res.send(status, body): 
    // Use res.status(status).send(body) instead 
    // res.send(404, 'You seem lost. You must have taken a wrong turn back there.');
    res.status(404).send('You seem lost. You must have taken a wrong turn back there.');
};

exports.error = function error(err, req, res, next) {
    console.log(err);
    res.status(500).send("Something broke.What did you do?");
};

