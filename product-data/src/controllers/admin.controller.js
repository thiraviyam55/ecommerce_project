const { Admin } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

// ✅ Register Admin
exports.registerAdmin = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const existing = await Admin.findOne({ where: { email } });

    if (existing) {
        throw new ApiError(400, 'Admin already exists');
    }

    const hashed = await hashPassword(password);

    const admin = await Admin.create({
        email,
        password: hashed
    });

    return res.json(new ApiResponse(201, 'Admin created', admin));
});


// ✅ Login Admin
exports.loginAdmin = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
        throw new ApiError(404, 'Admin not found');
    }

    const isMatch = await comparePassword(password, admin.password);

    if (!isMatch) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const token = generateToken(admin);

    return res.json(
        new ApiResponse(200, 'Login successful', {
            token,
            admin: {
                id: admin.id,
                email: admin.email
            }
        })
    );
});