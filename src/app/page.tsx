import Image from 'next/image';
import { Card } from 'some-ui-library'; // Adjust according to the actual UI library you're using

const LandingPage = () => {
    return (
        <div className='landing-page'>
            <h1>Welcome to My Way Liberia</h1>
            <div className='card-container'>
                <Card>
                    <Image src='/assets/image1.jpg' alt='Description 1' width={500} height={300} />
                    <p>Card 1 description</p>
                </Card>
                <Card>
                    <Image src='/assets/image2.jpg' alt='Description 2' width={500} height={300} />
                    <p>Card 2 description</p>
                </Card>
                <Card>
                    <Image src='/assets/image3.jpg' alt='Description 3' width={500} height={300} />
                    <p>Card 3 description</p>
                </Card>
            </div>
            <style jsx>{` 
                .landing-page {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                }
                .card-container {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
