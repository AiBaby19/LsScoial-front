import React from 'react';

export default function ({ setValues, values, submit }) {
  const renderInput = () => {
    return Object.keys(values).map((vKey) => {
      return (
        <input
          key={vKey}
          type='text'
          placeholder={vKey.toUpperCase()}
          onChange={(e) => setValues({ ...values, [vKey]: e.target.value })}
        />
      );
    });
  };
  return (
    <div>
      {renderInput()}
      <button onClick={submit}>Send</button>
    </div>
  );
}
