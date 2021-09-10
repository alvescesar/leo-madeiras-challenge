import React from 'react';
import InputMask from 'react-input-mask';

const numbersOnly = (str) => str.replace(/[^0-9]/g, '');

function MaskedInput(props) {
  const { name, mask, defaultValue, placeholder, onChange } = props;

  const handleChange = (event) => {
    onChange({
      ...event,
      target: {
        ...event.target,
        name,
        value: numbersOnly(event.target.value),
      },
    });
  };

  return (
    <InputMask
      name={name}
      mask={mask}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={handleChange}
      required
    />
  );
}

export default MaskedInput;
