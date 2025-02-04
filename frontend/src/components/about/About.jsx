import React from 'react'
import './about.scss'
import { CiPlay1 } from "react-icons/ci";
const About = () => {
  return (
    <>

    <section>
        <div className="about">
            <div className="row">
                <div className="col-lg-6">

                </div>

                <div className="col-lg-6 rightabout">
                    <p className="desc">About Furnish</p>
                     <h2>Quality Makes the Belief for Customers</h2>
                     <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>

                     <button>
                     <CiPlay1 />
                     </button>
                    <span>wathc</span>
                </div>
            </div>
        </div>
    </section>
      
    </>
  )
}

export default About
