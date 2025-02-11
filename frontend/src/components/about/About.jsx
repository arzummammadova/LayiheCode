import React, { useState } from 'react';
import './about.scss';

const About = () => {
  const [formData, setFormData] = useState({ email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:arzuam-af106@code.edu.az?subject=Rey və Təklif&body=Email: ${formData.email}%0A%0AMesaj: ${formData.message}`;
  };

  return (
    <section>
      <div className="container">
       <div className="about">
        <div className="row">
          <div className="col-lg-6"></div>

          <div className="col-lg-6 rightabout">
            <p className="desc">Bizimlə əlaqə</p>
            <h2>Bizimlə Əlaqə Saxlayın</h2>
            <p>Fikirlərinizi bizimlə bölüşməkdən çəkinməyin. Rəy və təkliflərinizi paylaşın:</p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Emailinizi daxil edin"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Rəy və təkliflərinizi yazın"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit">Göndər</button>
            </form>
          </div>
        </div>
      </div>  
      </div>
     
    </section>
  );
};

export default About;