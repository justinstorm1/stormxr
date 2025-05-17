import React, { useState, useEffect } from 'react';
import './Founder.css';
import { databases } from '../../appwriteConfig';

export default function Founder() { 
    const [founder, setFounder] = useState({});

    useEffect(() => {
        const fetchDescription = async () => {
            try {
                const response = await databases.listDocuments(
                    process.env.REACT_APP_APPWRITE_DATABASE_ID,
                    process.env.REACT_APP_APPWRITE_FOUNDER_ID
                );

                const founderDetails = response.documents[0];
                setFounder(founderDetails);
            } catch (error) {
                console.error("Error fetching URL:", error);
            }
        };

        fetchDescription();
    }, []);

    return (
        <section id='founder'>
            <div className='top'>
                <h6>Founder and President</h6>
                <h2>{founder.name}</h2>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <img src={founder.image} alt='founder' />
                </div>
                <div className="col-lg-6 col-md-12">
                    <p>{founder.text}</p>
                </div>
            </div>
        </section>
    )
}