import classNames from 'classnames';
import React from 'react';

type Button = {
  title: string;
  value: number;
}

type ButtonGroupProps = {
  title: string;
  value: number;
  buttons: Button[];
  onClickCallback: (value: number) => void;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  title,
  value,
  onClickCallback,
  buttons,
}) => {
  return (
    <div className="mb-10 grid grid-cols-3 gap-5">
      <div className="col-span-1">
        <p className="mb-10">{title}</p>
      </div>
      <div className="col-span-2">
        <div className="inline-flex gap-x-5" role="group">
          {buttons.map((button) => (
            <button
              key={button.value}
              type="button"
              onClick={() => onClickCallback(button.value)}
              className={
                classNames(
                  "px-2 py-2 text-sm font-medium border-2 rounded border-navy",
                  { "text-white bg-navy": value === button.value },
                  { "text-navy bg-white": !(value === button.value) }
                )
              }
            >
              {button.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonGroup;
