import React, { useState } from "react";
import Tile from "./Tile";
import order, { isOperator, calculate, fit } from "../helper";
const Calculator = () => {
  const [ans, setAns] = useState(0);
  const [term, setTerm] = useState(null);
  //String
  const [cur, setCur] = useState("0");
  const [isNeg, setNeg] = useState(false);
  const [operator, setOperator] = useState(null);
  const [selectedOp, setSelectedOp] = useState(null);

  const [clearText, setClearText] = useState("AC");
  const onClickNumber = (i) => {
    setClearText("C");
    let newCur = cur;
    if (selectedOp) {
      setOperator(selectedOp);
      setSelectedOp(null);
      newCur = "";
    }
    if ((cur === "0" || cur === "-0") && i !== ".") {
      newCur = isNeg ? "-" + i : "" + i;
    } else {
      newCur = newCur + i;
    }
    setCur(newCur);
  };
  const onClickOperator = (new_op) => {
    if (selectedOp) {
      setSelectedOp(new_op);
      return;
    }
    if (new_op === "+" || new_op === "-") {
      let result;
      if (!term) result = calculate(operator, ans, parseFloat(cur));
      else result = ans + calculate(operator, term, parseFloat(cur));
      if (("" + result).includes("Error")) result = "Error";
      setAns(result);
      setCur("" + result);
      setTerm(null);
    } else if (new_op === "x" || new_op === "÷") {
      if (term === null) {
        setTerm(operator === "-" ? -parseFloat(cur) : parseFloat(cur));
      } else {
        setTerm(calculate(operator, term, parseFloat(cur)));
      }
    } else {
      console.error("UNKNOWN OPERATION: " + new_op);
    }
    setSelectedOp(new_op);
  };

  const onClickClear = () => {
    if (cur !== "0") {
      setCur("0");
      setSelectedOp(operator);
      setClearText("AC");
      setNeg(false);
      return;
    }
    setAns(0);
    setCur("0");
    setTerm(null);
    setNeg(false);
    setOperator(null);
    setSelectedOp(null);
  };
  const switchNeg = () => {
    let show = cur;
    if (!isNeg) {
      show = "-" + show;
    } else {
      show = show.substring(1);
    }
    setCur(show);
    setNeg(!isNeg);
  };
  const onClickEquals = () => {
    let result;
    if (term) result = ans + calculate(operator, term, parseFloat(cur));
    else result = calculate(operator, ans, parseFloat(cur));
    if (("" + result).includes("Error")) result = "Error";
    setAns(0);
    setCur("" + result);
    setTerm(null);
    setOperator(null);
  };
  return (
    <div className="calculator">
      <h1 className="screen">{cur}</h1>
      <div className="calculator_buttons">
        {order.map((val, i) => {
          if (!isNaN(val) || val === ".") {
            return (
              <Tile
                key={i}
                type={`number ${val === 0 ? "zero" : ""}`}
                val={val}
                onClick={onClickNumber}
              />
            );
          } else if (isOperator(val)) {
            return (
              <Tile
                key={i}
                type="operator"
                val={val}
                onClick={onClickOperator}
                selected={val === selectedOp}
              />
            );
          } else if (val === "clear") {
            return <Tile key={i} type="special" val={clearText} onClick={onClickClear} />;
          } else if (val === "neg") {
            return <Tile key={i} type="special" val="+/-" onClick={switchNeg} />;
          } else if (val === "perc") {
            return (
              <Tile key={i} type="special" val="%" onClick={() => setCur(parseFloat(cur) / 100)} />
            );
          } else if (val === "=") {
            return <Tile key={i} type="operator" val="=" onClick={onClickEquals} />;
          }
          return <div>Operator Not Found</div>;
        })}
      </div>
    </div>
  );
};
export default Calculator;
