import React, { useState } from "react";

type CheckboxProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange?.(!isChecked);
  };

  return (
    <label className="inline-flex items-center cursor-pointer space-x-2">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-green-300"
        checked={isChecked}
        onChange={handleChange}
      />
      <span className="text-gray-700 text-sm">{label}</span>
    </label>
  );
};

export default Checkbox;
