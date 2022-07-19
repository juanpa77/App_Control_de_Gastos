import { MouseEvent, useState } from "react";

export const SelectTransactionType = () => {
  const [toggleClass, setToggle] = useState(false);

  const classTriggerToggle = (e: MouseEvent<HTMLDivElement>) => {
    const classList = e.currentTarget.classList.length;
    if (classList < 2) {
      setToggle(!toggleClass);
    }
  };

  return (
    <div className="select__radio">
      <div
        className={`icome__radioButton ${
          toggleClass ? "active__radioButton" : ""
        }`}
        onClick={(e) => classTriggerToggle(e)}
      >
        Ingreso
      </div>
      <div
        onClick={(e) => classTriggerToggle(e)}
        className={`expense__radioButton ${
          toggleClass ? "" : "active__radioButton"
        }`}
      >
        Gasto
      </div>
    </div>
  );
}; /*  */
