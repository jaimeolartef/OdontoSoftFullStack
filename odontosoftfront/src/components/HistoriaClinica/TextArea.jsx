import React, { useState, useRef, useEffect } from 'react';

/**
 * TextArea component that expands its height based on the text content.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.label - The label for the textarea.
 * @param {string} props.value - The value of the textarea.
 * @param {function} props.onChange - The function to call when the textarea value changes.
 * @param {string} props.name - The name of the textarea.
 * @returns {JSX.Element} The rendered TextArea component.
 */
const TextArea = ({ label, value, onChange, name }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <section className="mb-4">
      <div className="d-flex justify-content-center align-items-center">
        <div className="card p-4" style={{ width: '1200px' }}>
          <div className="form-floating mb-3">
            <textarea
              ref={textAreaRef}
              type="text"
              className="form-control"
              value={value}
              onChange={onChange}
              name={name}
              placeholder={label}
              style={{ height: 'auto' }}
            />
            <label>{label}</label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextArea;