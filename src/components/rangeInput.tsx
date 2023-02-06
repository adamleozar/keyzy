import React, { useState } from 'react';

type RangeInputProps = {
  title: string;
  range: [number, number];
  defaultValue: number;
  step: number;
  suffix?: string;
  onChangeCallback: (value: number) => void;
  placeholder?: string;
};

const RangeInput: React.FC<RangeInputProps> = ({
  title,
  range,
  defaultValue,
  step,
  suffix,
  onChangeCallback,
}) => {
  const [value, setValue] = useState(defaultValue);

  const onValueChange = (value?: number) => {
    if (!!value) {
      setValue(value);
      onChangeCallback(value);
    }
  }

  return (
    <div className="mb-20 grid grid-cols-3 gap-5">
      <div className="col-span-1">
        <p>{title}</p>
      </div>
      <div className="col-span-2 flex flex-row items-center">
        <p>{`${range[0]}${suffix || ""}`}</p>
        <input
          type="range"
          min={range[0]}
          max={range[1]}
          step={step}
          onChange={(e) => onValueChange(Number(e.target.value))}
          value={value}
          className="w-full h-1 bg-navy accent-magenta appearance-none range">
        </input>
        <p>{`${range[1]}${suffix || ""}`}</p>
      </div>
      <p className="text-azure self-center">{`value: ${value}${suffix || ""}`}</p>
    </div>
  );
};

export default RangeInput;
