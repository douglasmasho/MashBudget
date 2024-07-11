/**
 * This code handles the math that calculates all the percentages that show on the app
 * Author: Douglas Mashonganyika https://github.com/douglasmasho/MashBudget
 */

// Function to calculate percentages based on data objects
export function calculatePercentage(data, total) {
  const percentageArray = [];

  // Iterate over each data object
  data.forEach((data) => {
    // Calculate percentage for each data object's amount relative to total
    const percentage = Math.round((parseFloat(data.amount) / total) * 100);
    // Push calculated percentage to percentageArray
    percentageArray.push(percentage);
  });

  // Return array of percentages
  return percentageArray;
}

// Function to calculate percentages based on array of numbers
export function calculatePercentage2(data, total) {
  const percentageArray = [];

  // Iterate over each number in data array
  data.forEach((data) => {
    // Calculate percentage for each number relative to total
    const percentage = Math.round((data / total) * 100);
    // Push calculated percentage to percentageArray
    percentageArray.push(percentage);
  });

  // Return array of percentages
  return percentageArray;
}
