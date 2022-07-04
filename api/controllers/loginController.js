const jwt  = require('jsonwebtoken');


const handle_login = async (request, response) => {
    try {
       console.log("got it");
       const credential = jwt.decode(request.body.credential);
       console.log(credential);
       console.log("hi");
       response.send(payload);
       
       
    }
    catch {
        response.send("login error");
    }
}


const whoAreYou = async (request, response) => {
    try {
       console.log("whoareyou?");
       const payload = request.body;
       console.log(payload);
       response.send(payload);
       
    }
    catch {
        console.log("error");
    }
};




module.exports = {
    handle_login,
    whoAreYou
}
