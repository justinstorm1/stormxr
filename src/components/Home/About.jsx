import CustomButton from '../CustomButton';
import './About.css';

export default function About() {
    return (
        <section id='about'>
            <h2>About StormXR!</h2>
            <p>We are a XR consulting and solutions company. More to come.</p>
            <CustomButton
                title='explore focuses'
                paddingY='12px'
                paddingX='24px'
                background='#212529'
                radius='7px'
                border='none'
                color='#fff'
                slide={true}
                slideBackground='linear-gradient(to right, blue -30%, purple)'
                width='max-content'
                href='#focuses'
            />
        </section>
    )
}