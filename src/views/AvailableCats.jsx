import { useEffect, useState } from "react";

const availableCats = [
  { name: "Whiskers", age: "2", breed: "Persian" },
  { name: "Mittens", age: "2", breed: "Bengal" },
  { name: "Shadow", age: "1", breed: "Sphynx" },
  { name: "Pumpkin", age: "3", breed: "Siamese" },
  { name: "Luna", age: "4", breed: "Abyssinian" },
  { name: "Simba", age: "2", breed: "Peterbald" },
];

export default function AvailableCats() {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCatImages = async () => {
      try {
        const responses = await Promise.all(
          availableCats.map(() =>
            fetch("https://api.thecatapi.com/v1/images/search").then((res) =>
              res.json()
            )
          )
        );
        const catsWithImages = availableCats.map((cat, index) => ({
          ...cat,
          image: responses[index][0].url,
        }));

        setCats(catsWithImages);
        setFilteredCats(catsWithImages);
      } catch (error) {
        console.error("Error fetching cat images:", error);
      }
    };

    fetchCatImages();
  }, []);

  const handleFilter = () => {
    let filtered = cats;

    if (selectedBreed !== "all") {
      filtered = filtered.filter((cat) => cat.breed === selectedBreed);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCats(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedBreed, searchTerm]);

  return (
    <div className="purrfect-adoption">
      <header className="header">
        <h1>Purrfect Adoption</h1>
        <nav>
          <a href="#available-cats">Available cats</a>
          <a href="#donate">Donate</a>
        </nav>
      </header>
      <main>
        <div className="filter-container">
          <select
            className="filter"
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            <option value="all">All Breeds</option>
            <option value="Sphynx">Sphynx</option>
            <option value="Peterbald">Peterbald</option>
            <option value="Birman">Birman</option>
            <option value="Abyssinian">Abyssinian</option>
            <option value="Persian">Persian</option>
            <option value="Bengal">Bengal</option>
            <option value="Siamese">Siamese</option>
          </select>
          <input
            type="text"
            placeholder="Search by name"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <h2>Available Cats</h2>
        <div className="cats-grid">
          {filteredCats.map((cat, index) => (
            <div key={index} className="cat-card">
              <img src={cat.image} alt={cat.name} className="cat-image" />
              <div className="cat-info">
                <p><strong>Name:</strong> {cat.name}</p>
                <p><strong>Age:</strong> {cat.age}</p>
                <p><strong>Breed:</strong> {cat.breed}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}