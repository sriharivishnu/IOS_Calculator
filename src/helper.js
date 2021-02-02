const values = ["clear", "neg", "perc", "÷", 7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "="];
export default values;

export const isOperator = (op) => {
  return op === "+" || op === "-" || op === "x" || op === "÷";
};

export const calculate = (op, a, b) => {
  if (!op) return a + b;
  if (isNaN(a) || isNaN(b)) return "Error";
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "x":
      return a * b;
    case "÷":
      if (b === 0) return "Error";
      return a / b;
    default:
      return "Error";
  }
};

export const fit = (num) => {
  if (num.length < 9) return num;
  return num.substr(0, 9);
};
