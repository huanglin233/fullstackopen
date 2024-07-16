const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../db/User');

loginRouter.post('/login', async (request, response) => {
    const {username, password } = request.body;

    const user = await User.findOne({username});
    const passwordCorrect = user === null ? false
        : await bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordCorrect)) {
        return response.status(401).json({
            error: '用户或密码错误'
        });
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60
    });

    response.status(200)
    .send({token, username: user.usernam, name: user.name})
})

module.exports = loginRouter;
