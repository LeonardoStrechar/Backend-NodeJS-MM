const { prismaClient } = require("../database/prismaClient");

class UserController {
    async create(request, response){
        const { name, email } = request.body;
        
        const user = await prismaClient.user.create({
            data: {
                name,
                email
            }
        })

        return response.json(user);
    }
}
module.exports = { UserController }