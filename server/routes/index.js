const path = require('path');
const router = require('express').Router();

router.get('/*', (req, res, next) => {
  if (req.headers.host.match(/^www/) !== null) {
    res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
  } else {
    next();
  }
  const routePath = path.join(__dirname + '..', '..', '..', 'build/index.html');
  res.sendFile(routePath);
});

module.exports = router;
