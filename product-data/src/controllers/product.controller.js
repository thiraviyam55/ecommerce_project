const { Product } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const { Op } = require('sequelize');

exports.createProduct = asyncHandler(async(req, res) => {
    const { name, description, price, sku, availability, image: imageUrl } = req.body;

    if (!name || !price || !sku) {
        throw new ApiError(400, 'Name, price, and SKU are required');
    }

    let image = null;

    // 📸 If file uploaded
    if (req.file) {
        image = `/uploads/${req.file.filename}`;
    }
    // 🌐 If URL provided
    else if (imageUrl) {
        image = imageUrl;
    }

    const product = await Product.create({
        name,
        description,
        price,
        sku,
        image,
        availability
    });

    return res.json(new ApiResponse(201, 'Product created', product));
});

exports.updateProduct = asyncHandler(async(req, res) => {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    let image = product.image;

    if (req.file) {
        image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
        image = req.body.image;
    }

    await product.update({
        ...req.body,
        image
    });

    return res.json(
        new ApiResponse(200, 'Product updated', product)
    );
});

exports.deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    await product.destroy();

    return res.json(
        new ApiResponse(200, 'Product deleted')
    );
});

exports.getAllProducts = asyncHandler(async(req, res) => {
    const products = await Product.findAll();

    return res.json(
        new ApiResponse(200, 'Product list fetched', products)
    );
});

exports.searchProducts = asyncHandler(async(req, res) => {
    let { q = '', page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
        where: {
            name: {
                [Op.iLike]: `%${q}%` // 🔍 search by name
            }
        },
        attributes: ['id', 'name', 'price', 'image', 'availability'],
        limit,
        offset,
        order: [
            ['createdAt', 'DESC']
        ]
    });

    return res.json(
        new ApiResponse(200, 'Products fetched', {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            data: rows
        })
    );
});

exports.getProductById = asyncHandler(async(req, res) => {

    const product = await Product.findByPk(req.params.id);

    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    return res.json(
        new ApiResponse(
            200,
            'Product fetched successfully',
            product
        )
    );
});