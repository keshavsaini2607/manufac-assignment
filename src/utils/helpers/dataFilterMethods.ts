export function calculateMean(arr: number[]): number {
   const sum = arr.reduce((acc, value) => acc + value, 0);
   return sum / arr.length;
}

export function calculateMode(arr: number[]): number | null {
   const counts: { [key: number]: number } = {};
   let maxCount = 0;
   let mode: number | null = null;

   for (const item of arr) {
      console.log(typeof(item))
       counts[item] = (counts[item] || 0) + 1;

       if (counts[item] > maxCount) {
           maxCount = counts[item];
           mode = item;
       }
   }

   return mode;
}

export function calculateMedian(arr: number[]): number | null {
   const sortedArr = [...arr].sort((a, b) => a - b);
   const length = sortedArr.length;

   if (length === 0) {
       return null;
   }

   if (length % 2 === 0) {
       // If there are an even number of values, take the average of the two middle values.
       const middle1 = sortedArr[length / 2 - 1];
       const middle2 = sortedArr[length / 2];
       return (middle1 + middle2) / 2;
   } else {
       // If there are an odd number of values, simply return the middle value.
       return sortedArr[Math.floor(length / 2)];
   }
}