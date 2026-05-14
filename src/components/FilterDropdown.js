// FilterDropdown.js

import "../css/filterdropdown.css";

export default function FilterDropdown() {
  const categoryGroups = {
    Entertainment: [
      "Movies",
      "Concerts",
      "Comedy Shows",
      "Theatre Plays",
      "Live Music",
      "Karaoke",
      "Museums",
      "Art Galleries",
      "Exhibitions",
      "Cultural Centers"
    ],

    FoodAndDining: [
      "Restaurants",
      "Cafes",
      "Street Food",
      "Dessert Places",
      "Food Courts",
      "Fine Dining",
      "Rooftop Dining",
      "Breweries",
      "Drive-In Restaurants",
      "Pet Cafes"
    ],

    GamingAndFun: [
      "Gaming Zones",
      "VR Gaming",
      "Arcades",
      "Escape Rooms",
      "Bowling",
      "Go Karting",
      "Laser Tag",
      "Paintball",
      "Trampoline Parks"
    ],

    Outdoors: [
      "Parks",
      "Lakes",
      "Picnic Spots",
      "Viewpoints",
      "Cycling",
      "Walking Trails",
      "Camping",
      "Hiking",
      "Sunset Spots",
      "Photography Spots"
    ],

    SportsAndFitness: [
      "Adventure Sports",
      "Badminton Courts",
      "Cricket Turfs",
      "Football Turfs",
      "Pools",
      "Yoga Studios",
      "Wellness Centers",
      "Spas"
    ],

    ShoppingAndMarkets: [
      "Shopping",
      "Night Markets",
      "Flea Markets",
      "Bookstores"
    ],

    TravelAndStay: [
      "Water Parks",
      "Resorts",
      "Staycations",
      "Weekend Getaways"
    ],

    FamilyAndKids: [
      "Family Activities",
      "Kid-Friendly Places",
      "Pet Parks"
    ],

    WorkAndLearning: [
      "Libraries",
      "Coworking Cafes",
      "Workshops"
    ],

    CultureAndHistory: [
      "Temples",
      "Historical Places"
    ],

    SocialAndNightlife: [
      "Clubs",
      "Date Spots",
      "Drive-In Theatres",
      "Sports Events"
    ]
  };

  return (
    <div className="filter-dropdown-wrapper">
      <select className="filter-dropdown">
        <option value="">Select Category</option>

        {Object.entries(categoryGroups).map(([group, items]) => (
          <optgroup key={group} label={group}>
            {items.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}