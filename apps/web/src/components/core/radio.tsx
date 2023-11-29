import React, { type PropsWithChildren } from 'react';

interface RadioProps {
  checked: boolean;
  name: string;
  onChange: (value: string) => void;
  value: string;
  label: string;
}

export default function Radio(
  props: PropsWithChildren<RadioProps>
): JSX.Element {
  const { checked, name, onChange, value, label } = props;

  return (
    <button
      className='flex gap-2 items-center'
      onClick={() => {
        onChange(value);
      }}
      type='button'
    >
      <input
        checked={checked}
        className='cursor-pointer'
        name={name}
        type='radio'
        value={value}
      />
      <label
        className='cursor-pointer'
        htmlFor={name}
      >
        {label}
      </label>
    </button>
  );
}
