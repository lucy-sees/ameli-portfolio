import React from 'react';

const ContactSection = () => {
    return (
        <section id="contact">
            <h2>Contact Me</h2>
            <form action="https://example.com/submit" method="POST">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit">Send</button>
            </form>
            <div className="contact-info">
                <h3>Other Ways to Reach Me:</h3>
                <p>Email: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
                <p>Phone: (123) 456-7890</p>
            </div>
        </section>
    );
};

export default ContactSection;