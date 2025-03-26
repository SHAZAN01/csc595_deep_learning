/*
Names: Christopher Luna

CSC 581 
Software Development
2/14/2025
*/

import React, { useState } from "react";
import { Card, CardHeader, CardBody, Typography, Input, Button, Textarea, Select, Slider, Checkbox, Drawer } from "@material-tailwind/react";

// Dummy data for marketplace items (expanded with new categories and 2 items per category)
const marketplaceItems = [
  { id: 1, title: "Calculus Textbook", price: 40, image: "/img/textbook1.jpg", description: "A used calculus textbook in good condition.", category: "Textbooks", subCategory: "Math", course: "MATH 101", major: "Mathematics", condition: "Used" },
  { id: 2, title: "Dorm Essentials Kit", price: 25, image: "/img/dorm-essentials.jpg", description: "Includes bedding, desk lamp, and storage bins.", category: "Household", subCategory: "Essentials", course: "", major: "", condition: "Like New" },
  { id: 3, title: "Bluetooth Headphones", price: 60, image: "/img/headphones.jpg", description: "Lightly used headphones with noise cancellation.", category: "Electronics", subCategory: "Speakers", course: "", major: "", condition: "Used" },
  { id: 4, title: "Graphic Design Tablet", price: 120, image: "/img/tablet.jpg", description: "Perfect for design students, works like new.", category: "Electronics", subCategory: "Laptops", course: "ART 250", major: "Graphic Design", condition: "Like New" },
  { id: 5, title: "Economics Textbook", price: 35, image: "/img/textbook2.jpg", description: "Essential textbook for ECON 101.", category: "Textbooks", subCategory: "Economics", course: "ECON 101", major: "Economics", condition: "Used" },
  { id: 6, title: "Coffee Maker", price: 50, image: "/img/coffee-maker.jpg", description: "Ideal for dorm coffee breaks, barely used.", category: "Household", subCategory: "Appliances", course: "", major: "", condition: "Like New" },
  { id: 7, title: "iPhone 13", price: 300, image: "/img/iphone.jpg", description: "Lightly used iPhone 13, excellent condition.", category: "Electronics", subCategory: "Phones", course: "", major: "", condition: "Used" },
  { id: 8, title: "Gaming Laptop", price: 800, image: "/img/gaming-laptop.jpg", description: "Powerful laptop for gaming and studies.", category: "Electronics", subCategory: "Laptops", course: "CS 101", major: "Computer Science", condition: "Like New" },
  { id: 9, title: "Portable Speaker", price: 45, image: "/img/speaker.jpg", description: "Small, wireless speaker with great sound.", category: "Electronics", subCategory: "Speakers", course: "", major: "", condition: "New" },
  { id: 10, title: "Couch", price: 150, image: "/img/couch.jpg", description: "Comfortable used couch, perfect for dorms.", category: "Household", subCategory: "Couches", course: "", major: "", condition: "Used" },
  { id: 11, title: "Study Desk", price: 80, image: "/img/desk.jpg", description: "Sturdy wooden desk for dorm or apartment.", category: "Household", subCategory: "Tables", course: "", major: "", condition: "Like New" },
  { id: 12, title: "Office Chair", price: 60, image: "/img/chair.jpg", description: "Ergonomic chair, lightly used.", category: "Household", subCategory: "Chairs", course: "", major: "", condition: "Used" },
  { id: 13, title: "Mattress", price: 100, image: "/img/mattress.jpg", description: "Queen size mattress, good condition.", category: "Household", subCategory: "Mattresses", course: "", major: "", condition: "Used" },
  { id: 14, title: "iPhone 14", price: 400, image: "/img/iphone14.jpg", description: "Brand new iPhone 14, never used, excellent condition.", category: "Electronics", subCategory: "Phones", course: "", major: "", condition: "New" },
  { id: 15, title: "Calculus 2 Textbook", price: 45, image: "/img/textbook2.jpg", description: "Used Calculus 2 textbook, good condition for MATH 102.", category: "Textbooks", subCategory: "Math", course: "MATH 102", major: "Mathematics", condition: "Used" },
  { id: 16, title: "Calculus 3 Textbook", price: 50, image: "/img/textbook3.jpg", description: "Lightly used Calculus 3 textbook, great for advanced math students.", category: "Textbooks", subCategory: "Math", course: "MATH 103", major: "Mathematics", condition: "Like New" },
  { id: 17, title: "Wireless Keyboard", price: 30, image: "/img/keyboard.jpg", description: "Portable wireless keyboard, lightly used, perfect for laptops.", category: "Electronics", subCategory: "Laptops", course: "", major: "", condition: "Used" },
  { id: 18, title: "Samsung Galaxy S23", price: 350, image: "/img/galaxy.jpg", description: "Used Samsung Galaxy S23, good condition with minor scratches.", category: "Electronics", subCategory: "Phones", course: "", major: "", condition: "Used" },
  { id: 19, title: "Bluetooth Earbuds", price: 55, image: "/img/earbuds.jpg", description: "Brand new Bluetooth earbuds, noise-canceling, sealed package.", category: "Electronics", subCategory: "Speakers", course: "", major: "", condition: "New" },
  { id: 20, title: "Mini Fridge", price: 70, image: "/img/minifridge.jpg", description: "Compact mini fridge for dorms, lightly used, great condition.", category: "Household", subCategory: "Appliances", course: "", major: "", condition: "Like New" },
  { id: 21, title: "Leather Couch", price: 200, image: "/img/leathercouch.jpg", description: "Used leather couch, clean and comfortable for dorm living.", category: "Household", subCategory: "Couches", course: "", major: "", condition: "Used" },
  { id: 22, title: "Glass Coffee Table", price: 90, image: "/img/coffeetable.jpg", description: "Modern glass coffee table, lightly used, excellent condition.", category: "Household", subCategory: "Tables", course: "", major: "", condition: "Like New" },
  { id: 23, title: "Dining Chair Set", price: 75, image: "/img/diningchairs.jpg", description: "Set of 2 dining chairs, used but in good condition.", category: "Household", subCategory: "Chairs", course: "", major: "", condition: "Used" },
  { id: 24, title: "Twin Mattress", price: 90, image: "/img/twinmattress.jpg", description: "Used twin mattress, clean and firm, perfect for dorms.", category: "Household", subCategory: "Mattresses", course: "", major: "", condition: "Used" },
  { id: 25, title: "Physics Textbook", price: 38, image: "/img/physicsbook.jpg", description: "Used Physics textbook for PHYS 101, good condition.", category: "Textbooks", subCategory: "Science", course: "PHYS 101", major: "Physics", condition: "Used" },
  { id: 26, title: "MacBook Pro 16\"", price: 1200, image: "/img/macbook.jpg", description: "Lightly used MacBook Pro 16\", perfect for students, great condition.", category: "Electronics", subCategory: "Laptops", course: "CS 201", major: "Computer Science", condition: "Like New" },
  
  // New Categories and Items
  { id: 27, title: "Leather Jacket", price: 80, image: "/img/leatherjacket.jpg", description: "Stylish used leather jacket, good condition for students.", category: "Clothing & Accessories", subCategory: "Jackets", course: "", major: "", condition: "Used" },
  { id: 28, title: "Running Shoes", price: 50, image: "/img/runningshoes.jpg", description: "Lightly used running shoes, size 9, great for sports.", category: "Clothing & Accessories", subCategory: "Shoes", course: "", major: "", condition: "Like New" },
  { id: 29, title: "Mountain Bike", price: 150, image: "/img/mountainbike.jpg", description: "Used mountain bike, good condition, ideal for campus.", category: "Sports Equipment", subCategory: "Bikes", course: "", major: "", condition: "Used" },
  { id: 30, title: "Tennis Racket", price: 40, image: "/img/tennisracket.jpg", description: "Lightly used tennis racket, excellent condition.", category: "Sports Equipment", subCategory: "Tennis Rackets", course: "", major: "", condition: "Like New" },
  { id: 31, title: "Acoustic Guitar", price: 120, image: "/img/acousticguitar.jpg", description: "Used acoustic guitar, good condition, great for beginners.", category: "Musical Instruments", subCategory: "Guitars", course: "", major: "", condition: "Used" },
  { id: 32, title: "Digital Keyboard", price: 200, image: "/img/keyboardinstrument.jpg", description: "Brand new digital keyboard, perfect for music students.", category: "Musical Instruments", subCategory: "Keyboards", course: "", major: "", condition: "New" },
  { id: 33, title: "Oil Paint Set", price: 30, image: "/img/oilpaints.jpg", description: "Used oil paint set, good condition for art projects.", category: "Art Supplies", subCategory: "Paint Sets", course: "ART 101", major: "Graphic Design", condition: "Used" },
  { id: 34, title: "Sketchbook Set", price: 15, image: "/img/sketchbook.jpg", description: "New sketchbook set, ideal for drawing students.", category: "Art Supplies", subCategory: "Sketchbooks", course: "ART 250", major: "Graphic Design", condition: "New" },
  { id: 35, title: "Bookcase", price: 70, image: "/img/bookcase.jpg", description: "Used bookcase, sturdy and clean, perfect for dorms.", category: "Furniture", subCategory: "Bookcases", course: "", major: "", condition: "Used" },
  { id: 36, title: "TV Stand", price: 60, image: "/img/tvstand.jpg", description: "Lightly used TV stand, modern design, great condition.", category: "Furniture", subCategory: "TV Stands", course: "", major: "", condition: "Like New" },
  { id: 37, title: "PlayStation 5", price: 450, image: "/img/ps5.jpg", description: "Used PlayStation 5, good condition, includes one controller.", category: "Gaming Gear", subCategory: "Consoles", course: "", major: "", condition: "Used" },
  { id: 38, title: "Gaming Headset", price: 70, image: "/img/gamingheadset.jpg", description: "Brand new gaming headset, noise-canceling, perfect for gamers.", category: "Gaming Gear", subCategory: "Headsets", course: "", major: "", condition: "New" },
  { id: 39, title: "USB-C Charger", price: 20, image: "/img/usbcharger.jpg", description: "New USB-C charger, fast charging, compatible with laptops/phones.", category: "Tech Accessories", subCategory: "Chargers", course: "", major: "", condition: "New" },
  { id: 40, title: "External Hard Drive", price: 80, image: "/img/externaldrive.jpg", description: "Used 1TB external hard drive, good condition for backups.", category: "Tech Accessories", subCategory: "External Drives", course: "", major: "", condition: "Used" },
];

// Dummy user data
const users = [
  { id: 1, name: "Alice", skills: "Selling Textbooks" },
  { id: 2, name: "Bob", skills: "Electronics Expert" },
];

export function StudentMarketplace() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [searchType, setSearchType] = useState("items");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedMajors, setSelectedMajors] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("newest");
  const [isListing, setIsListing] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", description: "", price: "", image: "", category: "", subCategory: "", course: "", major: "", condition: "" });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const categories = ["Textbooks", "Electronics", "Household", "Clothing & Accessories", "Sports Equipment", "Musical Instruments", "Art Supplies", "Furniture", "Gaming Gear", "Tech Accessories"];
  const subCategories = {
    Textbooks: ["Math", "Economics", "Science"],
    Electronics: ["Laptops", "Phones", "Speakers"],
    Household: ["Essentials", "Couches", "Tables", "Chairs", "Mattresses", "Appliances"],
    "Clothing & Accessories": ["Jackets", "Shoes", "Backpacks", "Hats", "Jewelry"],
    "Sports Equipment": ["Bikes", "Tennis Rackets", "Yoga Mats", "Soccer Balls", "Weight Sets"],
    "Musical Instruments": ["Guitars", "Keyboards", "Drums", "Violins", "Amplifiers"],
    "Art Supplies": ["Paint Sets", "Sketchbooks", "Easels", "Canvases", "Drawing Tablets"],
    Furniture: ["Bookcases", "Shelves", "TV Stands", "Beds", "Dressers"],
    "Gaming Gear": ["Consoles", "Controllers", "Headsets", "Games", "Monitors"],
    "Tech Accessories": ["Chargers", "Cables", "Mouse", "External Drives", "Webcams"],
  };
  const courses = ["MATH 101", "MATH 102", "MATH 103", "ECON 101", "CS 101", "CS 201", "ART 101", "ART 250", "PHYS 101"];
  const majors = ["Mathematics", "Economics", "Computer Science", "Graphic Design", "Physics"];
  const conditions = ["New", "Like New", "Used", "Damaged"];

  const availableCategories = [...new Set(marketplaceItems.map(item => item.category))];
  const availableSubCategories = [...new Set(marketplaceItems.filter(item => selectedCategories.length === 0 || selectedCategories.includes(item.category)).map(item => item.subCategory))];

  const filteredResults = searchType === "items"
    ? marketplaceItems
        .filter(item => 
          (item.title.toLowerCase().includes(search.toLowerCase()) || 
           item.description.toLowerCase().includes(search.toLowerCase())) &&
          (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
          (selectedSubCategories.length === 0 || selectedSubCategories.includes(item.subCategory)) &&
          (selectedCourses.length === 0 || selectedCourses.includes(item.course)) &&
          (selectedMajors.length === 0 || selectedMajors.includes(item.major)) &&
          (selectedConditions.length === 0 || selectedConditions.includes(item.condition)) &&
          item.price >= priceRange[0] && item.price <= priceRange[1]
        )
        .sort((a, b) => {
          switch (sortOption) {
            case "price-low":
              return a.price - b.price;
            case "price-high":
              return b.price - a.price;
            case "newest":
              return b.id - a.id; // Assuming higher ID means newer
            case "popular":
              return b.id - a.id; // Mock popularity with ID (replace with actual data later)
            default:
              return 0;
          }
        })
    : users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

  const handleFilterChange = (type, value, checked) => {
    switch (type) {
      case "category":
        setSelectedCategories(prev => 
          checked ? [...prev, value] : prev.filter(c => c !== value)
        );
        setSelectedSubCategories([]); // Reset subcategories when category changes
        break;
      case "subCategory":
        setSelectedSubCategories(prev => 
          checked ? [...prev, value] : prev.filter(sc => sc !== value)
        );
        break;
      case "course":
        setSelectedCourses(prev => 
          checked ? [...prev, value] : prev.filter(c => c !== value)
        );
        break;
      case "major":
        setSelectedMajors(prev => 
          checked ? [...prev, value] : prev.filter(m => m !== value)
        );
        break;
      case "condition":
        setSelectedConditions(prev => 
          checked ? [...prev, value] : prev.filter(co => co !== value)
        );
        break;
    }
  };

  const handleListClick = () => {
    setIsListing(true);
  };

  const handleSubmitListing = () => {
    if (newItem.title && newItem.description && newItem.price && newItem.image && newItem.category && newItem.subCategory && newItem.condition) {
      const newItemEntry = {
        id: marketplaceItems.length + 1,
        title: newItem.title,
        price: parseFloat(newItem.price) || 0, // Convert to number for filtering
        image: newItem.image,
        description: newItem.description,
        category: newItem.category,
        subCategory: newItem.subCategory,
        course: newItem.course || "",
        major: newItem.major || "",
        condition: newItem.condition,
      };
      marketplaceItems.push(newItemEntry); // Add to dummy data (replace with API call later)
      setIsListing(false);
      setNewItem({ title: "", description: "", price: "", image: "", category: "", subCategory: "", course: "", major: "", condition: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <Typography variant="h2" color="blue-gray" className="mb-4 text-center font-bold">
          Student Marketplace
        </Typography>
        <Typography className="mb-8 text-center text-gray-600 font-medium">
          Buy and sell items like textbooks, electronics, household goods, and more—just for students!
        </Typography>

        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => setIsDrawerOpen(true)}
            className="w-24 p-2 border rounded bg-white shadow-sm hover:shadow-md transition-shadow text-gray-700"
          >
            Filters
          </Button>
          <Input
            type="text"
            placeholder={`Search ${searchType === "items" ? "items" : "users"}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow p-2 border rounded shadow-sm hover:shadow-md transition-shadow"
          />
          <Button className="bg-[#2870bd] hover:bg-[#19787f] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg">
            Search
          </Button>
        </div>

        <Drawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          placement="left"
          className="w-80 p-4 bg-white shadow-2xl rounded-r-lg"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h5" color="blue-gray" className="font-bold">Filters</Typography>
              <Button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
              >
                <span className="text-xl">×</span> {/* "X" close button */}
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2"> {/* Scrollable content */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="font-semibold">Categories</Typography>
                  {availableCategories.map(category => (
                    <Checkbox
                      key={category}
                      label={category}
                      checked={selectedCategories.includes(category)}
                      onChange={(e) => handleFilterChange("category", category, e.target.checked)}
                      className="p-2"
                    />
                  ))}
                </div>

                {availableSubCategories.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <Typography variant="h6" color="blue-gray" className="font-semibold">Subcategories</Typography>
                    {availableSubCategories.map(subCategory => (
                      <Checkbox
                        key={subCategory}
                        label={subCategory}
                        checked={selectedSubCategories.includes(subCategory)}
                        onChange={(e) => handleFilterChange("subCategory", subCategory, e.target.checked)}
                        className="p-2"
                      />
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="font-semibold">Courses</Typography>
                  {courses.map(course => (
                    <Checkbox
                      key={course}
                      label={course}
                      checked={selectedCourses.includes(course)}
                      onChange={(e) => handleFilterChange("course", course, e.target.checked)}
                      className="p-2"
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="font-semibold">Majors</Typography>
                  {majors.map(major => (
                    <Checkbox
                      key={major}
                      label={major}
                      checked={selectedMajors.includes(major)}
                      onChange={(e) => handleFilterChange("major", major, e.target.checked)}
                      className="p-2"
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="font-semibold">Condition</Typography>
                  {conditions.map(condition => (
                    <Checkbox
                      key={condition}
                      label={condition}
                      checked={selectedConditions.includes(condition)}
                      onChange={(e) => handleFilterChange("condition", condition, e.target.checked)}
                      className="p-2"
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="font-semibold">Price Range ($)</Typography>
                  <Slider
                    value={priceRange}
                    onChange={(value) => setPriceRange(value)}
                    min={0}
                    max={1000}
                    step={1} // Fine control for clicking and dragging anywhere
                    className="w-full"
                    color="blue"
                    thumbColor="blue"
                    trackColor="blue"
                    onMouseDown={(e) => e.preventDefault()} // Ensure click-and-drag works
                    onTouchStart={(e) => e.preventDefault()} // Ensure touch dragging works
                  />
                  <Typography variant="small" color="gray">{`$${priceRange[0]} - $${priceRange[1]}`}</Typography>
                </div>

                <div className="flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="font-semibold">Sort By</Typography>
                  <Select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="newest">Newest Listings</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </Drawer>

        <div className="flex justify-end mb-8">
          <Button onClick={handleListClick} className="bg-[#187d13] hover:bg-[#0b9c03] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg">
            List Item
          </Button>
        </div>

        {isListing && (
          <div className="max-w-lg mx-auto mb-8 bg-white p-6 rounded-lg shadow-lg">
            <Typography variant="h5" color="blue-gray" className="mb-4 font-semibold">List New Item</Typography>
            <Input
              placeholder="Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="mb-4 p-2 border rounded"
            />
            <Textarea
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="mb-4 p-2 border rounded"
            />
            <Input
              placeholder="Price (e.g., 50)"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="mb-4 p-2 border rounded"
            />
            <Input
              placeholder="Image URL"
              value={newItem.image}
              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
              className="mb-4 p-2 border rounded"
            />
            <Select
              value={newItem.category}
              onChange={(value) => setNewItem({ ...newItem, category: value, subCategory: "" })}
              className="mb-4 p-2 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
            <Select
              value={newItem.subCategory}
              onChange={(value) => setNewItem({ ...newItem, subCategory: value })}
              className="mb-4 p-2 border rounded"
              disabled={!newItem.category}
            >
              <option value="">Select Subcategory</option>
              {newItem.category && subCategories[newItem.category].map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </Select>
            <Select
              value={newItem.course}
              onChange={(value) => setNewItem({ ...newItem, course: value })}
              className="mb-4 p-2 border rounded"
            >
              <option value="">Select Course (Optional)</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </Select>
            <Select
              value={newItem.major}
              onChange={(value) => setNewItem({ ...newItem, major: value })}
              className="mb-4 p-2 border rounded"
            >
              <option value="">Select Major (Optional)</option>
              {majors.map(major => (
                <option key={major} value={major}>{major}</option>
              ))}
            </Select>
            <Select
              value={newItem.condition}
              onChange={(value) => setNewItem({ ...newItem, condition: value })}
              className="mb-4 p-2 border rounded"
            >
              <option value="">Select Condition</option>
              {conditions.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </Select>
            <div className="flex gap-4">
              <Button onClick={handleSubmitListing} className="bg-[#2870bd] hover:bg-[#19787f] text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg">
                Submit Listing
              </Button>
              <Button onClick={() => setIsListing(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg">
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResults.map(result => (
            <Card key={result.id} className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
              <CardHeader floated={false} className="relative h-56">
                <img src={result.image} alt={result.title} className="h-full w-full object-cover" onError={(e) => { e.target.src = "https://via.placeholder.com/300x200"; }} />
              </CardHeader>
              <CardBody className="p-4">
                {searchType === "items" ? (
                  <>
                    <Typography variant="h5" color="blue-gray" className="mb-2 font-semibold">{result.title}</Typography>
                    <Typography variant="h6" color="green" className="mb-2 font-medium">${result.price}</Typography>
                    <Typography variant="small" color="gray" className="mb-2">{result.description}</Typography>
                    <Typography variant="small" color="blue-gray" className="font-medium">
                      Category: {result.category} | Subcategory: {result.subCategory} | 
                      {result.course && ` Course: ${result.course}`} {result.major && `| Major: ${result.major}`} | 
                      Condition: {result.condition}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h5" color="blue-gray" className="mb-2 font-semibold">{result.name}</Typography>
                    <Typography variant="small" color="gray" className="font-medium">Skills: {result.skills}</Typography>
                  </>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentMarketplace;