// Configuration file to hold categories
const categories = [
  { value: "Arrays", label: "Arrays" },
  { value: "Dynamic Programming", label: "Dynamic Programming" },
  { value: "Greedy Algorithm", label: "Greedy Algorithm" },
  { value: "Graph", label: "Graph" },
  { value: "Tree", label: "Tree" },
  { value: "Searching", label: "Searching" },
  { value: "Shortest Path", label: "Shortest Path" },
  { value: "Strings", label: "Strings" },
  { value: "Recursion", label: "Recursion" },
  { value: "Databases", label: "Databases" },
  { value: "Algorithms", label: "Algorithms" },
  { value: "Data Structures", label: "Data Structures" },
  { value: "Bit Manipulation", label: "Bit Manipulation" },
  { value: "Brainteaser", label: "Brainteaser" },
  // Add more categories as needed
];

categories.sort((a, b) => a.label.localeCompare(b.label));

export default categories;