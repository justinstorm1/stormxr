import CustomHr from '../CustomHr';
import './Focuses.css';
import React, { useEffect, useState } from 'react';
import { databases } from '../../appwriteConfig';

export default function Focuses() {
    const [focuses, setFocuses] = useState([]);

    useEffect(() => {
        const fetchFocuses = async () => {
        try {
            const response = await databases.listDocuments(
                process.env.REACT_APP_APPWRITE_DATABASE_ID,
                process.env.REACT_APP_APPWRITE_FOCUSES_ID
            );
            
            const publishedFocuses = response.documents.filter(doc => doc.published);
            setFocuses(publishedFocuses);
        } catch (error) {
            console.error("Error fetching focuses:", error);
        }
        };

        fetchFocuses();
    }, []);

    return (
        <section id="focuses">
            <h2>Areas Of Focus</h2>
            <CustomHr 
                width='50px'
                height='4px'
                background='#000'
            />
            <div className='focuses row'>
                {focuses.map(focus => (
                    <div key={focus.$id} className='focus col-lg-4 col-md-6 col-sm-12'>
                        <i className={`bi bi-${focus.icon}`}></i>
                        <h3>{focus.title}</h3>
                        <p>{focus.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}