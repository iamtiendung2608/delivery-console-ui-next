'use client';



import React, { useState } from 'react';

type EnumType = { [key: string]: string | number };

interface RadioComponentProps<T extends EnumType> {
  options: T;
  selectedValue: T[keyof T] | null;
  onChange: (selectedOption: T[keyof T]) => void;
}

const CommodityRadioComponent = <T extends EnumType>({
                                                       options,
                                                       selectedValue,
                                                       onChange,
                                                     }: RadioComponentProps<T>) => {
  const optionKeys = Object.keys(options) as Array<keyof T>;

  const handleOptionChange = (option: keyof T) => {
    onChange(options[option]);
  };

  return (
    <div>
      {optionKeys.map((key, index) => (
        <label key={index} className="flex cursor-pointer select-none items-center">
          <input
            type="radio"
            name="radioOptions"
            value={options[key]}
            checked={selectedValue === options[key]}
            onChange={() => handleOptionChange(key)}
            className="sr-only"
          />
          <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary">
            {selectedValue === options[key] && (
              <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
            )}
          </div>
          {options[key]}
        </label>
      ))}
    </div>
  );
};

export default CommodityRadioComponent;
