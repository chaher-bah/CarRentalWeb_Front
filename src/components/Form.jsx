import React from 'react';
import PropTypes from 'prop-types';
import "../dist/FormModule.css";

const Form = ({ title, fields, buttonLabel, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  };

  return (
    <div className="form_container">
      <div className="form_area">
        <p className="title">{title}</p>
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="form_group">
              <label className="sub_title" htmlFor={field.name}>
                {field.label}
              </label>
              {field.type === "file" ? (
                <input
                  placeholder={field.placeholder}
                  id={field.name}
                  className="form_style"
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  accept={field.accept}
                  multiple="multiple"
                />
              ) : (
                <input
                  placeholder={field.placeholder}
                  id={field.name}
                  className="form_style"
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  min={field.min?field.min:undefined}
                  max={field.max?field.max:undefined}
                  step={field.step?field.step:undefined}
                />
              )}
            </div>
          ))}
          <div className='form_button'>
            <button type="submit" className="btn">{buttonLabel}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
      accept: PropTypes.string,
      min:PropTypes.string,
      max:PropTypes.string
    })
  ).isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
