import React from 'react';
import imgHero from '../assets/hero_img.jpg'
const Banner = () => {
    return (
        <div>
            <div className="hero bg-base-200 min-h-[70vh] rounded-2xl my-y container mx-auto">
  <div className="hero-content flex-col lg:flex-row-reverse w-full justify-between">
    <img
      alt="Tailwind CSS hero component"
      src={imgHero}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">Books to freshen up <br />your bookshelf</h1>
      
      <button className="btn btn-primary mt-4">view the list</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default Banner;