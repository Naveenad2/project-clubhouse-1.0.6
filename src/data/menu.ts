import type { PhotoKey } from "./images";

/**
 * MENU CONTENT — sample dishes & indicative prices modelled on Club House's known strengths
 * (rotisserie chicken, burgers, French omelette, croissants, coffee). Replace with the real menu.
 */

export type Diet = "veg" | "egg" | "nonveg";
export type Tag = "Signature" | "Guest favourite" | "Most ordered" | "Baked daily" | "Spicy" | "Coastal";
export type Price = number | { label: string; price: number }[];

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: Price;
  diet: Diet;
  photo?: PhotoKey;
  tags?: Tag[];
};

export type MenuCategory = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  cover: PhotoKey;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "breakfast",
    title: "All-Day Breakfast",
    kicker: "From 7:30 AM",
    description: "Eggs every way, butter in everything and croissants that leave flakes on your shirt.",
    cover: "croissant",
    items: [
      { id: "butter-croissant", name: "Butter Croissant", description: "Laminated in-house and baked through the morning. Served warm with butter & jam.", price: 140, diet: "veg", photo: "croissant", tags: ["Baked daily"] },
      { id: "french-omelette", name: "French Omelette", description: "Soft-rolled with herbs and cultured butter, toasted sourdough on the side.", price: 220, diet: "egg", photo: "frenchOmelette", tags: ["Guest favourite"] },
      { id: "eggs-benedict", name: "Eggs Benedict", description: "Two poached eggs, lemony hollandaise, toasted English muffin.", price: 320, diet: "egg", photo: "eggsBenedict" },
      { id: "avocado-egg-toast", name: "Avocado & Egg Toast", description: "Smashed avocado, jammy eggs, chilli flakes and lime on sourdough.", price: 340, diet: "egg", photo: "avocadoEggs" },
      { id: "french-toast", name: "French Toast Stack", description: "Thick brioche, caramelised banana, berries and maple syrup.", price: 260, diet: "egg", photo: "frenchToast" },
      { id: "pancakes", name: "Buttermilk Pancakes", description: "A fluffy stack with honey butter and warm maple.", price: 240, diet: "egg", photo: "pancakes" },
      { id: "egg-on-toast", name: "Egg on Toast", description: "Sunny-side egg, grilled sourdough, cracked black pepper.", price: 180, diet: "egg", photo: "eggToast" },
      { id: "big-breakfast", name: "The Club House Breakfast", description: "Eggs your way, chicken sausage, hash brown, beans, grilled tomato, toast and a coffee.", price: 420, diet: "nonveg", tags: ["Signature"] },
    ],
  },
  {
    id: "rotisserie-grill",
    title: "Rotisserie & Grill",
    kicker: "Turned slow, carved to order",
    description: "Herb-brined birds turning on the spit all day, and plates finished over the flame.",
    cover: "rotisserieChicken",
    items: [
      { id: "rotisserie-chicken", name: "Rotisserie Chicken", description: "Herb-brined and slow-turned until the skin crackles. With garlic dip, fries and house salad.", price: [{ label: "Quarter", price: 260 }, { label: "Half", price: 420 }, { label: "Whole", price: 780 }], diet: "nonveg", photo: "rotisserieChicken", tags: ["Signature", "Guest favourite"] },
      { id: "herb-grilled-chicken", name: "Herb Grilled Chicken", description: "Chargrilled chicken, herb butter, garlic toum and fries.", price: 380, diet: "nonveg", photo: "grilledChicken" },
      { id: "pepper-steak", name: "Pepper Steak & Fries", description: "Beef tenderloin, cracked peppercorn sauce, skin-on fries.", price: 480, diet: "nonveg", photo: "steakFries" },
      { id: "lemon-butter-fish", name: "Lemon Butter Fish", description: "Catch of the day, pan-seared, lemon-caper butter and greens.", price: 420, diet: "nonveg", photo: "salmon", tags: ["Coastal"] },
      { id: "bbq-ribs", name: "Sticky BBQ Pork Ribs", description: "Slow-cooked, glazed on the grill, with slaw and fries.", price: 520, diet: "nonveg", photo: "ribs" },
      { id: "fried-chicken", name: "Crispy Fried Chicken", description: "Buttermilk-brined, double-crunch coating, honey-chilli dip.", price: 320, diet: "nonveg", photo: "friedChicken" },
    ],
  },
  {
    id: "burgers-sandwiches",
    title: "Burgers & Sandwiches",
    kicker: "Off the flat-top",
    description: "Smashed thin, stacked high, held together by a toasted brioche bun and a little faith.",
    cover: "heroBurger",
    items: [
      { id: "club-house-smash", name: "Club House Smash", description: "Double smashed beef, American cheese, pickles, onions and house sauce.", price: 320, diet: "nonveg", photo: "heroBurger", tags: ["Most ordered", "Signature"] },
      { id: "chicken-cheeseburger", name: "Chicken Cheeseburger", description: "Juicy chicken patty, cheddar, lettuce, tomato, burger sauce.", price: 280, diet: "nonveg", photo: "burgerClassic" },
      { id: "crispy-chicken-burger", name: "Crispy Chicken Burger", description: "Fried chicken thigh, crunchy slaw, sriracha mayo. Fries on the side.", price: 290, diet: "nonveg", photo: "burgerFries" },
      { id: "bacon-stack", name: "Bacon Stack", description: "Beef patty, smoked bacon, cheddar and caramelised onion.", price: 380, diet: "nonveg", photo: "burgerBacon" },
      { id: "paneer-burger", name: "Paneer Tikka Burger", description: "Char-grilled paneer, mint mayo, pickled onion.", price: 260, diet: "veg" },
      { id: "club-sandwich", name: "Club Sandwich", description: "Triple-decker with chicken, egg, cheese and tomato. Served with fries.", price: 260, diet: "nonveg", photo: "sandwich" },
      { id: "grilled-cheese", name: "Grilled Cheese & Tomato", description: "Three cheeses, roast tomato, buttered sourdough.", price: 200, diet: "veg" },
    ],
  },
  {
    id: "pasta-pizza-bowls",
    title: "Pasta, Pizza & Bowls",
    kicker: "Comfort, mostly",
    description: "Tossed to order and generous enough to share — though nobody ever does.",
    cover: "prawnPasta",
    items: [
      { id: "prawn-aglio-olio", name: "Prawn Aglio e Olio", description: "Spaghetti, garlic, chilli, olive oil, tiger prawns and parsley.", price: 420, diet: "nonveg", photo: "prawnPasta", tags: ["Coastal"] },
      { id: "carbonara", name: "Spaghetti Carbonara", description: "Egg yolk, parmesan, black pepper and chicken ham.", price: 360, diet: "nonveg", photo: "carbonara" },
      { id: "penne-arrabbiata", name: "Penne Arrabbiata", description: "Slow tomato sauce, garlic, chilli and basil.", price: 300, diet: "veg", photo: "penne", tags: ["Spicy"] },
      { id: "pesto-farfalle", name: "Pesto Farfalle", description: "Basil pesto, cherry tomatoes, toasted seeds.", price: 320, diet: "veg", photo: "farfalle" },
      { id: "margherita", name: "Margherita Pizza", description: "San Marzano-style tomato, mozzarella, basil, olive oil.", price: 340, diet: "veg", photo: "pizza" },
      { id: "chicken-caesar-bowl", name: "Chicken Caesar Bowl", description: "Grilled chicken, crisp lettuce, croutons, parmesan, Caesar dressing.", price: 320, diet: "nonveg", photo: "saladBowl" },
      { id: "garden-bowl", name: "Garden Bowl", description: "Avocado, roasted chickpeas, greens, pickled veg and tahini.", price: 300, diet: "veg", photo: "gardenBowl" },
    ],
  },
  {
    id: "from-the-coast",
    title: "From the Coast",
    kicker: "Fort Kochi on a plate",
    description: "A nod to the neighbourhood — Kerala spice, coconut and the morning's catch.",
    cover: "prawnCurry",
    items: [
      { id: "malabar-prawn-curry", name: "Malabar Prawn Curry & Appam", description: "Coconut milk, kokum and curry leaves, with two lacy appams.", price: 420, diet: "nonveg", photo: "prawnCurry", tags: ["Coastal", "Signature"] },
      { id: "kerala-fish-curry", name: "Kerala Fish Curry & Rice", description: "Red chilli and kudampuli gravy with matta rice.", price: 360, diet: "nonveg", tags: ["Spicy", "Coastal"] },
      { id: "beef-ularthiyathu", name: "Beef Ularthiyathu & Parotta", description: "Slow-roasted beef, coconut slivers, black pepper, flaky Kerala parotta.", price: 340, diet: "nonveg", tags: ["Spicy"] },
      { id: "vegetable-stew", name: "Vegetable Stew & Appam", description: "Mild coconut stew with garden vegetables and whole spices.", price: 260, diet: "veg" },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    kicker: "For the table",
    description: "Order more than you think. Trust us.",
    cover: "fries",
    items: [
      { id: "fries", name: "Skin-on Fries", description: "Crisp, salted, with house garlic dip.", price: 140, diet: "veg", photo: "fries" },
      { id: "peri-peri-fries", name: "Peri-Peri Fries", description: "Tossed in smoky peri-peri spice.", price: 170, diet: "veg", tags: ["Spicy"] },
      { id: "garlic-bread", name: "Cheesy Garlic Bread", description: "Garlic butter, mozzarella, herbs.", price: 150, diet: "veg" },
      { id: "coleslaw", name: "House Slaw", description: "Crunchy cabbage, carrot and a tangy dressing.", price: 100, diet: "veg" },
    ],
  },
  {
    id: "sweet-things",
    title: "Sweet Things",
    kicker: "Save room",
    description: "Made in our kitchen, finished with a little too much chocolate.",
    cover: "chocolateCake",
    items: [
      { id: "chocolate-fudge-cake", name: "Chocolate Fudge Cake", description: "Dark chocolate sponge, glossy fudge ganache.", price: 220, diet: "egg", photo: "chocolateCake" },
      { id: "blueberry-cheesecake", name: "Blueberry Cheesecake", description: "Baked vanilla cheesecake, blueberry compote, biscuit base.", price: 260, diet: "egg", photo: "cheesecake" },
      { id: "tiramisu", name: "Tiramisu", description: "Espresso-soaked sponge, mascarpone cream, cocoa.", price: 260, diet: "egg", photo: "tiramisu" },
      { id: "brownie", name: "Warm Brownie & Ice Cream", description: "Fudgy brownie, vanilla ice cream, chocolate sauce.", price: 220, diet: "egg", photo: "brownie" },
      { id: "sundae", name: "Hot Fudge Sundae", description: "Vanilla scoops, hot fudge, cookie crumble, whipped cream.", price: 240, diet: "veg", photo: "sundae" },
    ],
  },
  {
    id: "coffee-tea",
    title: "Coffee & Tea",
    kicker: "Pulled from 7:30 AM",
    description: "Single-origin Indian beans, pulled short and sweet — or slow-brewed at the bar.",
    cover: "latteArt",
    items: [
      { id: "espresso", name: "Espresso", description: "A double shot, short and syrupy.", price: 100, diet: "veg" },
      { id: "americano", name: "Americano", description: "Espresso lengthened with hot water.", price: 130, diet: "veg" },
      { id: "cappuccino", name: "Cappuccino", description: "Equal parts espresso, steamed milk and foam.", price: 160, diet: "veg", photo: "cappuccinoPour" },
      { id: "flat-white", name: "Flat White", description: "Velvety microfoam over a double ristretto.", price: 180, diet: "veg", photo: "latteArt", tags: ["Guest favourite"] },
      { id: "iced-latte", name: "Iced Latte", description: "Espresso over ice and cold milk.", price: 190, diet: "veg", photo: "icedLatte" },
      { id: "pour-over", name: "Pour-Over", description: "Hand-brewed single origin. Ask for today's beans.", price: 220, diet: "veg", photo: "pourOver" },
      { id: "masala-chai", name: "Masala Chai", description: "Strong tea, milk, ginger and cardamom.", price: 80, diet: "veg" },
      { id: "lemon-tea", name: "Lemon Honey Tea", description: "Black tea, lemon and wild honey.", price: 90, diet: "veg" },
    ],
  },
  {
    id: "shakes-coolers",
    title: "Shakes & Coolers",
    kicker: "Against the Kochi heat",
    description: "Thick shakes and bright, fizzy coolers built for long afternoons.",
    cover: "strawberryCooler",
    items: [
      { id: "oreo-shake", name: "Oreo Thick Shake", description: "Vanilla ice cream, cookies, whipped cream.", price: 220, diet: "veg", photo: "oreoShake" },
      { id: "strawberry-cooler", name: "Strawberry Lime Cooler", description: "Strawberry, lime, mint and soda.", price: 190, diet: "veg", photo: "strawberryCooler" },
      { id: "peach-iced-tea", name: "Peach Iced Tea", description: "Cold-brewed black tea, peach and lime.", price: 170, diet: "veg", photo: "icedTea" },
      { id: "fresh-lime-soda", name: "Fresh Lime Soda", description: "Sweet, salted or both — the Kerala classic.", price: 110, diet: "veg" },
      { id: "virgin-mojito", name: "Virgin Mojito", description: "Muddled mint, lime and soda over crushed ice.", price: 180, diet: "veg" },
    ],
  },
];

export const DIET_LABEL: Record<Diet, string> = { veg: "Vegetarian", egg: "Contains egg", nonveg: "Non-vegetarian" };

export function formatPrice(price: Price): string {
  if (typeof price === "number") return `₹${price}`;
  return price.map((p) => `${p.label} ₹${p.price}`).join(" · ");
}

export function lowestPrice(price: Price): number {
  return typeof price === "number" ? price : Math.min(...price.map((p) => p.price));
}
