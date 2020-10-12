module.exports = {
    isLoggedIn(req, res, next){
        return (req.isAuthenticated())? next(): res.redirect('/signin');
    }, 
    isNotLoggedIn(req, res, next){
        return (!req.isAuthenticated())? next() : res.redirect('/profile');
    }
};