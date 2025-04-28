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
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
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
        Blogs: {
          type: "object",
          required: ["title", "content", "isActive"],
          properties: {
            title: {
              type: "string",
              description: "This is a title of the blog!",
            },
            content: {
              type: "string",
              description: "This is a content of the blog!",
            },
            user_id: {
              type: "number",
              description: "This is user of the blog!",
            },
            image: {
              type: "string",
              description: "This is a image of the blog!",
            },
            isActive: {
              type: "boolean",
              description: "This is a status of the blog!",
            },
          },
          example: {
            title: "My new blog",
            content: "Some content about this blog!",
            image: "none",
            isActive: true,
          },
        },
        Followers: {
          type: "object",
          required: ["parent_id", "blog_id", "follower_id"],
          properties: {
            parent_id: {
              type: "number",
              description: "This is a id of a user that is being followed!",
            },
            blog_id: {
              type: "number",
              description: "This is a id of a blog that is being followed!",
            },
            follower_id: {
              type: "number",
              description: "This is a id of a user that is following!",
            },
          },
          example: {
            parent_id: 1,
            blog_id: 1,
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: "Users", description: "This is a user crud!" },
      { name: "Blogs", description: "This is a blog crud!" },
    ],
  },
  apis: ["./swagger.ts", "./routes/*.ts"],
});

export default swaggerSpec;
