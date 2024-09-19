import React from 'react';

const TextArea = ({ label, value, onChange }) => {
  return (
    <section className="mb-4">
        <div className="d-flex justify-content-center align-items-center">
            <div className="card p-4" style={{ width: '1200px' }}>
                <div className="form-floating mb-3">      
                    <textarea type="text" className="form-control"
                        value={value} onChange={onChange}
                        placeholder={label} style={{ height: 'auto' }}/>
                    <label>{label}</label>
                </div>
            </div>
        </div>
    </section>
  );
};

export default TextArea;
