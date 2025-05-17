import React, { useState } from 'react';
import { databases } from '../../appwriteConfig';
import { ID } from 'appwrite';
import './Contact.css';
import CustomButton from '../CustomButton';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await databases.createDocument(
                process.env.REACT_APP_APPWRITE_DATABASE_ID,
                process.env.REACT_APP_APPWRITE_FORM_ID,
                ID.unique(),
                {
                    name,
                    email,
                    phoneNumber,
                    message,
                }
            );

            setSubmitted(true);
            setName('');
            setEmail('');
            setPhoneNumber('');
            setMessage('');  
        } catch (error) {
            console.error('Submission error:', error);
        }
    };


    return (
        <section id="contact">
            <div className='top'>
                <h2>{submitted ? 'Thank You!' : 'Contact Me'}</h2>
                <p>{submitted ? 'We have got your submission and will get back to you shortly.' : 'Fill out this form to get in touch with me.'}</p>
            </div>
            {!submitted &&
                <form onSubmit={handleSubmit}>
                    <input 
                        className='form-control' 
                        placeholder='Name*'
                        type='text' 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input 
                        className='form-control' 
                        placeholder='Email*'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        className='form-control' 
                        placeholder='Phone Number'
                        type='tel'
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                    <textarea
                        className='form-control'
                        placeholder='Message*'
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                    ></textarea>
                    <CustomButton
                        title='Submit'
                        type='submit'
                        radius='full'
                        border='none'
                        background='#0d6efd'
                        hoveredBackground='#1f5cb7'
                        color='#fff'
                    />
                </form>
            }
            {submitted &&
                <button 
                    className='rounded-pill submitted-btn'
                    onClick={() => setSubmitted(false)}
                >Submit Another?</button>
            }
        </section>
    )
}