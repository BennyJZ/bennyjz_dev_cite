function requireAuth(...allowedRoles){
    return(req, res, next) => {
        if(!req.isAuthenticated()){
            return res.status(401).send("Unauthorized");
        }
        if (!allowedRoles.includes(req.user.role)){
            return res.status(403).send("Forbidden");
        }
        next()
    };
}

export default requireAuth;