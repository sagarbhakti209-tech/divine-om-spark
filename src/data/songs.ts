import hanuman from "@/assets/hanuman.jpg";
import shiva from "@/assets/shiva.jpg";
import krishna from "@/assets/krishna.jpg";
import ram from "@/assets/ram.jpg";
import lakshmi from "@/assets/lakshmi.jpg";
import ganesha from "@/assets/ganesha.jpg";
import durga from "@/assets/durga.jpg";
import vishnu from "@/assets/vishnu.jpg";

export interface Song {
  title: string;
  artist: string;
  deity: string;
  img: string;
  duration: string;
  category: string;
  audioUrl: string;
}

export const songs: Song[] = [
  {
    title: "हनुमान चालीसा",
    artist: "हरि ओम शरण",
    deity: "हनुमान जी",
    img: hanuman,
    duration: "12:45",
    category: "चालीसा",
    audioUrl: "https://archive.org/download/a_20220426_202204/Hari%20Om%20Sharan%20%E2%80%8E%E2%80%93%20Shri%20Hanuman%20Chalisa.mp3",
  },
  {
    title: "आरती कीजै हनुमान लला की",
    artist: "हरि ओम शरण",
    deity: "हनुमान जी",
    img: hanuman,
    duration: "5:30",
    category: "आरती",
    audioUrl: "https://archive.org/download/a_20220426_202204/Hari%20Om%20Sharan%20%E2%80%8E%E2%80%93%20Hanumanji%20Ki%20Aarti.mp3",
  },
  {
    title: "संकट मोचन हनुमानाष्टक",
    artist: "हरि ओम शरण",
    deity: "हनुमान जी",
    img: hanuman,
    duration: "9:10",
    category: "स्तोत्र",
    audioUrl: "https://archive.org/download/a_20220426_202204/Hari%20Om%20Sharan%20%E2%80%8E%E2%80%93%20Sankat%20Mochan%20Hanumanashtak.mp3",
  },
  {
    title: "ॐ नमः शिवाय मंत्र",
    artist: "स्वामी पूर्णानंद",
    deity: "शिव जी",
    img: shiva,
    duration: "11:15",
    category: "मंत्र",
    audioUrl: "https://archive.org/download/nvce_om-namah-shivaya-mantra-trance-with-shamanic-drums-powerful-shiv-mantra-meditation-music/OM%20NAMAH%20SHIVAYA%20%20%20Mantra%20Trance%20with%20Shamanic%20Drums%20%20%20Powerful%20Shiv%20Mantra%20Meditation%20Music.mp3",
  },
  {
    title: "शिवनामावल्यष्टकम्",
    artist: "वैदिक मंत्र पाठ",
    deity: "शिव जी",
    img: shiva,
    duration: "8:30",
    category: "स्तोत्र",
    audioUrl: "https://archive.org/download/Shivanamavalyastakam/Shivanamavalyastakam.mp3",
  },
  {
    title: "हरे कृष्ण मंत्र",
    artist: "संस्कृत भजन कीर्तन",
    deity: "कृष्ण जी",
    img: krishna,
    duration: "6:45",
    category: "मंत्र",
    audioUrl: "https://archive.org/download/Sankrit-Bhajan-Kirtan/03-hareKrishnaMantra.mp3",
  },
  {
    title: "कृष्ण भजन संग्रह - भाग 1",
    artist: "अनुराधा पौडवाल",
    deity: "कृष्ण जी",
    img: krishna,
    duration: "7:20",
    category: "भजन",
    audioUrl: "https://archive.org/download/KrishnaBhajan/ASideTrack1.mp3",
  },
  {
    title: "कृष्ण भजन - जय जय राम",
    artist: "अनुराधा पौडवाल",
    deity: "कृष्ण जी",
    img: krishna,
    duration: "5:55",
    category: "भजन",
    audioUrl: "https://archive.org/download/KrishnaBhajan/ASideTrack2JaiJaiRamRamaia.mp3",
  },
  {
    title: "भक्ति संगीत",
    artist: "रेडियो सीलोन",
    deity: "राम जी",
    img: ram,
    duration: "10:05",
    category: "भजन",
    audioUrl: "https://archive.org/download/RadioCeylon-bajan/2023-05-08%20Bhakti%20Sangeet.mp3",
  },
  {
    title: "भक्ति गीत",
    artist: "रेडियो सीलोन",
    deity: "विष्णु जी",
    img: vishnu,
    duration: "4:55",
    category: "भजन",
    audioUrl: "https://archive.org/download/RadioCeylon-bajan/2012-08-27%20Bhakti%20Geeth.mp3",
  },
  {
    title: "माँ लक्ष्मी भजन",
    artist: "राजलक्ष्मी गोपाल",
    deity: "माँ लक्ष्मी",
    img: lakshmi,
    duration: "6:30",
    category: "भजन",
    audioUrl: "https://archive.org/download/lakshmi-songs/03.LAKSHMI/0411.devilakshmi.mp3",
  },
  {
    title: "भक्तराज भजन संग्रह",
    artist: "भक्तराज महाराज",
    deity: "माँ दुर्गा",
    img: durga,
    duration: "14:30",
    category: "भजन",
    audioUrl: "https://archive.org/download/compiled-5-bhajans/All%20bhajans%20compilation.mp3",
  },
];

export const deityCategories = [
  { name: "पसंदीदा", img: "❤️", isEmoji: true },
  { name: "हनुमान जी", img: hanuman },
  { name: "शिव जी", img: shiva },
  { name: "कृष्ण जी", img: krishna },
  { name: "राम जी", img: ram },
  { name: "माँ लक्ष्मी", img: lakshmi },
  { name: "गणेश जी", img: ganesha },
  { name: "माँ दुर्गा", img: durga },
  { name: "विष्णु जी", img: vishnu },
];

export const filters = ["सभी", "आरती", "चालीसा", "भजन", "मंत्र", "स्तोत्र"];
