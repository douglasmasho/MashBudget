export function calculatePercentage(data,total) {
    const percentageArray= [];
  
    data.forEach(data => {
      const percentage = Math.round((parseFloat(data.amount) / total) * 100);
      percentageArray.push(percentage);
    });
  
    return percentageArray;
  }

  export function calculatePercentage2(data,total) {
    const percentageArray= [];
  
    data.forEach(data => {
      const percentage = Math.round((data / total) * 100);
      percentageArray.push(percentage);
    });
  
    return percentageArray;
  }