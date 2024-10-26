import React from "react";
import landingPageVector from "../assets/landing-page-vector.jpg";
import eyeXray from "../assets/landing-page-xray.png";
const LandingPage = () => {
  return (
    <div className="relative h-screen flex justify-end items-center">
      <div class="absolute lg:left-32 bg-gray-50 bg-opacity-80 p-6 max-w-5xl mx-auto text-gray-700 z-10">
        <div className="flex items-center">
          <img src={eyeXray} alt="Hello" className="w-14" />
          <p class="text-lg font-semibold mb-2">
            Radiographic Images on the go
          </p>
        </div>
        <h1 class="text-7xl font-bold mb-4 text-gray-900">Röntgen Archive</h1>
        <p class="text-lg font-semibold mb-2">
          Your Ultimate Digital Library of Radiographic Images
        </p>
        <p class="mb-4">
          Discover a comprehensive resource for radiographic imaging, curated
          for students, practitioners, and researchers. With Röntgen Archive,
          you can easily access a wealth of high-quality X-rays, CT scans, and
          MRIs all in one place.
        </p>
        <ul class="list-disc list-inside mb-4">
          <li>
            <span class="font-semibold">For Practitioners:</span> Quick access
            to categorized images, supporting clinical learning and patient
            care.
          </li>
          <li>
            <span class="font-semibold">For Students:</span> A learning-friendly
            library to analyze and study radiographs without extensive
            searching.
          </li>
          <li>
            <span class="font-semibold">Research Support:</span> Reliable,
            organized data to aid in medical research and case studies.
          </li>
        </ul>
        <p class="mb-4">
          Explore organized categories, detailed descriptions, and a vast array
          of radiographic resources tailored to your educational and
          professional needs.
        </p>
      </div>

      <img
        src={landingPageVector}
        alt="Rontgen Archive platform logo"
        className="hidden lg:block h-screen object-cover"
      />
    </div>
  );
};

export default LandingPage;
