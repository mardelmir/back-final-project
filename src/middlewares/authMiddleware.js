// const { generateHtml } = require("../utils/helperFunctions")
// const { unauthorizedUser, notLoggedIn } = require("../utils/htmlTemplates")

// function checkAuthState(req, res, next) {
//     if (!res.headersSent) {
//         if (req.originalUrl.includes('/shop/admin') && req.originalUrl !== '/shop/logout') {
//             if (!req.session.uid || !req.session.role) {
//                 res.status(200).send(generateHtml(notLoggedIn, req))
//             } else if (req.session.uid && req.session.role === 'user') {
//                 res.status(200).send(generateHtml(unauthorizedUser, req))
//             } else { next() }
//         } else { next() } 
//     } else { next() } 
// }

// module.exports = checkAuthState