import React from "react";
import "./CallToAction.scss";

const CallToAction = () => {
  return (
    <div className="container">
    <section className="cta-section">
      <div className="cta-content">
        <h2 className="cta-title">
          Unlock a World of Books, Reviews, and Recommendations
        </h2>
        <p className="cta-description">
          Whether you're an avid reader or someone looking for your next great story, our platform offers endless possibilities. From thrilling mysteries to thought-provoking non-fiction, our collection is curated to match your taste and preferences. Explore books, share your thoughts, and join a community of passionate readers who love to discuss and recommend the best reads.
        </p>
      
        <button className="cta-button">Join Now and Start Your Reading Adventure</button>
      </div>
    </section>
    </div>

  );
};

export default CallToAction;
