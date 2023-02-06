import React, { useState } from 'react';

type NumberInputProps = {
  title: string;
  min: number;
  max: number;
  defaultValue: number;
  onChangeCallback: (value: number) => void;
  suffix?: string;
};

const NumberInput: React.FC<NumberInputProps> = ({
  title,
  min,
  max,
  defaultValue,
  onChangeCallback,
  suffix,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isInvalid, setisInvalid] = useState(false);

  const onValueChange = (value: string) => {
    if (!(isNaN(Number(value))) &&  min <= Number(value) && Number(value) <= max) {
      setValue(Number(value))
      onChangeCallback(Number(value))
      setisInvalid(false)
    } else {
      setValue(defaultValue)
      onChangeCallback(defaultValue)
      setisInvalid(true)
    }
  }

  return (
    <div className="mb-20">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-1">
          <p>{title}</p>
        </div>
        <div className="col-span-2 flex">
          <input
            type="text"
            placeholder='4.5'
            onChange={(e) => onValueChange((e.target.value))}
            className="text-navy text-lg text-center w-20"
          />
          <p>{suffix || ""}</p>
        </div>
      </div>
      {
        isInvalid && <p className="text-magenta italic">{`value must be a number between ${min} and ${max}`}</p>
      }
    </div>
  );
};

export default NumberInput;
