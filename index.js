const { response } = require("express");
const express = require("express")
server = express()
const uuid = require('uuid');
order = []
server.use(express.json())

const cors = require("cors");
server.use(cors())

const CheckId = (request, response, next) => {

    const { id } = request.params
    const index = order.findIndex(index => index.id === id)

    if (index <= -1) {

        return response.status(401).json({ message: "not found" }
        )

    }
    request.Id = id
    request.user = index
    next()

}

server.get("/Users", (request, response) => {

    return response.json(order)
})

server.get("/Users/:id", CheckId, (request, response) => {

    index = request.user

    return response.json(order[index])
})


server.post("/Users", (request, Response) => {

    
    try {
        const { Name, Order } = request.body

        const User = {id: uuid.v4(), Name, Order, Status: "Em preparação"} 

        
        if (User.Name ==  ''  || User.Order == '' ) {
           
            return Response.json(User)
            
        }

        else {
         
            order.push(User)
            
            return Response.json(User)
        }
    } catch (error) {
        return response.status(500).json({ Error: error.message })

    }

})

server.put("/Users/:id", CheckId, (request, response) => {
    id = request.Id
    index = request.user
    const { Name, Order, Status } = request.body

    const Update = { id, Name, Order, Status }

    order[index] = Update
    console.log(Update)
    return response.json(Update)
})

server.delete("/Users/:id", CheckId, (request, response) => {


    index = request.user
    order.splice([index], 1)
    return response.json(order[index])
})
server.patch("/Users/:id", CheckId, (request, response) => {

    index = request.user

    if (order[index].Status == "Em preparação") {
        order[index].Status = "Pronto"
        console.log("Pronto")

        return response.json(order[index])
    }

    if (order[index].Status == "Pronto") {
        order[index].Status = "Em preparação"
        console.log("Em preparação")
        return response.json(order[index])
    }

})
server.listen(3100, () => {
    console.log("Servidor rodando")
})