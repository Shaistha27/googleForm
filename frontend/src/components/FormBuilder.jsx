// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './FormBuilder.css'
// const FormBuilder = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [sections, setSections] = useState([{ title: '', description: '', fields: [] }]);
//   const navigate = useNavigate();

//   const handleSectionChange = (index, field, value) => {
//     const updatedSections = [...sections];
//     updatedSections[index][field] = value;
//     setSections(updatedSections);
//   };

//   const addField = (sectionIndex) => {
//     const updatedSections = [...sections];
//     updatedSections[sectionIndex].fields.push({ label: '', fieldType: 'text', required: false });
//     setSections(updatedSections);
//   };

//   const handleFieldChange = (sectionIndex, fieldIndex, field, value) => {
//     const updatedSections = [...sections];
//     updatedSections[sectionIndex].fields[fieldIndex][field] = value;
//     setSections(updatedSections);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = { title, description, sections };
//     console.log(formData);
//     try {
//       const response = await axios.post('http://localhost:3001/forms', formData);
//       console.log("form data",formData);
//       alert(response.data.message);
//       navigate(`/form/${response.data.form._id}`);

//     } catch (error) {
//       console.error('Error creating form:', error);
//       alert('Error creating form. Please try again.');
//     }
//   };

//   return (
//     <div className='body-wrapper'>
//       <h2 className='main-heading'>Create Form</h2>
//       <form className='form-container' onSubmit={handleSubmit}>
//         <div>
//           <label className='field-label'>Title:</label>
//           <input className='text-input' type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea className='textarea-input' value={description} onChange={(e) => setDescription(e.target.value)} />
//         </div>
//         {sections.map((section, sectionIndex) => (
//           <div key={sectionIndex}>
//             <h3 className='section-heading'>Section {sectionIndex + 1}</h3>
//             <div>
//               <label className='field-label'>Section Title:</label>
//               <input
//               className='text-input'
//                 type="text"
//                 value={section.title}
//                 onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label className='field-label'>Section Description:</label>
//               <textarea
//               className='textarea-input'
//                 value={section.description}
//                 onChange={(e) => handleSectionChange(sectionIndex, 'description', e.target.value)}
//               />
//             </div>
//             <h4 className='field-heading'>Fields</h4>
//             {section.fields.map((field, fieldIndex) => (
//               <div key={fieldIndex}>
//                 <label className='field-label'>Field Label:</label>
//                 <input
//                 className='text-input'
//                   type="text"
//                   value={field.label}
//                   onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'label', e.target.value)}
//                   required
//                 />
//                 <label className='field-label'>Field Type:</label>
//                 <select
//                 className='select-input'
//                   value={field.fieldType}
//                   onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'fieldType', e.target.value)}
//                 >
//                   <option value="text">Text</option>
//                   <option value="number">Number</option>
//                   <option value="date">Date</option>
//                   <option value="file">File</option>
//                   <option value="radio">Radio</option>
//                   <option value="checkbox">Checkbox</option>
//                 </select>
//                 <label>
//                   Required:
//                   <input
//                     className='checkbox-input'
//                     type="checkbox"
//                     checked={field.required}
//                     onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'required', e.target.checked)}
//                   />
//                 </label>
//               </div>
//             ))}
//             <button className='button-secondary' type="button" onClick={() => addField(sectionIndex)}>
//               Add Field
//             </button>
//           </div>
//         ))}
//         <button className='button-submit' type="submit">Create Form</button>
//       </form>
//     </div>
//   );
// };

// export default FormBuilder













import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormBuilder.css';

const FormBuilder = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([{ title: '', description: '', fields: [] }]);
  const navigate = useNavigate();

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([...sections, { title: '', description: '', fields: [] }]);
  };

  const addField = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].fields.push({ label: '', fieldType: 'text', required: false, options: [] });
    setSections(updatedSections);
  };

  const handleFieldChange = (sectionIndex, fieldIndex, field, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].fields[fieldIndex][field] = value;
    setSections(updatedSections);
  };

  const addOption = (sectionIndex, fieldIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].fields[fieldIndex].options.push('');
    setSections(updatedSections);
  };

  const handleOptionChange = (sectionIndex, fieldIndex, optionIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].fields[fieldIndex].options[optionIndex] = value;
    setSections(updatedSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { title, description, sections };
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:3001/forms', formData);
      console.log("Form data:", formData);
      alert(response.data.message);
      navigate(`/form/${response.data.form._id}`);
    } catch (error) {
      console.error('Error creating form:', error);
      alert('Error creating form. Please try again.');
    }
  };

  return (
    <div className='body-wrapper'>
      <h2 className='main-heading'>Create Form</h2>
      <form className='form-container' onSubmit={handleSubmit}>
        <div>
          <label className='field-label'>Title:</label>
          <input className='text-input' type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea className='textarea-input' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className='section-heading'>Section {sectionIndex + 1}</h3>
            <div>
              <label className='field-label'>Section Title:</label>
              <input
                className='text-input'
                type="text"
                value={section.title}
                onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
                required
              />
            </div>
            <div>
              <label className='field-label'>Section Description:</label>
              <textarea
                className='textarea-input'
                value={section.description}
                onChange={(e) => handleSectionChange(sectionIndex, 'description', e.target.value)}
              />
            </div>
            <h4 className='field-heading'>Fields</h4>
            {section.fields.map((field, fieldIndex) => (
              <div key={fieldIndex}>
                <label className='field-label'>Field Label:</label>
                <input
                  className='text-input'
                  type="text"
                  value={field.label}
                  onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'label', e.target.value)}
                  required
                />
                <label className='field-label'>Field Type:</label>
                <select
                  className='select-input'
                  value={field.fieldType}
                  onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'fieldType', e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="file">File</option>
                  <option value="radio">Radio</option>
                  <option value="checkbox">Checkbox</option>
                </select>
                {['radio', 'checkbox'].includes(field.fieldType) && (
                  <div>
                    <h5>Options</h5>
                    {field.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <label>Option {optionIndex + 1}:</label>
                        <input
                          className='text-input'
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(sectionIndex, fieldIndex, optionIndex, e.target.value)}
                          required
                        />
                      </div>
                    ))}
                    <button type="button" className='button-secondary' onClick={() => addOption(sectionIndex, fieldIndex)}>
                      Add Option
                    </button>
                  </div>
                )}
                <label>
                  Required:
                  <input
                    className='checkbox-input'
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'required', e.target.checked)}
                  />
                </label>
              </div>
            ))}
            <button className='button-secondary' type="button" onClick={() => addField(sectionIndex)}>
              Add Field
            </button>
          </div>
        ))}
        <button className='button-secondary' type="button" onClick={addSection}>
          Add Section
        </button>
        <button className='button-submit' type="submit">Create Form</button>
      </form>
    </div>
  );
};

export default FormBuilder;
