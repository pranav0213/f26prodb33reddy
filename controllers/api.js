// API for our resources
exports.api = function(req, res) {
  res.json([
    {
      resource: "products",
      verbs: ["GET", "POST", "PUT", "DELETE"],
      endpoints: {
        list: "/resource/products",
        detail: "/resource/products/:id"
      }
    }
  ]);
};