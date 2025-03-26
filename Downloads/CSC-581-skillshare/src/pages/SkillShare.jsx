import React, { useState, useEffect } from "react";
import {
  Typography,
  Input,
  Button,
  Select,
  Card,
  CardHeader,
  CardBody,
  Textarea,
} from "@material-tailwind/react";

export function SkillShare() {
  const [search, setSearch] = useState("");
  const [isListing, setIsListing] = useState(false);
  const [skillSharePosts, setSkillSharePosts] = useState([]);
  const [newSkill, setNewSkill] = useState({
    title: "",
    description: "",
    skill: "",
    subSkill: "",
    level: "",
    availability: "",
    price: "",
    location: "",
    image: null,
  });

  const skills = ["Academic Tutoring", "Creative Skills", "Technical Skills", "Life Skills", "Career Skills"];
  const subSkills = {
    "Academic Tutoring": ["Mathematics", "Science", "Languages", "Programming"],
    "Creative Skills": ["Painting", "Graphic Design", "Photography & Photo Editing", "Video Editing & Filmmaking", "Music"],
    "Technical Skills": ["Web Development", "Data Analysis", "IT Support"],
    "Life Skills": ["Cooking", "Budgeting", "Time Management", "Fitness"],
    "Career Skills": ["Management", "Communication", "Strategic Planning", "Sales", "Networking"],
  };
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const availability = ["Weekdays", "Weekends", "Evenings"];
  const locations = ["On-Campus", "Within 5 Miles"];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/skills/")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((s) => ({
          ...s,
          skill: s.skill_type,
          subSkill: s.sub_skill,
          provider: s.mentor_name,
          rating: s.average_rating || 0,
          price: s.price === 0 ? "Free" : `$${s.price}/hour`,
          image: s.iimage?.startsWith("/media")
            ? `http://127.0.0.1:8000${s.iimage}`
            : s.iimage || "https://via.placeholder.com/300x200",
        }));
        setSkillSharePosts(formatted);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleSubmitListing = () => {
    if (
      newSkill.title &&
      newSkill.description &&
      newSkill.skill &&
      newSkill.level &&
      newSkill.availability &&
      newSkill.location
    ) {
      const payload = new FormData();
      payload.append("title", newSkill.title);
      payload.append("description", newSkill.description);
      payload.append("skill_type", newSkill.skill);
      payload.append("sub_skill", newSkill.subSkill || "");
      payload.append("level", newSkill.level);
      payload.append("availability", newSkill.availability);
      payload.append("price", newSkill.price.replace("$", "").replace("/hour", "") || 0);
      payload.append("mentor_name", "Student");
      payload.append("location", newSkill.location);
      payload.append("iimage", newSkill.image);

      fetch("http://127.0.0.1:8000/api/skills/", {
        method: "POST",
        body: payload,
      })
        .then((res) => res.json())
        .then((data) => {
          const newPost = {
            ...data,
            skill: data.skill_type,
            subSkill: data.sub_skill,
            provider: data.mentor_name,
            rating: 0,
            image: data.image?.startsWith("/media")
              ? `http://127.0.0.1:8000${data.image}`
              : data.image || "https://via.placeholder.com/300x200",
            price: data.price === 0 ? "Free" : `$${data.price}/hour`,
          };
          setSkillSharePosts((prev) => [...prev, newPost]);
          setNewSkill({
            title: "",
            description: "",
            skill: "",
            subSkill: "",
            level: "",
            availability: "",
            price: "",
            location: "",
            image: null,
          });
          setIsListing(false);
        })
        .catch((err) => console.error("Submit error:", err));
    }
  };

  const filteredResults = skillSharePosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <Typography variant="h2" color="blue-gray" className="text-center font-bold mb-4">
          Skill Share
        </Typography>

        <div className="flex gap-4 mb-6">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Search skills, titles or mentors"
            className="flex-grow"
          />
          <Button onClick={() => setIsListing(true)} className="bg-green-700 text-white">
            Share Skill
          </Button>
        </div>

        {isListing && (
          <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg mb-10">
            <Typography variant="h5" className="mb-4 font-semibold">
              Share Your Skill
            </Typography>
            <Input label="Title" value={newSkill.title} onChange={(e) => setNewSkill({ ...newSkill, title: e.target.value })} className="mb-4" />
            <Textarea label="Description" value={newSkill.description} onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })} className="mb-4" />
            <Select value={newSkill.skill} onChange={(val) => setNewSkill({ ...newSkill, skill: val })} className="mb-4">
              <option value="">Select Skill Category</option>
              {skills.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
            <Select value={newSkill.subSkill} onChange={(val) => setNewSkill({ ...newSkill, subSkill: val })} className="mb-4">
              <option value="">Select Sub-Skill (optional)</option>
              {newSkill.skill && subSkills[newSkill.skill]?.map((ss) => (
                <option key={ss} value={ss}>{ss}</option>
              ))}
            </Select>
            <Select value={newSkill.level} onChange={(val) => setNewSkill({ ...newSkill, level: val })} className="mb-4">
              <option value="">Select Level</option>
              {levels.map((lvl) => <option key={lvl} value={lvl}>{lvl}</option>)}
            </Select>
            <Select value={newSkill.availability} onChange={(val) => setNewSkill({ ...newSkill, availability: val })} className="mb-4">
              <option value="">Availability</option>
              {availability.map((a) => <option key={a} value={a}>{a}</option>)}
            </Select>
            <Input label="Price (e.g., $10/hour or Free)" value={newSkill.price} onChange={(e) => setNewSkill({ ...newSkill, price: e.target.value })} className="mb-4" />
            <Select value={newSkill.location} onChange={(val) => setNewSkill({ ...newSkill, location: val })} className="mb-4">
              <option value="">Location</option>
              {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
            </Select>
            <Input
              type="file"
              label="Image"
              onChange={(e) => setNewSkill({ ...newSkill, image: e.target.files[0] })}
              className="mb-4"
            />
            <div className="flex gap-4">
              <Button onClick={handleSubmitListing} className="bg-blue-700 text-white">Submit</Button>
              <Button onClick={() => setIsListing(false)} className="bg-gray-500 text-white">Cancel</Button>
            </div>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResults.length > 0 ? (
            filteredResults.map((post) => (
              <Card key={post.id} className="shadow-lg">
                <CardHeader
                  floated={false}
                  className="relative"
                  style={{ height: "auto", maxHeight: "300px", overflow: "hidden" }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      maxHeight: "300px",
                      width: "100%",
                      objectFit: "contain",
                      backgroundColor: "#f0f0f0",
                      padding: "0.5rem",
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200";
                      e.target.alt = "Image not found";
                    }}
                  />
                  <div className="absolute bottom-1 left-1 bg-white bg-opacity-80 text-[10px] px-1 rounded-sm z-10">
                    {post.image}
                  </div>
                </CardHeader>
                <CardBody className="p-4">
                  <Typography variant="h5" className="font-semibold mb-2">{post.title}</Typography>
                  <Typography variant="small" className="mb-2 text-gray-700">{post.description}</Typography>
                  <Typography variant="small" className="text-blue-gray-600 mb-1">{post.skill} — {post.subSkill}</Typography>
                  <Typography variant="small" className="text-green-700 font-bold mb-1">{post.price}</Typography>
                  <Typography variant="small" className="text-gray-600 mb-1">{post.availability} | {post.location}</Typography>
                </CardBody>
              </Card>
            ))
          ) : (
            <Typography variant="h6" className="text-center col-span-full text-gray-500">
              No skills found.
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillShare;
