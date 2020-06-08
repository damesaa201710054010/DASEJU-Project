const authorization = {};


authorization.ensureToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        console.log(bearer[0]);
        console.log(bearer[1]);
        const bearerToken= bearer[1];
        req.token = bearerToken;
        next(); 
    }else{
        //you are not permition to this page
        res.sendStatus(403)
    }
}


module.exports = authorization;