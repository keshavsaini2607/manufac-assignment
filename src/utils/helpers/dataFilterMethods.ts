export function calculateMode(arr: number[]) {
   const counts: { [key: number]: number } = {};
   let maxCount = 0;
   let mode = null;

   for (const item of arr) {
      // console.log(item);
      counts[item] = (counts[item] || 0) + 1;

      if (counts[item] > maxCount) {
         maxCount = counts[item];
         mode = item;
      }
   }

   return mode;
}

export function calculateMedian(arr: number[]) {
   arr.sort((a, b) => a - b);
   const middle = Math.floor(arr.length / 2);

   if (arr.length % 2 === 0) {
      return (arr[middle - 1] + arr[middle]) / 2;
   } else {
      return arr[middle];
   }
}
