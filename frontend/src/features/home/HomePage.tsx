import "./Home.css";

export default function HomePage() {
    return (
        <>
            <div className="home-div">
                <h1 className="home-title">Why Therapy Hub?</h1>
                <p className="page-intro-home">At <b>Therapy Hub</b>, we believe that everyone deserves access to quality mental health care. That's why we've created an innovative platform that connects individuals with licensed therapists, right from the comfort of their own home. Our mission is to improve the lives of those we serve, and we're proud of the positive impact we've had on so many people.</p>
                <p className="page-intro-home">Our clients come to us with a wide range of mental health challenges, from stress and anxiety to depression and trauma. But what they all have in common is a desire for a better life, and a willingness to invest in their mental health. With the support and guidance of our therapists, our clients are able to make real and lasting change. They learn new coping strategies, gain new insights into their thoughts and emotions, and develop greater resilience in the face of life's challenges.</p>
                <p className="page-intro-home">We're humbled by the stories of hope and healing that we hear from our clients every day. Here are just a few of their testimonials:</p>
                {/* <div className="testimonials">
                    {testimonials.map((testimonial, i) => <TestimonialComponent {...testimonial} key={i}/>)}
                </div> */}
                <p className="page-intro-home">If you're ready to invest in your mental health and wellbeing, we'd love to help. Browse our directory of therapists today, and take the first step towards a happier, healthier life.</p>
            </div>
        </>
    )
}