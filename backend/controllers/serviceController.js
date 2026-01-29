const ServiceModel = require('../models/serviceModel');

const ServiceController = {
  // 1. Get All Services
  getAll: async (req, res) => {
    try {
      const services = await ServiceModel.getAllServices();
      res.json(services);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // 2. Create Service
  create: async (req, res) => {
    try {
      const { id, title, description, icon, imageUrl } = req.body;
      
      // Logic: Use uploaded file URL if present, otherwise use the text URL provided
      let finalImage = imageUrl;
      if (req.file) {
        finalImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }

      const newService = await ServiceModel.createService(id, title, description, finalImage, icon);
      res.json(newService);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // 3. Update Service
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, icon, imageUrl } = req.body;

      // Check if service exists first
      const existingService = await ServiceModel.getServiceById(id);
      if (!existingService) {
        return res.status(404).json("Service not found");
      }

      // Logic: If new file uploaded, use it. Else use new text URL. Else keep old DB image.
      let finalImage = existingService.image; // Default to old image
      if (req.file) {
        finalImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      } else if (imageUrl) {
        finalImage = imageUrl;
      }

      const updatedService = await ServiceModel.updateService(id, title, description, finalImage, icon);
      res.json(updatedService);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // 4. Delete Service
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await ServiceModel.deleteService(id);
      res.json("Service was deleted!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
};

module.exports = ServiceController;