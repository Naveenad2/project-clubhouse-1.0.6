import type { StaticImageData } from "next/image";

// Food & atmosphere photography (Unsplash licence)
import heroBurger from "@/assets/images/food/hero-burger.jpg";
import croissant from "@/assets/images/food/croissant.jpg";
import latteArt from "@/assets/images/food/latte-art.jpg";
import burgerClassic from "@/assets/images/food/burger-classic.jpg";
import burgerFries from "@/assets/images/food/burger-fries.jpg";
import burgerStack from "@/assets/images/food/burger-stack.jpg";
import burgerBacon from "@/assets/images/food/burger-bacon.jpg";
import rotisserieChicken from "@/assets/images/food/rotisserie-chicken.jpg";
import roastChickenSkillet from "@/assets/images/food/roast-chicken-skillet.jpg";
import grilledChicken from "@/assets/images/food/grilled-chicken.jpg";
import friedChicken from "@/assets/images/food/fried-chicken.jpg";
import frenchOmelette from "@/assets/images/food/french-omelette.jpg";
import steakFries from "@/assets/images/food/steak-fries.jpg";
import steakSkillet from "@/assets/images/food/steak-skillet.jpg";
import prawnPasta from "@/assets/images/food/prawn-pasta.jpg";
import prawnCurry from "@/assets/images/food/prawn-curry.jpg";
import penne from "@/assets/images/food/penne.jpg";
import carbonara from "@/assets/images/food/carbonara.jpg";
import farfalle from "@/assets/images/food/farfalle.jpg";
import salmon from "@/assets/images/food/salmon.jpg";
import ribs from "@/assets/images/food/ribs.jpg";
import frenchToast from "@/assets/images/food/french-toast.jpg";
import eggToast from "@/assets/images/food/egg-toast.jpg";
import pancakes from "@/assets/images/food/pancakes.jpg";
import eggsBenedict from "@/assets/images/food/eggs-benedict.jpg";
import avocadoEggs from "@/assets/images/food/avocado-eggs.jpg";
import sandwich from "@/assets/images/food/sandwich.jpg";
import fries from "@/assets/images/food/fries.jpg";
import saladBowl from "@/assets/images/food/salad-bowl.jpg";
import gardenBowl from "@/assets/images/food/garden-bowl.jpg";
import pizza from "@/assets/images/food/pizza.jpg";
import chocolateCake from "@/assets/images/food/chocolate-cake.jpg";
import cheesecake from "@/assets/images/food/cheesecake.jpg";
import tiramisu from "@/assets/images/food/tiramisu.jpg";
import brownie from "@/assets/images/food/brownie.jpg";
import sundae from "@/assets/images/food/sundae.jpg";
import oreoShake from "@/assets/images/food/oreo-shake.jpg";
import icedLatte from "@/assets/images/food/iced-latte.jpg";
import cappuccinoPour from "@/assets/images/food/cappuccino-pour.jpg";
import pourOver from "@/assets/images/food/pour-over.jpg";
import coffeeCheers from "@/assets/images/food/coffee-cheers.jpg";
import strawberryCooler from "@/assets/images/food/strawberry-cooler.jpg";
import icedTea from "@/assets/images/food/iced-tea.jpg";
import tableGathering from "@/assets/images/food/table-gathering.jpg";
import brunchSpread from "@/assets/images/food/brunch-spread.jpg";
import bakeryDisplay from "@/assets/images/food/bakery-display.jpg";
import openKitchen from "@/assets/images/food/open-kitchen.jpg";
import grillSkewers from "@/assets/images/food/grill-skewers.jpg";

// Club House's own photography (from the Instagram feed)
import feedGuest from "@/assets/images/feed/feed-guest-mullet.jpg";
import feedSharingFries from "@/assets/images/feed/feed-sharing-fries.jpg";
import feedArches from "@/assets/images/feed/feed-arches-pink.jpg";
import feedFacade from "@/assets/images/feed/feed-facade-sign.jpg";
import feedSignboard from "@/assets/images/feed/feed-signboard.jpg";
import feedChickenPlate from "@/assets/images/feed/feed-chicken-plate.jpg";
import feedDiningRoom from "@/assets/images/feed/feed-dining-room.jpg";
import feedCroissant from "@/assets/images/feed/feed-croissant.jpg";
import feedGoodFeel from "@/assets/images/feed/feed-good-feel.jpg";
import feedBurger from "@/assets/images/feed/feed-burger.jpg";
import feedChristmas from "@/assets/images/feed/feed-christmas.jpg";
import feedPartyNight from "@/assets/images/feed/feed-party-night.jpg";
import feedWhiskey from "@/assets/images/feed/feed-whiskey.jpg";
import feedOldHarbour from "@/assets/images/feed/feed-old-harbour.jpg";

export type Photo = { src: StaticImageData; alt: string };

export const photos = {
  heroBurger: { src: heroBurger, alt: "Double smash burger with melted cheese and pickles on a toasted brioche bun" },
  croissant: { src: croissant, alt: "Golden butter croissant dusted with flour on a dark board" },
  latteArt: { src: latteArt, alt: "Flat white with rosetta latte art on a café table" },
  burgerClassic: { src: burgerClassic, alt: "Classic cheeseburger with lettuce, tomato and sauce" },
  burgerFries: { src: burgerFries, alt: "Crispy chicken burger served with a basket of fries" },
  burgerStack: { src: burgerStack, alt: "Tall stacked burger with bacon and double patties" },
  burgerBacon: { src: burgerBacon, alt: "Bacon cheeseburger on a dark background" },
  rotisserieChicken: { src: rotisserieChicken, alt: "Whole golden rotisserie chicken, roasted with herbs" },
  roastChickenSkillet: { src: roastChickenSkillet, alt: "Roast chicken in a cast-iron skillet" },
  grilledChicken: { src: grilledChicken, alt: "Chargrilled chicken breast with vegetables" },
  friedChicken: { src: friedChicken, alt: "Crispy buttermilk fried chicken on a cooling rack" },
  frenchOmelette: { src: frenchOmelette, alt: "Soft folded French omelette on a white plate" },
  steakFries: { src: steakFries, alt: "Sliced pepper steak with a pile of fries" },
  steakSkillet: { src: steakSkillet, alt: "Seared steak with rosemary in a skillet" },
  prawnPasta: { src: prawnPasta, alt: "Spaghetti with tiger prawns, garlic and chilli in a pan" },
  prawnCurry: { src: prawnCurry, alt: "Prawn curry in a coconut gravy served with rice" },
  penne: { src: penne, alt: "Penne arrabbiata with parmesan" },
  carbonara: { src: carbonara, alt: "Spaghetti carbonara with grated parmesan" },
  farfalle: { src: farfalle, alt: "Farfalle pesto pasta with cherry tomatoes" },
  salmon: { src: salmon, alt: "Pan-seared fish fillet with greens and lemon" },
  ribs: { src: ribs, alt: "Sticky barbecue ribs with dips and fries" },
  frenchToast: { src: frenchToast, alt: "French toast stacked with banana and blueberries" },
  eggToast: { src: eggToast, alt: "Fried egg on toasted sourdough" },
  pancakes: { src: pancakes, alt: "Stack of buttermilk pancakes with syrup" },
  eggsBenedict: { src: eggsBenedict, alt: "Eggs benedict with runny yolk and hollandaise" },
  avocadoEggs: { src: avocadoEggs, alt: "Avocado toast topped with jammy eggs" },
  sandwich: { src: sandwich, alt: "Grilled club sandwich halves with dips" },
  fries: { src: fries, alt: "Basket of crisp fries with parmesan and herbs" },
  saladBowl: { src: saladBowl, alt: "Chicken salad bowl with fresh vegetables" },
  gardenBowl: { src: gardenBowl, alt: "Colourful garden bowl with avocado and chickpeas" },
  pizza: { src: pizza, alt: "Wood-fired pizza with fresh tomatoes and basil" },
  chocolateCake: { src: chocolateCake, alt: "Chocolate fudge cake with glossy ganache" },
  cheesecake: { src: cheesecake, alt: "Slice of blueberry cheesecake" },
  tiramisu: { src: tiramisu, alt: "Tiramisu dusted with cocoa" },
  brownie: { src: brownie, alt: "Stack of fudgy chocolate brownies" },
  sundae: { src: sundae, alt: "Hot fudge sundae in a tall glass" },
  oreoShake: { src: oreoShake, alt: "Oreo milkshake topped with cream and cookies" },
  icedLatte: { src: icedLatte, alt: "Iced latte with milk swirling into espresso" },
  cappuccinoPour: { src: cappuccinoPour, alt: "Milk being poured into a cappuccino" },
  pourOver: { src: pourOver, alt: "Pour-over coffee being brewed at the bar" },
  coffeeCheers: { src: coffeeCheers, alt: "Friends clinking cups of coffee" },
  strawberryCooler: { src: strawberryCooler, alt: "Strawberry lime coolers with mint" },
  icedTea: { src: icedTea, alt: "Iced tea with lime" },
  tableGathering: { src: tableGathering, alt: "Friends sharing burgers and fries around a table" },
  brunchSpread: { src: brunchSpread, alt: "Brunch spread of waffles, eggs and fruit from above" },
  bakeryDisplay: { src: bakeryDisplay, alt: "Fresh breads and pastries on display" },
  openKitchen: { src: openKitchen, alt: "Chef chopping herbs in the open kitchen" },
  grillSkewers: { src: grillSkewers, alt: "Skewers cooking over a charcoal grill" },

  feedGuest: { src: feedGuest, alt: "A guest sitting by the window inside Club House Fort Kochi" },
  feedSharingFries: { src: feedSharingFries, alt: "Friends sharing fries at a green table at Club House" },
  feedArches: { src: feedArches, alt: "Guest seated in front of Club House's white arched windows" },
  feedFacade: { src: feedFacade, alt: "Club House Café & Restaurant signage on the heritage facade" },
  feedSignboard: { src: feedSignboard, alt: "Club House Fort Kochi signboard beside the arched veranda" },
  feedChickenPlate: { src: feedChickenPlate, alt: "Grilled chicken with fries and dips at Club House" },
  feedDiningRoom: { src: feedDiningRoom, alt: "Busy dining room at Club House decorated for the holidays" },
  feedCroissant: { src: feedCroissant, alt: "Club House butter croissant held with tongs" },
  feedGoodFeel: { src: feedGoodFeel, alt: "Guest at the Club House counter — little place has such a good feel to it" },
  feedBurger: { src: feedBurger, alt: "Club House burger with coleslaw and melted cheese" },
  feedChristmas: { src: feedChristmas, alt: "Club House glowing neon sign at night during Christmas" },
  feedPartyNight: { src: feedPartyNight, alt: "DJ playing a party night at Club House" },
  feedWhiskey: { src: feedWhiskey, alt: "Whiskey, the Club House dog, next to a sketch of himself" },
  feedOldHarbour: { src: feedOldHarbour, alt: "Old Harbour Hotel in Fort Kochi at dusk" },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
