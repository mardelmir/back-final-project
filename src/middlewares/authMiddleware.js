const notLoggedIn = {
    title: 'No login detected',
    message: 'This content is only accessible to administrators. If you wish to access this content, log in with an admin account'
}

const unauthorizedUser = {
    title: 'Unauthorized user',
    message: 'Your user does not have administrator privileges. If you wish to access this content, please log out of the current session and log in with an admin account.'
}

function checkAuthState(req, res, next) {
    if (!res.headersSent) {
        if (req.originalUrl.includes('/admin') && req.originalUrl !== '/logout') {
            if (!req.session.uid || !req.session.role) {
                res.status(200).json(notLoggedIn)
            } else if (req.session.uid && req.session.role === 'user') {
                res.status(200).json(unauthorizedUser)
            } else { next() }
        } else { next() }
    } else { next() }
}

module.exports = checkAuthState