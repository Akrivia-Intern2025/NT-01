const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

const authRoutes = require("./v1/auth/auth.routes");
const userRoutes = require("./v1/users/user.routes");
const awsRoutes = require("./AWS/aws.routes");
const dashboardRoutes = require("./v1/dashboard/dashboard.routes");
const importRoutes = require("./v1/import/import.routes");

const globalErrorHandler = require("./utils/errorController");
const logger = require("./middlewares/logger");
const encryptionMiddleware = require("./middlewares/encryptionMiddleware");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AKV0795 API",
      version: "1.0.0",
      description: "AKV0795 API Documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [
    path.join(__dirname, "./v1/auth/*.js"),
    path.join(__dirname, "./v1/users/*.js"),
    path.join(__dirname, "./v1/dashboard/*.js"),
    path.join(__dirname, "./v1/import/*.js"),
    path.join(__dirname, "./AWS/*.js"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

// **Swagger UI Setup**
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// **Rate Limiting**
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);

// **Middlewares**
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// **Request Logger**
app.use((req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url}`);
  next();
});

// **Routes**
app.use("/auth", encryptionMiddleware, authRoutes);
app.use("/user", userRoutes);
app.use("/api", awsRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/imports", importRoutes);

// **Global Error Handler**
app.use(globalErrorHandler);

// **Start Server**
app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
