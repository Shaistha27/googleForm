const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  sections: [
    {
      title: String,
      description: String,
      fields: [
        {
          label: String,
          fieldType: {
            type: String,
            enum: ["text", "number", "date", "file", "radio", "checkbox"],
          },
          options: {
            type: [String],
            required: function () {
              return (
                this.fieldType === "radio" || this.fieldType === "checkbox"
              );
            },
          }, // Options array for radio or checkbox fields
          required: { type: Boolean, default: false },
          order: Number,
        },
      ],
    },
  ],
  responses: [{ type: Object }],
});

// Schema for sections within a form
const sectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  fields: [{ type: Object }], // Referencing the fields array above
});

// Schema for forms with sections and pages
const formWithSectionsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  sections: [sectionSchema], // Multiple sections per form
  pages: [{ title: String, sections: [sectionSchema] }], // Pages containing sections
  responses: [{ type: Object }],
});

// Schema for responses to a form
const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
  submittedAt: { type: Date, default: Date.now },
  answers: [
    {
      fieldId: { type: mongoose.Schema.Types.ObjectId, ref: "Form.fields" },
      answer: String, // Could also be a file path, number, etc., depending on the field type
    },
  ],
});

// Creating models from schemas
const Form = mongoose.model("Form", formSchema);
const Section = mongoose.model("Section", sectionSchema);
const FormWithSections = mongoose.model(
  "FormWithSections",
  formWithSectionsSchema
);
const Response = mongoose.model("Response", responseSchema);

// Exporting the models
module.exports = {
  Form,
  Section,
  FormWithSections,
  Response,
};
