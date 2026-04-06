const { v4: uuidv4 } = require('uuid');
const sanitizeHtml = require('sanitize-html');

// In-memory array to simulate DB for now based on architecture doc
let mockData = [
  {
    id: uuidv4(),
    name: "Exemplo",
    value: 100
  }
];

exports.getData = (req, res) => {
  res.status(200).json(mockData);
};

exports.createData = (req, res) => {
  const { name, value } = req.body;

  // Validate inputs
  if (!name || value === undefined) {
    return res.status(400).json({ error: 'Name and value are required' });
  }

  if (typeof value !== 'number' || value < 0) {
    return res.status(400).json({ error: 'Value must be a non-negative number' });
  }

  const sanitizedName = sanitizeHtml(name);

  const newItem = {
    id: uuidv4(),
    name: sanitizedName,
    value
  };

  mockData.push(newItem);
  res.status(201).json(newItem);
};