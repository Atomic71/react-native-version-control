interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}
export default function Checkbox(props: CheckboxProps): JSX.Element {
  const { checked, onChange, label, ...rest } = props;

  return (
    <div className='checkbox'>
      <label>
        <input
          checked={checked}
          onChange={onChange}
          type='checkbox'
          {...rest}
        />
        {label}
      </label>
    </div>
  );
}
