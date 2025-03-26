import React, { useState } from "react";

const resources = {
  "Study Materials": [
    { name: "OpenStax Textbooks", link: "https://openstax.org/" },
    { name: "Khan Academy", link: "https://www.khanacademy.org/" },
  ],
  "Tutoring Services": [
    { name: "Peer Tutoring Center", link: "https://campus.edu/tutoring" },
  ],
  "Career Resources": [
    { name: "LinkedIn Learning", link: "https://www.linkedin.com/learning/" },
    { name: "Internship Listings", link: "https://csudh.joinhandshake.com/stu/postings" },
    { name: "Jake's Resume Template", link: "https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs" },
    { name: "Various Resume Templates", link: "https://resumebuild.com/resume/templates/" },
  ],
  "Mental Health & Wellness": [
    { name: "Campus Counseling", link: "https://campus.edu/counseling" },
  ],
};

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = Object.fromEntries(
    Object.entries(resources).map(([category, links]) => [
      category,
      links.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase())),
    ]).filter(([_, links]) => links.length > 0)
  );

  return (
    <div className="p-6 max-w-5xl mx-auto bg-teal-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-teal-700">Student Resources</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-teal-500"
        />
        <button className="ml-4 bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition">
          Suggest a Resource
        </button>
      </div>
      {Object.entries(filteredResources).map(([category, links]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-teal-800 border-l-4 border-teal-500 pl-2">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {links.map(({ name, link }) => (
              <div key={name} className="shadow-lg rounded-lg p-6 bg-white hover:bg-teal-100 transition border-t-4 border-teal-500 text-center">
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-teal-700 font-semibold text-lg hover:underline">
                  {name}
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="text-center mt-6">
        <button className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-700 transition">
          View More Resources
        </button>
      </div>
    </div>
  );
};

export default Resources;
