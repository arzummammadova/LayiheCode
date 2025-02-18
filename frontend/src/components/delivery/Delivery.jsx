import React, { useEffect, useState, useRef } from 'react';
import './deliver.scss';

const Delivery = () => {
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [booksCount, setBooksCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const targetSubscribers = 100000;
    const targetBooks = 100;

    const incrementSubscribers = Math.ceil(targetSubscribers / 100);
    const incrementBooks = Math.ceil(targetBooks / 100);

    const interval = setInterval(() => {
      setSubscribersCount(prev =>
        prev + incrementSubscribers >= targetSubscribers
          ? targetSubscribers
          : prev + incrementSubscribers
      );
      setBooksCount(prev =>
        prev + incrementBooks >= targetBooks ? targetBooks : prev + incrementBooks
      );
    }, 50);

    return () => clearInterval(interval);
  }, [hasAnimated]);

  return (
    <section id='delivery' ref={sectionRef}>
      <div className="container">
        <div className="delivary">
          <div className="row g-5">
            <div className="col-lg-6 delivary-text">
              <p>
                At Readly, we deliver top reading experiences, earning high ratings from users and experts alike.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-6 delivary-count">
                  <p style={{ textAlign: 'end' }}>{subscribersCount.toLocaleString()}</p>
                  <div className="green" style={{ fontSize: '1.5rem', textAlign: 'end' }}>
                    subscribers
                  </div>
                </div>
                <div className="col-6 delivary-count">
                  <p>{booksCount}+</p>
                  <div className="green" style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                    books
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Delivery;
