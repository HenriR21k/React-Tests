import { useState } from "react";
import React, { useRef } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';


export const Contact = () => {
 
    
    const [buttonText, setButtonText] = useState('Send');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState(null);
  
    const onSubmit = async (data) => {
      try {
        
        const response = await axios.post('http://localhost:3000/contacts', data);
        console.log("The response:", response)
        console.log("The data:", data)
        if (response.status === 201) {
          setSuccessMessage('Form submitted successfully');
          console.log("it worked")
          reset();
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
  
    return (
      <section className="contact" id="connect">
        <Container>
          <div className="contactform">
            <h2>Get In Touch</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col size={12} sm={6} className="px-1">
                  <label>Name</label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                  />
                {errors.name && <p>Invalid Name</p>}
                </Col>
                <Col size={12} sm={6} className="px-1">
                  <label>Email</label>
                  <input 
                  type="email"
                  {...register("email", { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                  />
                {errors.email && <p>Invalid Email</p>}
                </Col>
                <Col size={12} sm={12} className="px-1">
                  <label>Phone Number</label>
                  <input 
                  type="tel"
                  placeholder="+447400112233"
                  style={{ opacity: 0.5 }}
                  {...register("tel", { required: true, pattern: /^(?:\+\d{1,3}[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/})}
                  />
                {errors.tel && <p>Invalid tel</p>}
                </Col>
                <Col size={12} sm={12} className="px-1">
                  <label>Address</label>
                  <input 
                  type="text"
                  {...register("address", { required: true})}
                  />
                {errors.address && <p>Invalid address</p>}
                </Col>
                <Col size={12} sm={12} className="px-1">
                  <label>Date of Birth</label>
                  <input 
                  type="date"
                  {...register("dob", { required: true, validate: (value) => {
                    const selectedDate = new Date(value);
                    const currentDate = new Date();
                    return selectedDate <= currentDate || "Date of birth cannot be in the future";
                  }})}
                  />
                {errors.dob && <p>Invalid Date</p>}
                </Col>
                <Col size={12} className="px-1">
                  <button type="submit"><span>{buttonText}</span></button>
                </Col>
                {successMessage && <p className="success-message">{successMessage}</p>}
              </Row>
            </form>
          </div>
        </Container>
      </section>
    );
  }


