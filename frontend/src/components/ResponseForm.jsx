// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './ResponseForm.css';
// const ResponseForm = () => {
//   const { id } = useParams();
//   const [form, setForm] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchForm = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/forms/${id}`);
//         setForm(response.data);
//         console.log("Fetched form data:", response.data);
//       } catch (error) {
//         console.error('Error fetching form:', error);
//         setError(error);
//       }
//     };
//     fetchForm();
//   }, [id]);

//   if (error) {
//     return <div className="error-message">Error: {error.message}</div>;
//   }

//   const handleChange = (fieldId, value) => {
//     setAnswers((prev) => ({ ...prev, [fieldId]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`http://localhost:3001/forms/${id}/responses`, { answers });
//       alert('Response submitted successfully');
//       navigate('/success');
//     } catch (error) {
//       console.error('Error submitting response:', error);
//       alert('Error submitting response. Please try again.');
//     }
//   };

//   if (!form) return <div>Loading...</div>;

//   return (
//     <div className="response-form-container">
//       <div className="response-form">
//         <h2>Submit Response for {form.title}</h2>
//         <p>{form.description}</p>

//         <form onSubmit={handleSubmit}>
//           {/* {form.sections && form.sections.length > 0 ? (
//             form.sections.map((section, sectionIndex) => (
//               <div className="section-container" key={sectionIndex}>
//                 <h3 className="section-title">{section.title}</h3>
//                 <p className="section-description">{section.description}</p>

//                 {section.fields && section.fields.length > 0 ? (
//                   section.fields.map((field, fieldIndex) => (
//                     <div className="field-container" key={fieldIndex}>
//                       <label className="field-label">{field.label}:</label>
//                       <input
//                         type={field.fieldType || "text"}
//                         className="field-input"
//                         onChange={(e) => handleChange(field._id, e.target.value)}
//                         required={field.required}
//                       />
//                     </div>
//                   ))
//                 ) : (
//                   <p>No fields available in this section.</p>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>No sections available in this form.</p>
//           )} */}
//           {form.sections && form.sections.length > 0 ? (
//           form.sections.map((section, sectionIndex) => (
//             <div className="section-container" key={sectionIndex}>
//               <h3 className="section-title">{section.title}</h3>
//               <p className="section-description">{section.description}</p>

//               {section.fields && section.fields.length > 0 ? (
//                 section.fields.map((field, fieldIndex) => (
//                   <div className="field-container" key={fieldIndex}>
//                     <label className="field-label">{field.label}:</label>
//                     {field.fieldType === "text" || field.fieldType === "number" ? (
//                       <input
//                         type={field.fieldType}
//                         className="field-input"
//                         onChange={(e) => handleChange(field._id, e.target.value)}
//                         required={field.required}
//                       />
//                     ) : field.fieldType === "textarea" ? (
//                       <textarea
//                         className="field-textarea"
//                         onChange={(e) => handleChange(field._id, e.target.value)}
//                         required={field.required}
//                       />
//                     ) : field.fieldType === "select" ? (
//                       <select
//                         className="field-select"
//                         onChange={(e) => handleChange(field._id, e.target.value)}
//                         required={field.required}
//                       >
//                         {field.options.map((option, index) => (
//                           <option key={index} value={option.value}>{option.label}</option>
//                         ))}
//                       </select>
//                     ) : field.fieldType === "radio" ? (
//                       field.options.map((option, index) => (
//                         <div key={index}>
//                           <label>
//                             {section.fields[0].options}
//                             <input
//                               type="radio"
//                               name={field._id} // Group radios by field ID
//                               value={option.value}
//                               onChange={() => handleChange(field._id, option.value)}
//                               required={field.required}
//                             />
//                             {option.label}
//                           </label>
//                         </div>
//                       ))
//                     ) : field.fieldType === "checkbox" ? (
//                       field.options.map((option, index) => (
//                         <div key={index}>
//                           <label>
//                             <input
//                               type="checkbox"
//                               onChange={(e) => {
//                                 const newAnswers = { ...answers };
//                                 if (e.target.checked) {
//                                   newAnswers[field._id] = [...(newAnswers[field._id] || []), option.value];
//                                 } else {
//                                   newAnswers[field._id] = (newAnswers[field._id] || []).filter(v => v !== option.value);
//                                 }
//                                 setAnswers(newAnswers);
//                               }}
//                             />
//                             {option.label}
//                           </label>
//                         </div>
//                       ))
//                     ) : null}
//                   </div>
//                 ))
//               ) : (
//                 <p>No fields available in this section.</p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No sections available in this form.</p>
//         )}
//           <button type="submit" className="submit-button">Submit Response</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResponseForm;




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResponseForm.css';

const ResponseForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/forms/${id}`);
        setForm(response.data);
        console.log("Fetched form data:", response.data);
      } catch (error) {
        console.error('Error fetching form:', error);
        setError(error);
      }
    };
    fetchForm();
  }, [id]);

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  const handleChange = (fieldId, value) => {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3001/forms/${id}/responses`, { answers });
      alert('Response submitted successfully');
      navigate('/success');
    } catch (error) {
      console.error('Error submitting response:', error);
      alert('Error submitting response. Please try again.');
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="response-form-container">
      <div className="response-form">
        <h2>Submit Response for {form.title}</h2>
        <p>{form.description}</p>

        <form onSubmit={handleSubmit}>
          {form.sections && form.sections.length > 0 ? (
            form.sections.map((section, sectionIndex) => (
              <div className="section-container" key={sectionIndex}>
                <h3 className="section-title">{section.title}</h3>
                <p className="section-description">{section.description}</p>

                {section.fields && section.fields.length > 0 ? (
                  section.fields.map((field, fieldIndex) => (
                    <div className="field-container" key={fieldIndex}>
                      <label className="field-label">{field.label}:</label>
                      {field.fieldType === 'radio' && field.options ? (
                        // Render each radio button option
                        field.options.map((option, optionIndex) => (
                          <div key={optionIndex}>
                            <input
                              type="radio"
                              name={field.label} // Ensures options belong to the same group
                              value={option}
                              checked={answers[field._id] === option}
                              onChange={() => handleChange(field._id, option)}
                              required={field.required}
                            />
                            <label>{option}</label>
                          </div>
                        ))
                      ) : field.fieldType === 'checkbox' && field.options ? (
                        // Render each checkbox option
                        field.options.map((option, optionIndex) => (
                          <div key={optionIndex}>
                            <input
                              type="checkbox"
                              value={option}
                              checked={answers[field._id]?.includes(option) || false}
                              onChange={(e) => {
                                const currentAnswers = answers[field._id] || [];
                                const newAnswers = e.target.checked
                                  ? [...currentAnswers, option]
                                  : currentAnswers.filter((o) => o !== option);
                                handleChange(field._id, newAnswers);
                              }}
                              required={field.required}
                            />
                            <label>{option}</label>
                          </div>
                        ))
                      ) : (
                        // Render other input types like text, date, etc.
                        <input
                          type={field.fieldType || "text"}
                          className="field-input"
                          onChange={(e) => handleChange(field._id, e.target.value)}
                          required={field.required}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p>No fields available in this section.</p>
                )}
              </div>
            ))
          ) : (
            <p>No sections available in this form.</p>
          )}
          <button type="submit" className="submit-button">Submit Response</button>
        </form>
      </div>
    </div>
  );
};

export default ResponseForm;
