import swaggerJsDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Linked in clone small version!",
      version: "1.0.0",
      description: "This is a small version of the linked in version for exam5",
    },
    components: {
      schemas: {
        Users: {
          type: "object",
          required: ["name", "email", "password", "age"],
          properties: {
            name: {
              type: "string",
              description: "This is name of the user!",
            },
            email: {
              type: "string",
              description: "This is email of the user!",
            },
            age: {
              type: "string",
              description: "This is age of a user!",
            },
            password: {
              type: "string",
              description: "This is password of a user!",
            },
            role: {
              type: "string",
              description: "This is role of a user!",
            },
            isActive: {
              type: "string",
              description: "This is status of a user!",
            },
          },
          example: {
            name: "James",
            age: 90,
            email: "someone@gmail.com",
            password: "Somepassword1:(",
            role: "user",
            isActive: true,
          },
        },
        UserLogin: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", description: "Email of the user!" },
            password: { type: "string", description: "Password of the user!" },
          },
          example: {
            email: "jamesromanov@gmail.com",
            password: "Somepassword!3@",
          },
        },
      },
    },
    tags: [{ name: "Users", description: "This is a user crud!" }],
  },
  apis: ["./swagger.ts", "./routes/*.ts"],
});

export default swaggerSpec;
