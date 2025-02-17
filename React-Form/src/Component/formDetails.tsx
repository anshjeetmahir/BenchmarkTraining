
import { useState } from "react";
import "./formDetail.css";

interface FormData {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    skills: string;
    email: string;
    phone: number;
    address: string;
}

function FormDetail() {
    const initialFormState: FormData = {
        firstName: "",
        lastName: "",
        age: 0,
        gender: "",
        skills: "",
        email: "",
        phone: 0,
        address: "",
    };

    const [formData, setFormData] = useState<FormData>(initialFormState);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    const handleReset = () => {
        setFormData(initialFormState);
    };

    return (
        <div className="form-container">
            <h2 className="form-title">User Form</h2>

            <form onSubmit={handleSubmit} className="form-content">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="form-input" required />

                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="form-input" required />

                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="form-input" required />

                <div className="form-group">
                    <label className="form-label">Gender:</label>
                    <label className="radio-label"><input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male</label>
                    <label className="radio-label"><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
                </div>

                <select name="skills" value={formData.skills} onChange={handleChange} className="form-input" required>
                    <option value="">Select Skill</option>
                    <option value="React">React</option>
                    <option value="Node.js">Node.js</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                </select>

                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-input" required />

                <input type="number" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="form-input" required />

                <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="form-textarea" required></textarea>

                <button type="submit" className="form-button">Submit</button>

                <button type="button" className="form-button-reset" onClick={handleReset}>Reset Form</button>

            </form>
        </div>
    );
}

export default FormDetail;
