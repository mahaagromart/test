// pages/api/search.js

// Mock data - replace this with your actual data source or database query
const mockData = [
    {
      title: "Next.js Documentation",
      description: "Learn about Next.js features and API."
    },
    {
      title: "React Hooks Guide",
      description: "Understanding useState, useEffect and other React hooks."
    },
    {
      title: "JavaScript Fundamentals",
      description: "Core JavaScript concepts every developer should know."
    },
    {
      title: "CSS Flexbox Tutorial",
      description: "Complete guide to CSS Flexbox layout."
    },
    {
      title: "TypeScript for React",
      description: "How to use TypeScript with React applications."
    }
  ];
  
  export default function handler(req, res) {
    const { query } = req.query;
  
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
  
    try {
      // Filter results based on query (case insensitive)
      const filteredResults = mockData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
      );
  
      // Simulate network delay (remove in production)
      setTimeout(() => {
        res.status(200).json(filteredResults);
      }, 300);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }