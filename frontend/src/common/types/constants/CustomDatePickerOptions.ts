export const months = Array.from({ length: 12 }, (_, index) => ({
    value: index,
    label: new Date(0, index).toLocaleString("default", { month: "long" }),
  }));
  
export const years = Array.from({ length: 30 }, (_, index) => ({
    value: new Date().getFullYear() - index,
    label: (new Date().getFullYear() - index).toString(),
  }));