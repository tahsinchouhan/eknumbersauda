
import { MdOutlineSecurity, MdLocalParking, MdPool, MdOutlineFireExtinguisher, MdKingBed } from "react-icons/md";
import { IoIosConstruct, IoBedSharp } from "react-icons/io";
import { GiLift } from "react-icons/gi";
import { GiTireTracks, GiFlowerPot } from "react-icons/gi";
import { ImPower } from "react-icons/im";
import { CgGym } from "react-icons/cg";
import { FaHandHoldingWater, FaBath, FaRunning } from "react-icons/fa";
import { AiOutlineWifi } from "react-icons/ai";

export const MOCK_PROPERTY_TYPE_DATA = [
  { type: "Flat" },
  { type: "House/Villa" },
  { type: "Plot" },
];

export const MOCK_PROPERTY_TABLE_DATA = [
  {
    id: 1,
    title: "Beetlejuice",
    price: "5088",
    runtime: "92",
    address: ["Comedy", "Fantasy"],
    director: "Tim Burton",
    actors: "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
    plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
    image:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg",
  },
  {
    id: 2,
    title: "The Cotton Club",
    price: "7528",
    runtime: "127",
    address: ["Crime", "Drama", "Music"],
    director: "Francis Ford Coppola",
    actors: "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee",
    plot: "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.",
    image:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg",
  },
  {
    id: 3,
    title: "The Shawshank Redemption",
    price: "1994",
    runtime: "142",
    address: ["Crime", "Drama"],
    director: "Frank Darabont",
    actors: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
    plot: "Two imprisoned men bond over a number of prices, finding solace and eventual redemption through acts of common decency.",
    image:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg",
  },
  {
    id: 4,
    title: "Crocodile Dundee",
    price: "1986",
    runtime: "97",
    address: ["Adventure", "Comedy"],
    director: "Peter Faiman",
    actors: "Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil",
    plot: "An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City.",
    image:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg0MTU1MTg4NF5BMl5BanBnXkFtZTgwMDgzNzYxMTE@._V1_SX300.jpg",
  },
  {
    id: 5,
    title: "Valkyrie",
    price: "2008",
    runtime: "121",
    address: ["Drama", "History", "Thriller"],
    director: "Bryan Singer",
    actors: "Tom Cruise, Kenneth Branagh, Bill Nighy, Tom Wilkinson",
    plot: "A dramatization of the 20 July assassination and political coup plot by desperate renegade German Army officers against Hitler during World War II.",
    image:
      "http://ia.media-imdb.com/images/M/MV5BMTg3Njc2ODEyN15BMl5BanBnXkFtZTcwNTAwMzc3NA@@._V1_SX300.jpg",
  },
  {
    id: 6,
    title: "Ratatouille",
    price: "2007",
    runtime: "111",
    address: ["Animation", "Comedy", "Family"],
    director: "Brad Bird, Jan Pinkava",
    actors: "Patton Oswalt, Ian Holm, Lou Romano, Brian Dennehy",
    plot: "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous restaurant.",
    image:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg",
  },
  {
    id: 7,
    title: "City of God",
    price: "2002",
    runtime: "130",
    address: ["Crime", "Drama"],
    director: "Fernando Meirelles, Kátia Lund",
    actors:
      "Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen, Douglas Silva",
    plot: "Two boys growing up in a violent neighborhood of Rio de Janeiro take different paths: one becomes a photographer, the other a drug dealer.",
    image:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg",
  },
];

export const location = [
  {
    pincode: "495677",
    location: "korba",
  },
  {
    pincode: "495677",
    location: "kolkata",
  },
  {
    pincode: "495677",
    location: "kota",
  },
  {
    pincode: "495677",
    location: "kerala",
  },
];

export const PaymnetIcons = ({ paymentOption }) => {
  switch (paymentOption) {
    case 'Gym':
      return <CgGym />;
    case '2 Bed':
      return <MdKingBed />;
    case '3 Bed':
      return <MdKingBed />;
    case '4 Bed':
      return <MdKingBed />;
    case '2 Bath':
      return <FaBath />;
    case 'Fire safty':
      return <MdPool />;
    case 'Power Backup':
      return <FaRunning />;
    case 'Swimming Pool':
      return <MdPool />;
    case 'Lift(s)':
      return <GiLift />;
    case 'Jogging Track':
      return <GiTireTracks />;
    case 'Security':
      return <MdOutlineSecurity />;
    case 'Car Parking':
      return <MdLocalParking />;
    case 'Garden':
      return <GiFlowerPot />;
    case 'Water Supply':
      return <FaHandHoldingWater />;
    case 'Swimming Pool':
      return <MdPool />;
    case 'Maintenace':
      return <IoIosConstruct />;
    case 'Playground':
      return <AiOutlineWifi />;
    case 'Wi-fi':
      return <AiOutlineWifi />;
    case 'Fire Equipment':
      return <MdOutlineFireExtinguisher />;
    default:
      return null;
  }
};

export const IdIcons = ({ paymentOption }) => {
  switch (paymentOption) {
    case 'Gym':
      return <CgGym className="view-property-icons me-3" />;
    case '2 Bed':
      return <MdKingBed className="view-property-icons me-3" />;
    case '3 Bed':
      return <MdKingBed className="view-property-icons me-3" />;
    case '4 Bed':
      return <MdKingBed className="view-property-icons me-3" />;
    case '2 Bath':
      return <FaBath className="view-property-icons me-3" />;
    case 'Fire safty':
      return <MdPool className="view-property-icons me-3" />;
    case 'Power Backup':
      return <FaRunning className="view-property-icons me-3" />;
    case 'Swimming Pool':
      return <MdPool className="view-property-icons me-3" />;
    case 'Lift(s)':
      return <GiLift className="view-property-icons me-3" />;
    case 'Jogging Track':
      return <GiTireTracks className="view-property-icons me-3" />;
    case 'Security':
      return <MdOutlineSecurity className="view-property-icons me-3" />;
    case 'Car Parking':
      return <MdLocalParking className="view-property-icons me-3" />;
    case 'Garden':
      return <GiFlowerPot className="view-property-icons me-3" />;
    case 'Water Supply':
      return <FaHandHoldingWater className="view-property-icons me-3" />;
    case 'Swimming Pool':
      return <MdPool className="view-property-icons me-3" />;
    case 'Maintenace':
      return <IoIosConstruct className="view-property-icons me-3" />;
    case 'Playground':
      return <AiOutlineWifi className="view-property-icons me-3" />;
    case 'Wi-fi':
      return <AiOutlineWifi className="view-property-icons me-3" />;
    case 'Fire Equipment':
      return <MdOutlineFireExtinguisher className="view-property-icons me-3" />;
    default:
      return null;
  }
};
