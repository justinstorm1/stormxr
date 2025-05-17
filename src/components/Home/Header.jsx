import { useState, useEffect } from 'react';
import './Header.css';
import { databases } from '../../appwriteConfig';
import CustomHr from '../CustomHr';
import CustomButton from '../CustomButton';

export default function Header() {
    const [headerBackground, setHeaderBackground] = useState(null);

    useEffect(() => {
        const fetchURL = async () => {
            try {
                const response = await databases.listDocuments(
                    process.env.REACT_APP_APPWRITE_DATABASE_ID,
                    process.env.REACT_APP_APPWRITE_HEADER_BACKGROUND_URL
                );

                const backgroundURL = response.documents[0].imageURL;
                setHeaderBackground(backgroundURL);
            } catch (error) {
                console.error("Error fetching URL:", error);
            }
        };

        fetchURL();
    }, []);

    return (
        <header 
            style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${headerBackground}) center/cover no-repeat`,
            }}
        >
            <h1>Welcome to StormXR!</h1>
            <CustomHr
                height={'4px'}
                width={'50px'}
                background={'#fff'}
            />
            <p>Explore the endless possibitities using XR!</p>
            <CustomButton 
                title='explore'
                paddingY='12px'
                paddingX='24px'
                radius='full'
                border='3px solid #0d6efd'
                color='#fff'
                hoveredColor='#fff'
                background='transparent'
                hoveredBackground='#0d6efd'
                blur={true}
                shadow='0 0 12px rgba(255, 255, 255, 0.85)'
                href='#about'
            />
        </header>
    );
}
