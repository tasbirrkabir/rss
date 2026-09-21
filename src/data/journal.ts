/**
 * THE SREEMANGAL FIELD NOTES - journal content (brief section 12).
 *
 * Honesty rules:
 * - Content is general, publicly-known knowledge about Sreemangal and the
 *   region. Nothing claims owner-verified policy, prices or availability.
 * - Dates are demo placeholders shown with a DEMO tag in the UI.
 * - Every article page displays the demo-content note before production.
 */

export type JournalBlock = {
  heading?: string;
  paragraphs: string[];
};

export type JournalArticle = {
  slug: string;
  title: string;
  category: string;
  dateDisplay: string;
  readTime: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  content: JournalBlock[];
  relatedDestinations: string[];
  relatedRoute?: string;
};

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "how-to-explore-sreemangal-in-one-day",
    title: "How to Explore Sreemangal in One Day",
    category: "ITINERARIES",
    dateDisplay: "Nov 2025 · DEMO",
    readTime: "5 MIN READ",
    excerpt:
      "One day, one scooty, and a route that hits the gardens, the forest edge and the wetland without ever feeling rushed.",
    image: "/images/real-tea-break.jpg",
    imageAlt:
      "Scooty rider taking a roadside tea break beside a Finlay tea garden in Sreemangal",
    relatedDestinations: ["tea-gardens", "lawachara", "baikka-beel"],
    relatedRoute: "tea-garden-loop",
    content: [
      {
        heading: "START BEFORE THE TOWN WAKES UP",
        paragraphs: [
          "Sreemangal rewards early risers. The tea gardens are at their best in the first two hours of light - mist still sitting in the rows, pluckers already working, and roads empty enough that the ride itself becomes the highlight. Pick the scooty up the evening before if you can, and be rolling by sunrise.",
          "You do not need a strict plan for the morning. Point the scooty at any green horizon; the garden roads around town loop naturally, and getting slightly lost is part of the product.",
        ],
      },
      {
        heading: "MIDDAY: TEA, FOOD AND SHADE",
        paragraphs: [
          "By late morning the light turns harsh and the heat arrives. That is your cue for the town half of the day: the famous seven-layer tea, a proper rice-and-fish lunch, and an hour of doing absolutely nothing in a tea stall. This is not wasted time - it is half the reason people fall for Sreemangal.",
        ],
      },
      {
        heading: "AFTERNOON: PICK ONE DIRECTION",
        paragraphs: [
          "With the heat easing, choose your afternoon by mood. Forest people ride out toward Lawachara and walk the shaded trails. Water people take the longer road toward Madhabpur Lake. Photographers drift through the village roads between the gardens, where every second turn looks like a postcard.",
          "Trying to do all three in one afternoon is how you end up seeing none of them properly. One direction, done well, beats three done in a hurry.",
        ],
      },
      {
        heading: "SUNSET: THE WETLAND FINISH",
        paragraphs: [
          "If the sky looks promising, end the day at Baikka Beel. Still water, water lilies and birds settling in for the evening - and a quiet road back to town with the smell of tea fields all the way home.",
        ],
      },
      {
        heading: "THE PRACTICAL BIT",
        paragraphs: [
          "Fuel up before the afternoon leg, carry water, and agree your return time when you collect the scooty. If you want this exact day arranged, request the Tea Garden Loop or tell us your date through the booking page and we will help you shape it.",
        ],
      },
    ],
  },
  {
    slug: "best-tea-garden-routes-in-sreemangal",
    title: "Best Tea Garden Routes in Sreemangal",
    category: "ROUTES",
    dateDisplay: "Nov 2025 · DEMO",
    readTime: "6 MIN READ",
    excerpt:
      "The garden roads are the signature ride of this region. Here is how to string them together - short loop, long loop and the photo strategy.",
    image: "/images/dest-tea-gardens.png",
    imageAlt: "Rolling green tea garden rows near Sreemangal",
    relatedDestinations: ["tea-gardens", "hidden-roads", "sreemangal-town"],
    relatedRoute: "tea-garden-loop",
    content: [
      {
        heading: "WHY THE GARDENS ARE THE MAIN EVENT",
        paragraphs: [
          "Sreemangal sits inside one of the largest tea-growing regions of Bangladesh, and the gardens are not a single attraction you visit - they are the landscape the town lives in. That makes them perfect scooty country: continuous, gentle and full of small decisions about which way to turn.",
        ],
      },
      {
        heading: "THE SHORT LOOP (EASY)",
        paragraphs: [
          "Straight out of town, the first garden roads begin within minutes. A short loop of the nearest rows takes an unhurried hour and needs no navigation skills - ride until the light is good, stop, repeat. This is the ride we hand to first-timers and families.",
        ],
      },
      {
        heading: "THE LONGER LOOP (SCENIC)",
        paragraphs: [
          "With more time, link the garden roads into a bigger circuit that pushes further between the estates and drops back into town from a different direction. The distances are modest; the point is not how far you go but how many different greens you pass through.",
        ],
      },
      {
        heading: "THE PHOTO STRATEGY",
        paragraphs: [
          "Two windows matter: early morning for mist and soft side-light, and late afternoon for long shadows across the rows. Midday is for tea stops, not photography. If you only have one photo session in you, make it the morning.",
        ],
      },
      {
        heading: "RIDE LIKE A LOCAL",
        paragraphs: [
          "Garden lanes are shared with walkers, cycles and the occasional worker's motorcycle. Keep speeds low, use your horn politely on blind corners, and give pluckers space. The rows are someone's workplace - ride accordingly and everyone smiles.",
        ],
      },
    ],
  },
  {
    slug: "things-to-know-before-renting-a-scooty",
    title: "Things to Know Before Renting a Scooty",
    category: "GUIDES",
    dateDisplay: "Nov 2025 · DEMO",
    readTime: "4 MIN READ",
    excerpt:
      "Licenses, deposits, helmets and return times - the honest checklist before your first ride in Sreemangal.",
    image: "/images/scooter-standard.png",
    imageAlt: "Red automatic scooty photographed from the front three-quarter angle",
    relatedDestinations: ["sreemangal-town"],
    content: [
      {
        heading: "WHAT YOU WILL NEED",
        paragraphs: [
          "Bring a valid driving license - if it is not Bangladeshi, check that it covers scooters or motorcycles before you travel. You will also be asked for a security deposit; the exact amount and form are confirmed personally when you book, so ask then and write it down.",
          "Details like deposit amounts and document requirements are finalized directly with Red Scooty - we do not publish numbers until the owner confirms them.",
        ],
      },
      {
        heading: "HOW BOOKING WORKS HERE",
        paragraphs: [
          "There is no online payment and no self-service unlock. You send a request with your date and duration, a real person confirms availability, and you collect the scooty from Jalalia Road. It is low-tech on purpose: it keeps the process honest and the pricing personal.",
        ],
      },
      {
        heading: "BEFORE YOU RIDE",
        paragraphs: [
          "Check the helmet fits and actually wear it - the roads are calm but not empty. Confirm fuel level, take a photo of the scooty's condition, put your phone in your pocket rather than on the handlebar, and save the Red Scooty number where you can reach it offline.",
        ],
      },
      {
        heading: "TIME, DAMAGE AND RETURN",
        paragraphs: [
          "Agree the return time when you collect the scooty and message if you are running late - it is a small thing that keeps everything easy. Ride the way you would want your own bike treated, and report anything that happens, however minor. Clear rules and clear communication are why deposit dramas almost never happen here.",
        ],
      },
    ],
  },
  {
    slug: "sreemangal-travel-guide",
    title: "Sreemangal Travel Guide",
    category: "FIELD NOTES",
    dateDisplay: "Nov 2025 · DEMO",
    readTime: "7 MIN READ",
    excerpt:
      "The big picture: what Sreemangal is, how to get there, when to go, and why it rewards slow travel more than any checklist.",
    image: "/images/real-town-ride.jpg",
    imageAlt:
      "Riding a scooty through Sreemangal town traffic on the way to the tea gardens",
    relatedDestinations: ["tea-gardens", "lawachara", "madhabpur-lake", "baikka-beel", "sreemangal-town"],
    content: [
      {
        heading: "WHAT SREEMANGAL IS",
        paragraphs: [
          "Sreemangal is a small upazila town in the Sylhet region of Bangladesh, widely known as the country's tea capital. Around it: an ocean of tea gardens, rainforest at Lawachara, hill-wrapped lakes and wetlands full of birds. It is compact, green and dramatically slower than the cities most visitors arrive from.",
        ],
      },
      {
        heading: "GETTING THERE",
        paragraphs: [
          "Most travelers arrive by train - the Sreemangal railway station sits on the line between Dhaka and Sylhet, and the overnight or early intercity trains are a classic way in. Buses run from Dhaka and Sylhet too. From the station, the town center is minutes away.",
        ],
      },
      {
        heading: "WHEN TO GO",
        paragraphs: [
          "The region is green year-round, but the experience shifts with the seasons: cooler months are the comfortable classic, monsoon turns everything impossibly green and dramatic (with rain-soaked roads to respect), and the tea harvest cycles give the gardens their rhythm. There is no dead season - only different light.",
        ],
      },
      {
        heading: "WHAT TO SEE",
        paragraphs: [
          "The essentials: the tea gardens around town, Lawachara National Park, Madhabpur Lake, Baikka Beel at sunrise and the seven-layer tea in town. For the ambitious, Ham Ham waterfall adds a jungle trek to the mix. Everything on that list is a short scooty ride from the same base.",
        ],
      },
      {
        heading: "WHY A SCOOTY CHANGES THE MATH",
        paragraphs: [
          "Public transport connects the big points; a scooty connects everything in between. The roads between the famous places are half the experience here - village lanes, estate shortcuts, unexpected views. Independent riders stop when the light is good instead of when the next vehicle leaves. That is the whole argument.",
        ],
      },
    ],
  },
  {
    slug: "best-places-to-visit-around-sreemangal",
    title: "Best Places to Visit Around Sreemangal",
    category: "DESTINATIONS",
    dateDisplay: "Nov 2025 · DEMO",
    readTime: "5 MIN READ",
    excerpt:
      "Lawachara, Madhabpur, Baikka Beel, Ham Ham and the gardens themselves - what each one is actually like, and which ones pair well.",
    image: "/images/dest-baikka.png",
    imageAlt: "Baikka Beel wetland at sunrise with water lilies",
    relatedDestinations: ["lawachara", "madhabpur-lake", "baikka-beel", "ham-ham"],
    relatedRoute: "forest-escape",
    content: [
      {
        heading: "LAWACHARA NATIONAL PARK",
        paragraphs: [
          "Dense evergreen rainforest with marked trails and - if you are patient and quiet - hoolock gibbons overhead. You ride to the edge and walk inside; the forest floor is where it earns its reputation.",
        ],
      },
      {
        heading: "MADHABPUR LAKE",
        paragraphs: [
          "A lake folded between tea-covered hills, with a road out there that genuinely competes with the destination. Go in the afternoon, stay for the light, take the long way back.",
        ],
      },
      {
        heading: "BAIKKA BEEL",
        paragraphs: [
          "The sunrise specialist. A quiet wetland with water lilies and birdlife under a wide open sky. It asks for an early start and repays it within the first ten minutes.",
        ],
      },
      {
        heading: "HAM HAM WATERFALL",
        paragraphs: [
          "The wild one: a jungle waterfall reached by a ride that ends where the walking begins. It is the furthest out and the most physical - save it for a full day and check conditions after heavy rain.",
        ],
      },
      {
        heading: "HOW TO PAIR THEM",
        paragraphs: [
          "Gardens plus town in one easy loop. Lawachara plus the village roads in a forest day. Baikka at sunrise followed by Madhabpur in the afternoon makes a long, photogenic day. Ham Ham stands alone. The routes page turns these pairings into actual rides.",
        ],
      },
    ],
  },
  {
    slug: "scooty-vs-cng-for-exploring-sreemangal",
    title: "Scooty vs CNG for Exploring Sreemangal",
    category: "OPINION",
    dateDisplay: "Nov 2025 · DEMO",
    readTime: "4 MIN READ",
    excerpt:
      "Two ways to move around Sreemangal - the hired three-wheeler and the rented scooty. An honest comparison from the scooty side of the fence.",
    image: "/images/journal-cng.png",
    imageAlt: "Red scooter parked beside a green CNG auto rickshaw on a town street",
    relatedDestinations: ["sreemangal-town"],
    content: [
      {
        heading: "THE CASE FOR THE CNG",
        paragraphs: [
          "CNG auto-rickshaws are the default local transport: no license needed, no driving stress, and drivers who know every road. For a single point-to-point trip - station to hotel, hotel to one garden - they are perfect.",
        ],
      },
      {
        heading: "THE CASE FOR THE SCOOTY",
        paragraphs: [
          "The moment your day has more than one stop, the math changes. A CNG is hired per trip and waits per stop; a scooty is yours for the day. You choose when to leave, which road to take, and how long that viewpoint deserves. Sreemangal's best places are spread out - the freedom compounds fast.",
        ],
      },
      {
        heading: "THE HONEST TRADE-OFFS",
        paragraphs: [
          "A scooty asks more of you: you ride, you navigate, you wear the helmet and accept the weather. A CNG asks only for fare and patience. If you do not want to ride at all, take the CNG - no contest. But if the idea of choosing your own road through the tea gardens sounds like the holiday itself, that is the scooty.",
        ],
      },
      {
        heading: "OUR BIAS, DISCLOSED",
        paragraphs: [
          "Yes, we rent scooties - this is not a neutral court. But the honest summary holds: CNG for single trips, scooty for exploring. If you are the exploring kind, the booking page is where your ride starts.",
        ],
      },
    ],
  },
];

export const JOURNAL_NOTE =
  "FIELD NOTES ARE DEMO CONTENT FOR THIS CONCEPT SITE · GENERAL KNOWLEDGE ONLY, VERIFY DETAILS BEFORE PRODUCTION";

export function findArticle(slug: string): JournalArticle | undefined {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}
