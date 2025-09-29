const {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  createOrder,
  updateOrder,
} = require("../services/orderServiceAdmin");
const { streamUpload } = require("../middlewares/cloudinary");

exports.getOrdersController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { orders, totalPages } = await getOrders(page, limit);
    res.json({ data: orders, totalPages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await updateOrderStatus(id, status);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

exports.deleteOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteOrder(id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete order" });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { id } = req.params;
    let data = req.body;

    // Parse items
    if (data.items) {
      try {
        data.items = JSON.parse(data.items);
      } catch (e) {
        data.items = [];
      }
    }

    // Handle proofImage
    if (req.file) {
      data.proofImage = await streamUpload(req.file.buffer, "proofImage");
    } else if (req.body.proofImage) {
      data.proofImage = req.body.proofImage;
    } else {
      data.proofImage = null;
    }

    const order = await createOrder(id, data);
    res.status(201).json(order);
  } catch (err) {
    console.error("❌ createOrder error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    let data = req.body;

    // Parse items
    if (data.items) {
      try {
        data.items = JSON.parse(data.items);
      } catch (e) {
        data.items = [];
      }
    }

    // Handle proofImage
    if (req.file) {
      data.proofImage = await streamUpload(req.file.buffer, "proofImage");
    } else if (req.body.proofImage) {
      data.proofImage = req.body.proofImage;
    } else {
      data.proofImage = null;
    }

    // Gọi service (chỉ 2 tham số: id + data)
    const order = await updateOrder(id, data);
    res.json(order);
  } catch (err) {
    console.error("❌ updateOrder error:", err);
    res.status(500).json({ error: "Failed to update order" });
  }
};
