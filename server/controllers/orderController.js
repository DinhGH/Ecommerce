const {
  createOrderService,
  getOrdersByUserService,
  getAllOrdersService,
} = require("../services/orderService");
const { streamUpload } = require("../middlewares/cloudinary");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user?.userId; // Middleware auth set user
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let proofImage = null;
    if (req.file) {
      proofImage = await streamUpload(req.file.buffer, "proofImage");
    } else if (req.body.proofImage) {
      proofImage = req.body.proofImage;
    }

    const order = await createOrderService(userId, req.body, proofImage);

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    console.error("Order create error:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// Lấy đơn hàng của user hiện tại
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user?.userId; // lấy từ middleware auth
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const orders = await getOrdersByUserService(userId);
    res.json(orders);
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Lấy tất cả đơn hàng (cho admin)
exports.getAllOrders = async (req, res) => {
  try {
    // Có thể check role = ADMIN ở đây
    const orders = await getAllOrdersService();
    res.json(orders);
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};
