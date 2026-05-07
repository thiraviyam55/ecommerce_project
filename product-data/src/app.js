const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerSpec = require('./config/swagger');

const adminRoutes = require('./routes/admin.routes');
const productRoutes = require('./routes/product.routes');
const errorMiddleware = require('./middleware/error.middleware');

app.use(express.json());
app.use(cors());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/admin', adminRoutes);
app.use('/api/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use(errorMiddleware);


module.exports = app;