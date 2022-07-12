const { prismaClient } = require("../database/prismaClient");

class UserController {
    async create(request, response){
        const { name, email } = request.body;
        console.log("chegou");
        // const user = await prismaClient.user.create({
        //     data: {
        //         name,
        //         email
        //     }
        // })
        const user = await prismaClient.user.findMany()
        console.log(user)

        return response.json(user);
    }
}
module.exports = { UserController }