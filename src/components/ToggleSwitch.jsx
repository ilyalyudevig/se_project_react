import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="header__toggle toggle">
      <input
        type="checkbox"
        className="toggle__input"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <div className="toggle__handle"></div>
      <div className="toggle__labels-container">
        <div className="toggle__label toggle__label_left">F</div>
        <div className="toggle__label toggle__label_right">C</div>
      </div>
    </label>
  );
}
export default ToggleSwitch;
