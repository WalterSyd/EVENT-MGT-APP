import React from 'react';

const OurServices = () => {
  return (
    <div className="our-services">
      <h1>Our Services</h1>
      <p>
        At Event Mastarz, we pride ourselves on delivering a comprehensive suite of event management services tailored to meet the diverse needs of our clients. With a focus on creativity, detail, and excellence, we ensure every aspect of your event is expertly managed.
      </p>

      <div className="services-grid">
        <div className="service-card">
          <h2>Event Planning & Coordination</h2>
          <p>
            Our dedicated planners guide you through every step of the event planning process. From initial concept discussions to final execution, we manage all logistics, timelines, and vendor coordination to ensure a seamless experience.
          </p>
          <img src="/tools/Event-planning.avif" alt="Event Planning" />
        </div>

        <div className="service-card">
          <h2>Venue Selection</h2>
          <p>
            We assist you in selecting a location that not only fits your vision and budget but also enhances the overall ambiance of your event. Our extensive network allows us to recommend venues that suit any style or requirement.
          </p>
          <img src="/tools/Venue.avif" alt="Venue Selection" />
        </div>

        <div className="service-card">
          <h2>Design & Décor</h2>
          <p>
            Our talented design team transforms spaces into extraordinary environments that reflect your theme and personality. We offer comprehensive design services, including custom décor, lighting, and floral arrangements, to create a captivating atmosphere.
          </p>
          <img src="/tools/Design.avif" alt="Design & Décor" />
        </div>

        <div className="service-card">
          <h2>Catering Services</h2>
          <p>
            We partner with top caterers to provide a diverse range of menu options that cater to all tastes and dietary restrictions, ensuring your guests enjoy a memorable culinary experience.
          </p>
          <img src="/tools/Catering.avif" alt="Catering Services" />
        </div>

        <div className="service-card">
          <h2>Audio-Visual & Technology</h2>
          <p>
            We provide state-of-the-art audio-visual solutions, including lighting, sound systems, and live streaming capabilities, to enhance your event and engage your audience.
          </p>
          <img src="/tools/Audiovisual.avif" alt="Audio-Visual & Technology" />
        </div>

        <div className="service-card">
          <h2>On-Site Management</h2>
          <p>
            Our experienced team is there to oversee every detail on the day of your event, managing set-up, coordinating with vendors, and handling any unexpected challenges.
          </p>
          <img src="/tools/On-site-mgt.avif" alt="On-Site Management" />
        </div>

        <div className="service-card">
          <h2>Post-Event Support</h2>
          <p>
            Our commitment doesn’t end when the event concludes. We conduct a comprehensive post-event analysis to gather feedback and insights, helping you assess the success of the event and plan for future occasions.
          </p>
          <img src="/tools/Post-event-support.png" alt="Post-Event Support" />
        </div>

        <div className="service-card">
          <h2>Custom Packages</h2>
          <p>
            We offer customizable service packages to fit your specific needs and budget, ensuring a tailored experience for any type of event.
          </p>
          <img src="/tools/custom.jpeg" alt="Custom Packages" />
        </div>

        <div className="service-card">
          <h2>Consultation & Strategy</h2>
          <p>
            For those looking for guidance, we provide consultation services to help you strategize and develop a cohesive event plan, offering valuable insights that enhance your event’s impact.
          </p>
          <img src="/tools/Consultaion.avif" alt="Consultation & Strategy" />
        </div>
      </div>

      <p>
        Let Event Mastarz be your trusted partner in creating extraordinary events that leave lasting memories. Together, we can craft an experience that reflects your vision and engages your audience. Contact us today to learn more about how we can bring your event to life!
      </p>
    </div>
  );
};

export default OurServices;