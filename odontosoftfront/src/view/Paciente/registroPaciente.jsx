import React, { useState } from 'react';
import './registroPaciente.css';

const RegistroPaciente = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    placeOfBirth: '',
    gender: '',
    address: '',
    phoneNumber: '',
    email: '',
    idNumber: '',
    socialSecurityNumber: '',
    maritalStatus: '',
    occupation: '',
    isRetiree: false,
    emergencyContactName: '',
    emergencyHomeNumber: '',
    emergencyRelationship: '',
    emergencyMobileNumber: '',
    membershipType: '',
    membershipNumber: '',
    paymentType: '',
    staffName: '',
    staffSignature: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <form className="medical-form" onSubmit={handleSubmit}>
      <h1>Circle Healthcare Service</h1>
      <h2>Medical Form</h2>
      <h3>Personal Information</h3>
      <label>
        Full Name:
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
      </label>
      <label>
        Place Of Birth:
        <input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
      </label>
      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </label>
      <label>
        Phone Number:
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </label>
      <label>
        E-Mail:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        ID Number:
        <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} />
      </label>
      <label>
        Social Security Number:
        <input type="text" name="socialSecurityNumber" value={formData.socialSecurityNumber} onChange={handleChange} />
      </label>
      <label>
        Marital Status:
        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
          <option value="">Select</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Occupation:
        <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />
      </label>
      <label>
        Are You A Retiree?
        <input type="checkbox" name="isRetiree" checked={formData.isRetiree} onChange={handleChange} />
      </label>
      <h3>Emergency Contact Details</h3>
      <label>
        Contact Name:
        <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} />
      </label>
      <label>
        Home Number:
        <input type="text" name="emergencyHomeNumber" value={formData.emergencyHomeNumber} onChange={handleChange} />
      </label>
      <label>
        Relationship:
        <input type="text" name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange} />
      </label>
      <label>
        Mobile Number:
        <input type="text" name="emergencyMobileNumber" value={formData.emergencyMobileNumber} onChange={handleChange} />
      </label>
      <h3>Office Use Only</h3>
      <label>
        Membership Type:
        <input type="text" name="membershipType" value={formData.membershipType} onChange={handleChange} />
      </label>
      <label>
        Membership Number:
        <input type="text" name="membershipNumber" value={formData.membershipNumber} onChange={handleChange} />
      </label>
      <label>
        Payment Type:
        <input type="text" name="paymentType" value={formData.paymentType} onChange={handleChange} />
      </label>
      <label>
        Staff Name:
        <input type="text" name="staffName" value={formData.staffName} onChange={handleChange} />
      </label>
      <label>
        Staff Signature:
        <input type="text" name="staffSignature" value={formData.staffSignature} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistroPaciente;
