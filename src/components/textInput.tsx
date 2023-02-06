import React from 'react';

type TextInputProps = {
  title: string;
  onChangeCallback: (value?: string) => void;
  placeholder?: string;
  errorMessage?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  title,
  onChangeCallback,
  placeholder = "...",
  errorMessage,
}) => {
  return (
    <div className="mb-20">
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-1">
          <p>{title}</p>
        </div>
        <div className="col-span-2">
          <input
            type="text"
            onChange={(e) => onChangeCallback(e.target.value)}
            className="bg-navy text-white text-lg text-center w-full"
            placeholder={placeholder}>
          </input>
        </div>
      </div>
      {
        !!errorMessage && <p className="text-magenta italic">{errorMessage}</p>
      }
    </div>
  );
};

export default TextInput;
