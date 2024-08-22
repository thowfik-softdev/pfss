const router = require("express").Router();
const UserModal = require("../models/user");

router.get("/user-details", async (req, res) => {
  try {
    const { search, page = 1 } = req.query;
    const limit = 10; // Number of results per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // Log for debugging
    console.log(`Page: ${page}, Skip: ${skip}, Search: ${search}`);

    // Create a query object to hold our search criteria
    const query = {};

    if (search) {
      const searchRegex = { $regex: search, $options: "i" }; // Case-insensitive regex search

      query.$or = [
        { name: searchRegex }, // Search by name
        { email: searchRegex }, // Search by email
        { phone: searchRegex } // Search by phone number as a string (partial matches allowed)
      ];
    }

    // Find users with pagination
    const data = await UserModal.find(query).limit(limit).skip(skip);
    const totalUsers = await UserModal.countDocuments(query); // Count total matching documents
    const totalPages = Math.ceil(totalUsers / limit);

    // Log the results for debugging
    console.log(`Total Users: ${totalUsers}, Total Pages: ${totalPages}`);

    return res.status(200).json({
      return: data,
      totalUsers,
      totalPages,
      currentPage: parseInt(page),
      message: "Data GET successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching data" });
  }
});

module.exports = router;
