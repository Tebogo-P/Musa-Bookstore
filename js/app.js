/* ═══════════════════════════════════════════════════════════
   Musa Bookstore — Shared Application Logic
   Books data, Cart management, Utilities
═══════════════════════════════════════════════════════════ */
 
// ─── Books Data (prices in ZAR) ───────────────────────────
const BOOKS_DATA = [
  { id:1,  title:"The Great Gatsby",                        author:"F. Scott Fitzgerald",  price:189,  originalPrice:249,  rating:4.5, reviews:2847,  category:"Fiction",          badge:"Bestseller",         coverClass:"cover-fiction",    cover:"https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg", emoji:"✨", pages:180, publisher:"Scribner",              year:2004, description:"Set in the Jazz Age, Nick Carraway tells the story of the enigmatic Jay Gatsby and his obsessive love for Daisy Buchanan — a timeless exploration of the American Dream.",                                                                              inStock:true,  featured:true,  newArrival:false },
  { id:2,  title:"To Kill a Mockingbird",                   author:"Harper Lee",           price:219,  originalPrice:null, rating:4.8, reviews:5123,  category:"Fiction",          badge:"Classic",            coverClass:"cover-fiction",    cover:"https://covers.openlibrary.org/b/isbn/9780061120084-M.jpg", emoji:"⚖️", pages:281, publisher:"HarperCollins",         year:2002, description:"Through the eyes of young Scout Finch, this Pulitzer Prize winner explores racial injustice and moral growth in 1930s Alabama in a deeply moving narrative.",                                                                                           inStock:true,  featured:true,  newArrival:false },
  { id:3,  title:"1984",                                    author:"George Orwell",        price:175,  originalPrice:229,  rating:4.8, reviews:6892,  category:"Science Fiction",  badge:"Must Read",          coverClass:"cover-scifi",      cover:"https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg", emoji:"👁️", pages:328, publisher:"Signet Classic",        year:1961, description:"A haunting vision of a totalitarian future. Winston Smith's rebellion against Big Brother's all-seeing surveillance state remains one of literature's most powerful warnings.",                                                                             inStock:true,  featured:true,  newArrival:false },
  { id:4,  title:"Dune",                                    author:"Frank Herbert",        price:245,  originalPrice:329,  rating:4.7, reviews:4521,  category:"Science Fiction",  badge:"Epic",               coverClass:"cover-scifi",      cover:"https://covers.openlibrary.org/b/isbn/9780441172719-M.jpg", emoji:"🏜️", pages:688, publisher:"Chilton Books",         year:1965, description:"A sweeping saga of politics, religion, and ecology on the desert planet Arrakis — home to the universe's most precious resource. A landmark of science fiction.",                                                                                      inStock:true,  featured:true,  newArrival:false },
  { id:5,  title:"Atomic Habits",                           author:"James Clear",          price:279,  originalPrice:369,  rating:4.9, reviews:8734,  category:"Self-Help",        badge:"#1 Bestseller",      coverClass:"cover-selfhelp",   cover:"https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg", emoji:"⚡", pages:320, publisher:"Avery",                 year:2018, description:"A proven framework for building good habits and breaking bad ones. Tiny 1% improvements compound into remarkable results over time.",                                                                                                                    inStock:true,  featured:true,  newArrival:false },
  { id:6,  title:"Sapiens",                                 author:"Yuval Noah Harari",    price:265,  originalPrice:349,  rating:4.7, reviews:9102,  category:"Non-Fiction",      badge:"Global Bestseller",  coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg", emoji:"🌍", pages:443, publisher:"Harper",                year:2015, description:"A bold exploration of humankind's history — from the Stone Age to the digital era — examining how Homo sapiens came to rule the world through biology, language, and power.",                                                                          inStock:true,  featured:true,  newArrival:false },
  { id:7,  title:"The Alchemist",                           author:"Paulo Coelho",         price:199,  originalPrice:259,  rating:4.6, reviews:7234,  category:"Fiction",          badge:"Inspirational",      coverClass:"cover-fiction",    cover:"https://covers.openlibrary.org/b/isbn/9780062412591-M.jpg", emoji:"🌟", pages:197, publisher:"HarperSanFrancisco",   year:1988, description:"A young Andalusian shepherd's journey to find treasure leads him to discover the real meaning of his personal legend. A timeless fable about following your dreams.",                                                                                  inStock:true,  featured:true,  newArrival:false },
  { id:8,  title:"Gone Girl",                               author:"Gillian Flynn",        price:229,  originalPrice:null, rating:4.2, reviews:3456,  category:"Mystery",          badge:"Thriller",           coverClass:"cover-mystery",    cover:"https://covers.openlibrary.org/b/isbn/9780553385495-M.jpg", emoji:"🔍", pages:422, publisher:"Crown",                 year:2012, description:"On their fifth anniversary, Nick Dunne reports his wife Amy missing. As investigation unfolds, a complex marriage unravels in alternating perspectives full of dark twists.",                                                                           inStock:true,  featured:true,  newArrival:false },
  { id:9,  title:"Becoming",                                author:"Michelle Obama",       price:259,  originalPrice:379,  rating:4.9, reviews:12089, category:"Biography",        badge:"NYT #1",             coverClass:"cover-biography",  cover:"https://covers.openlibrary.org/b/isbn/9781524763136-M.jpg", emoji:"👑", pages:448, publisher:"Crown",                 year:2018, description:"An intimate and powerful memoir by the former First Lady — from her Chicago childhood to the White House years. A story of identity, resilience, and hope.",                                                                                          inStock:true,  featured:false, newArrival:true  },
  { id:10, title:"Steve Jobs",                              author:"Walter Isaacson",      price:299,  originalPrice:419,  rating:4.5, reviews:4231,  category:"Biography",        badge:"Definitive",         coverClass:"cover-biography",  cover:"https://covers.openlibrary.org/b/isbn/9781451648539-M.jpg", emoji:"🍎", pages:656, publisher:"Simon & Schuster",     year:2011, description:"Based on exclusive interviews, this biography reveals the brilliant and polarizing man who revolutionised technology, design, and culture at Apple.",                                                                                                 inStock:true,  featured:false, newArrival:false },
  { id:11, title:"The 7 Habits of Highly Effective People", author:"Stephen Covey",       price:229,  originalPrice:299,  rating:4.6, reviews:5678,  category:"Self-Help",        badge:"Classic",            coverClass:"cover-selfhelp",   cover:"https://covers.openlibrary.org/b/isbn/9781451639619-M.jpg", emoji:"🎯", pages:384, publisher:"Free Press",            year:1989, description:"Seven timeless principles for personal and professional effectiveness — from private victories of character to public victories of leadership.",                                                                                                       inStock:true,  featured:false, newArrival:false },
  { id:12, title:"Pride and Prejudice",                     author:"Jane Austen",         price:159,  originalPrice:null, rating:4.7, reviews:6543,  category:"Romance",          badge:"Classic",            coverClass:"cover-romance",    cover:"https://covers.openlibrary.org/b/isbn/9780141439518-M.jpg", emoji:"❤️", pages:432, publisher:"Penguin Classics",     year:2002, description:"Elizabeth Bennet navigates love, class, and self-discovery in Georgian England. Austen's wit and insight into human nature make this one of the most beloved novels ever written.",                                                                 inStock:true,  featured:false, newArrival:false },
  { id:13, title:"Guns, Germs, and Steel",                  author:"Jared Diamond",       price:249,  originalPrice:319,  rating:4.4, reviews:3201,  category:"History",          badge:"Pulitzer Prize",     coverClass:"cover-history",    cover:"https://covers.openlibrary.org/b/isbn/9780393317558-M.jpg", emoji:"🏛️", pages:498, publisher:"W. W. Norton",         year:1997, description:"Diamond argues that geography and environment — not race — determined which civilisations flourished. A fascinating account of human societal development.",                                                                                       inStock:true,  featured:false, newArrival:false },
  { id:14, title:"The Hitchhiker's Guide to the Galaxy",    author:"Douglas Adams",       price:199,  originalPrice:259,  rating:4.6, reviews:4892,  category:"Science Fiction",  badge:"Cult Classic",       coverClass:"cover-scifi",      cover:"https://covers.openlibrary.org/b/isbn/9780330325721-M.jpg", emoji:"🚀", pages:224, publisher:"Pan Books",            year:1979, description:"Seconds before Earth is demolished for a hyperspace bypass, Arthur Dent is whisked off on a hilarious cosmic adventure. Don't panic!",                                                                                                                inStock:true,  featured:false, newArrival:true  },
  { id:15, title:"A Brief History of Time",                 author:"Stephen Hawking",     price:229,  originalPrice:299,  rating:4.6, reviews:5102,  category:"Science",          badge:"Landmark",           coverClass:"cover-science",    cover:"https://covers.openlibrary.org/b/isbn/9780553380163-M.jpg", emoji:"🔭", pages:212, publisher:"Bantam",               year:1988, description:"Hawking's accessible tour of cosmology — from the Big Bang to black holes — became a landmark in popular science writing beloved by millions worldwide.",                                                                                            inStock:true,  featured:false, newArrival:false },
  { id:16, title:"How to Win Friends and Influence People",  author:"Dale Carnegie",      price:199,  originalPrice:259,  rating:4.5, reviews:7823,  category:"Self-Help",        badge:"All-Time Classic",   coverClass:"cover-selfhelp",   cover:"https://covers.openlibrary.org/b/isbn/9780671027032-M.jpg", emoji:"🤝", pages:288, publisher:"Simon & Schuster",     year:1936, description:"Carnegie's timeless guide to building meaningful relationships, handling people effectively, and becoming a more likable and influential leader.",                                                                                                    inStock:true,  featured:false, newArrival:false },
  { id:17, title:"The Girl with the Dragon Tattoo",          author:"Stieg Larsson",      price:215,  originalPrice:289,  rating:4.4, reviews:4120,  category:"Mystery",          badge:"International Hit",  coverClass:"cover-mystery",    cover:"https://covers.openlibrary.org/b/isbn/9780307454546-M.jpg", emoji:"🐉", pages:672, publisher:"Vintage",              year:2005, description:"Journalist Mikael Blomkvist teams with extraordinary hacker Lisbeth Salander to investigate a decades-old disappearance within a wealthy Swedish dynasty.",                                                                                       inStock:true,  featured:false, newArrival:false },
  { id:18, title:"Me Before You",                            author:"Jojo Moyes",         price:199,  originalPrice:259,  rating:4.5, reviews:5432,  category:"Romance",          badge:"Heartfelt",          coverClass:"cover-romance",    cover:"https://covers.openlibrary.org/b/isbn/9780399576805-M.jpg", emoji:"🌹", pages:369, publisher:"Pamela Dorman Books",  year:2012, description:"An unlikely relationship between Lou Clark and quadriplegic Will Traynor challenges both of their notions of what makes life worth living — a profoundly emotional story.",                                                                    inStock:true,  featured:false, newArrival:true  },
  { id:19, title:"Thinking, Fast and Slow",                  author:"Daniel Kahneman",    price:245,  originalPrice:339,  rating:4.5, reviews:4892,  category:"Non-Fiction",      badge:"Nobel Prize Winner", coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9780374533557-M.jpg", emoji:"🧠", pages:499, publisher:"Farrar, Straus and Giroux", year:2011, description:"Nobel laureate Kahneman illuminates the two systems driving the way we think — fast intuitive System 1 and slow deliberate System 2 — revealing biases that shape our world.",                                                              inStock:true,  featured:false, newArrival:false },
  { id:20, title:"Ender's Game",                             author:"Orson Scott Card",   price:215,  originalPrice:279,  rating:4.5, reviews:3921,  category:"Science Fiction",  badge:"Hugo & Nebula",      coverClass:"cover-scifi",      cover:"https://covers.openlibrary.org/b/isbn/9780812550702-M.jpg", emoji:"🎮", pages:352, publisher:"Tor Books",            year:1985, description:"Young genius Ender Wiggin is recruited for a battle school in space to train for a looming alien invasion. A masterwork of military science fiction.",                                                                                             inStock:true,  featured:false, newArrival:false },
  { id:21, title:"Brave New World",                          author:"Aldous Huxley",      price:175,  originalPrice:229,  rating:4.3, reviews:4567,  category:"Science Fiction",  badge:"Dystopian",          coverClass:"cover-scifi",      cover:"https://covers.openlibrary.org/b/isbn/9780060085377-M.jpg", emoji:"🧬", pages:311, publisher:"Harper Perennial",    year:1932, description:"A chilling vision of a future society where genetic engineering and conditioning create a seemingly perfect but profoundly dehumanised world.",                                                                                                  inStock:true,  featured:false, newArrival:false },
  { id:22, title:"The Power of Now",                         author:"Eckhart Tolle",      price:215,  originalPrice:279,  rating:4.4, reviews:6234,  category:"Self-Help",        badge:"Spiritual",          coverClass:"cover-selfhelp",   cover:"https://covers.openlibrary.org/b/isbn/9781577314806-M.jpg", emoji:"☀️", pages:236, publisher:"New World Library",    year:1997, description:"A guide to spiritual enlightenment through present-moment awareness — learning to observe your thoughts without being controlled by them.",                                                                                                     inStock:true,  featured:false, newArrival:true  },
  { id:23, title:"The Catcher in the Rye",                   author:"J.D. Salinger",      price:185,  originalPrice:null, rating:4.1, reviews:5678,  category:"Fiction",          badge:"Coming of Age",      coverClass:"cover-fiction",    cover:"https://covers.openlibrary.org/b/isbn/9780316769174-M.jpg", emoji:"🍞", pages:277, publisher:"Little, Brown",        year:1951, description:"Holden Caulfield's disenchanted narration of his days adrift in New York City after being expelled from prep school — a defining novel of teenage alienation.",                                                                                   inStock:true,  featured:false, newArrival:false },
  { id:24, title:"The Notebook",                             author:"Nicholas Sparks",    price:185,  originalPrice:229,  rating:4.3, reviews:4102,  category:"Romance",          badge:"Bestselling",        coverClass:"cover-romance",    cover:"https://covers.openlibrary.org/b/isbn/9780446676129-M.jpg", emoji:"📔", pages:214, publisher:"Warner Books",         year:1996, description:"An aged man reads a beautiful love story to a woman with dementia — the enduring tale of Noah and Allie's love that transcends time, memory, and hardship.",                                                                                  inStock:true,  featured:false, newArrival:false },
 
  // ── Military Authors ─────────────────────────────────────
  { id:25, title:"Gates of Fire",                            author:"Steven Pressfield",  price:229,  originalPrice:299,  rating:4.8, reviews:3102,  category:"Military Author",  badge:"Military Classic",   coverClass:"cover-history",    cover:"https://covers.openlibrary.org/b/isbn/9780553580532-M.jpg", emoji:"⚔️",  pages:386, publisher:"Doubleday",           year:1998, description:"The legendary Battle of Thermopylae told through the sole Spartan survivor — an unflinching portrait of courage, brotherhood, and sacrifice that has become required reading at West Point.",                                                       inStock:true,  featured:false, newArrival:false },
  { id:26, title:"The Things They Carried",                  author:"Tim O'Brien",        price:199,  originalPrice:259,  rating:4.7, reviews:4521,  category:"Military Author",  badge:"War Literature",     coverClass:"cover-fiction",    cover:"https://covers.openlibrary.org/b/isbn/9780618706419-M.jpg", emoji:"🎖️",  pages:233, publisher:"Houghton Mifflin",    year:1990, description:"Linked stories of an American platoon in Vietnam, blurring fact and fiction. O'Brien — himself a Vietnam veteran — examines truth, memory, and the burden soldiers carry long after battle ends.",                                                   inStock:true,  featured:false, newArrival:true  },
  { id:27, title:"Black Hawk Down",                          author:"Mark Bowden",        price:215,  originalPrice:285,  rating:4.6, reviews:2987,  category:"Military Author",  badge:"True Combat",        coverClass:"cover-history",    cover:"https://covers.openlibrary.org/b/isbn/9780451205469-M.jpg", emoji:"🦅",  pages:386, publisher:"Atlantic Monthly",    year:1999, description:"The definitive account of the 1993 Battle of Mogadishu — 18 Americans killed in the most intense urban combat since Vietnam. Bowden's meticulous journalism puts you inside every harrowing minute.",                                              inStock:true,  featured:false, newArrival:false },
  { id:28, title:"With the Old Breed",                       author:"Eugene Sledge",      price:185,  originalPrice:245,  rating:4.9, reviews:2341,  category:"Military Author",  badge:"WWII Memoir",        coverClass:"cover-history",    cover:"https://covers.openlibrary.org/b/isbn/9780891416685-M.jpg", emoji:"🎗️",  pages:326, publisher:"Presidio Press",      year:1981, description:"Considered one of the finest memoirs of World War II. Marine Eugene Sledge writes with raw, unsparing honesty about the Pacific campaigns of Peleliu and Okinawa.",                                                                                  inStock:true,  featured:false, newArrival:false },
  { id:49, title:"A Handful of Hard Men",                    author:"Hannes Wessels",     price:229,  originalPrice:299,  rating:4.7, reviews:1823,  category:"Military Author",  badge:"SA Border War",      coverClass:"cover-history",    cover:"https://covers.openlibrary.org/b/isbn/9781612003870-M.jpg", emoji:"🦁",  pages:384, publisher:"Casemate",            year:2015, description:"A South African-authored account of the Rhodesian Special Air Service and its legendary commander Ron Reid-Daly — gripping counterinsurgency warfare and extraordinary soldiering in the African bush wars.",                                        inStock:true,  featured:false, newArrival:false },
  { id:50, title:"The Silent War",                           author:"Peter Stiff",        price:199,  originalPrice:259,  rating:4.6, reviews:1456,  category:"Military Author",  badge:"SA Border War",      coverClass:"cover-history",    cover:"https://covers.openlibrary.org/b/isbn/9780620209892-M.jpg", emoji:"🎗️",  pages:502, publisher:"Galago",              year:1999, description:"South African military journalist Peter Stiff unveils the covert operations of the South African Defence Force during the Border War in Namibia and Angola — essential, meticulously researched SA military history.",                               inStock:true,  featured:false, newArrival:true  },
  { id:51, title:"Matterhorn",                               author:"Karl Marlantes",     price:245,  originalPrice:319,  rating:4.8, reviews:2943,  category:"Military Author",  badge:"Vietnam Classic",    coverClass:"cover-fiction",    cover:"https://covers.openlibrary.org/b/isbn/9780802119285-M.jpg", emoji:"⛰️",  pages:566, publisher:"Atlantic Monthly",    year:2010, description:"A monumental Vietnam War novel written by a decorated Marine veteran. Marlantes draws on his own combat experience to deliver a brutally authentic portrait of jungle warfare and American soldiering.",                                             inStock:true,  featured:false, newArrival:false },
  { id:52, title:"Tribe",                                    author:"Sebastian Junger",   price:185,  originalPrice:239,  rating:4.4, reviews:3102,  category:"Military Author",  badge:"Thought-Provoking",  coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9781455566389-M.jpg", emoji:"🧭",  pages:192, publisher:"Twelve",              year:2016, description:"War correspondent and combat journalist Junger explores why soldiers often find more meaning in war than civilian life — a provocative study of belonging, purpose, and the broken social contract of modern society.",                                inStock:true,  featured:false, newArrival:false },
  { id:53, title:"Buffalo Soldiers",                         author:"Al J. Venter",       price:239,  originalPrice:309,  rating:4.5, reviews:1234,  category:"Military Author",  badge:"African Warfare",    coverClass:"cover-history",    cover:"https://covers.openlibrary.org/b/isbn/9781612003443-M.jpg", emoji:"🦬",  pages:428, publisher:"Casemate",            year:2011, description:"South African military journalist Al J. Venter documents Portugal's colonial wars and mercenary conflicts across Africa — authoritative first-hand reportage from one of the continent's foremost military writers.",                                inStock:true,  featured:false, newArrival:false },
  { id:54, title:"Recce: Small Team Operations Behind Enemy Lines", author:"Koos Stadler", price:259, originalPrice:329, rating:4.9, reviews:2187,  category:"Military Author",  badge:"SA Special Forces",  coverClass:"cover-history",    cover:"https://covers.openlibrary.org/b/isbn/9781432306175-M.jpg", emoji:"🎯",  pages:352, publisher:"Penguin Random House SA", year:2015, description:"A South African Special Forces operator's first-hand account of Recce operations during the Bush War — small team missions deep behind enemy lines in Angola and Mozambique. Riveting and historically vital.",                                 inStock:true,  featured:false, newArrival:false },
 
  // ── Religious ────────────────────────────────────────────
  { id:29, title:"The Purpose Driven Life",                  author:"Rick Warren",        price:199,  originalPrice:259,  rating:4.6, reviews:8934,  category:"Religious",        badge:"Global Bestseller",  coverClass:"cover-selfhelp",   cover:"https://covers.openlibrary.org/b/isbn/9780310205715-M.jpg", emoji:"✝️",  pages:368, publisher:"Zondervan",           year:2002, description:"One of the best-selling non-fiction books in history. A 40-day spiritual journey exploring the five purposes God created every person to fulfil — transformational regardless of denomination.",                                                                      inStock:true,  featured:false, newArrival:false },
  { id:30, title:"Mere Christianity",                        author:"C.S. Lewis",         price:175,  originalPrice:229,  rating:4.8, reviews:6120,  category:"Religious",        badge:"Timeless Classic",   coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9780060652920-M.jpg", emoji:"✨",  pages:227, publisher:"HarperOne",           year:1952, description:"C.S. Lewis's landmark defence of the Christian faith, originally delivered as BBC radio broadcasts during WWII. Logical, warm, and accessible — a classic of 20th-century religious thought.",                                                        inStock:true,  featured:false, newArrival:false },
  { id:31, title:"The Case for Christ",                      author:"Lee Strobel",        price:189,  originalPrice:249,  rating:4.5, reviews:4821,  category:"Religious",        badge:"Investigative",      coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9780310209300-M.jpg", emoji:"🔍",  pages:352, publisher:"Zondervan",           year:1998, description:"A former atheist journalist investigates the historical evidence for Jesus of Nazareth, interviewing leading scholars across archaeology, medicine, and philosophy. Compelling and rigorously researched.",                                            inStock:true,  featured:false, newArrival:true  },
  { id:32, title:"Man's Search for Meaning",                 author:"Viktor E. Frankl",   price:165,  originalPrice:215,  rating:4.9, reviews:9203,  category:"Religious",        badge:"Philosophical",      coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9780807014271-M.jpg", emoji:"🕊️",  pages:200, publisher:"Beacon Press",        year:1946, description:"Holocaust survivor Viktor Frankl's profound account of finding purpose amid unimaginable suffering. The foundation of logotherapy — one of the most influential books of the 20th century.",                                                           inStock:true,  featured:false, newArrival:false },
  { id:43, title:"No Future Without Forgiveness",            author:"Desmond Tutu",       price:215,  originalPrice:279,  rating:4.8, reviews:3421,  category:"Religious",        badge:"Nobel Laureate",     coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9780385496902-M.jpg", emoji:"🕊️",  pages:280, publisher:"Doubleday",           year:1999, description:"Archbishop Desmond Tutu chronicles South Africa's Truth and Reconciliation Commission — a profound meditation on forgiveness, restorative justice, and healing from one of Africa's greatest moral and spiritual voices.",                             inStock:true,  featured:false, newArrival:false },
  { id:44, title:"Abide in Christ",                          author:"Andrew Murray",      price:149,  originalPrice:195,  rating:4.7, reviews:2891,  category:"Religious",        badge:"SA Classic",         coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9781603748841-M.jpg", emoji:"✝️",  pages:224, publisher:"Whitaker House",      year:1895, description:"Born in Graaff-Reinet, South Africa, Andrew Murray's timeless devotional explores the daily practice of remaining in Christ. One of the most beloved spiritual classics ever written by a South African author.",                                    inStock:true,  featured:false, newArrival:false },
  { id:45, title:"The Reason for God",                       author:"Timothy Keller",     price:215,  originalPrice:279,  rating:4.7, reviews:5234,  category:"Religious",        badge:"Apologetics",        coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9781594483493-M.jpg", emoji:"💡",  pages:293, publisher:"Dutton",              year:2008, description:"Pastor Timothy Keller engages the most common doubts about faith with intellectual rigour and pastoral warmth — a landmark of modern Christian apologetics for both believers and thoughtful sceptics.",                                               inStock:true,  featured:false, newArrival:false },
  { id:46, title:"Battlefield of the Mind",                  author:"Joyce Meyer",        price:175,  originalPrice:229,  rating:4.6, reviews:6782,  category:"Religious",        badge:"Inspirational",      coverClass:"cover-selfhelp",   cover:"https://covers.openlibrary.org/b/isbn/9780446691093-M.jpg", emoji:"🧠",  pages:272, publisher:"Faith Words",         year:1995, description:"One of the most widely read Christian books of the past generation. Meyer teaches how transforming thought patterns through Scripture brings freedom from anxiety, doubt, and self-defeating beliefs.",                                                    inStock:true,  featured:false, newArrival:true  },
  { id:47, title:"The Hiding Place",                         author:"Corrie ten Boom",    price:179,  originalPrice:229,  rating:4.9, reviews:7102,  category:"Religious",        badge:"WWII Testimony",     coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9780800794057-M.jpg", emoji:"🕯️",  pages:256, publisher:"Chosen Books",        year:1971, description:"The true story of Corrie ten Boom, who hid Jewish families in her home during the Holocaust. A shattering and ultimately hopeful testimony of faith, courage, and supernatural forgiveness.",                                                          inStock:true,  featured:false, newArrival:false },
  { id:48, title:"Ubuntu: An African Philosophy of Life",    author:"Munyaradzi Mawere",  price:229,  originalPrice:299,  rating:4.5, reviews:1823,  category:"Religious",        badge:"African Philosophy", coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9789956764099-M.jpg", emoji:"🌍",  pages:312, publisher:"Langaa Research",     year:2014, description:"An exploration of Ubuntu — the Southern African ethical and spiritual philosophy that 'I am because we are' — examining its moral foundations and enduring relevance for community, justice, and human dignity.",                                      inStock:true,  featured:false, newArrival:false },
  { id:55, title:"God Has a Dream",                          author:"Desmond Tutu",       price:189,  originalPrice:249,  rating:4.7, reviews:2341,  category:"Religious",        badge:"SA Archbishop",      coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9780385521451-M.jpg", emoji:"🌅",  pages:192, publisher:"Doubleday",           year:2004, description:"South Africa's beloved Archbishop Tutu invites readers to see themselves through God's eyes — a vision of hope, reconciliation, and ubuntu that transcends suffering and speaks to all of humanity.",                                                  inStock:true,  featured:false, newArrival:false },
  { id:56, title:"With God in Russia",                       author:"Walter J. Ciszek",   price:185,  originalPrice:239,  rating:4.8, reviews:3102,  category:"Religious",        badge:"Spiritual Memoir",   coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9780898705324-M.jpg", emoji:"⛪",  pages:304, publisher:"Loyola Press",        year:1964, description:"An American Jesuit priest's extraordinary account of 23 years in Soviet labour camps — a profound witness to faith, endurance, and the sustaining power of prayer under unimaginable conditions.",                                                    inStock:true,  featured:false, newArrival:false },
];
 
// ─── Used Books Data (prices in ZAR) ──────────────────────
const USED_BOOKS_DATA = [
  { id:101, title:"The Great Gatsby",                     author:"F. Scott Fitzgerald", price:89,  originalPrice:189, condition:"Very Good",  conditionNote:"Minor shelf wear on cover, pages clean and unmarked.",               coverClass:"cover-fiction",    cover:"https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg", emoji:"✨", category:"Fiction",         rating:4.5, reviews:2847,  badge:"Used – Very Good", inStock:true },
  { id:102, title:"Sapiens",                              author:"Yuval Noah Harari",   price:129, originalPrice:265, condition:"Good",       conditionNote:"Some pencil underlining inside — great annotated reading copy.",      coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg", emoji:"🌍", category:"Non-Fiction",     rating:4.7, reviews:9102,  badge:"Used – Good",      inStock:true },
  { id:103, title:"Atomic Habits",                        author:"James Clear",         price:149, originalPrice:279, condition:"Like New",   conditionNote:"Read once. Near-perfect condition, no markings whatsoever.",          coverClass:"cover-selfhelp",   cover:"https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg", emoji:"⚡", category:"Self-Help",       rating:4.9, reviews:8734,  badge:"Used – Like New",  inStock:true },
  { id:104, title:"Dune",                                 author:"Frank Herbert",       price:119, originalPrice:245, condition:"Good",       conditionNote:"Creased spine from reading, all pages clean and bright.",             coverClass:"cover-scifi",      cover:"https://covers.openlibrary.org/b/isbn/9780441172719-M.jpg", emoji:"🏜️", category:"Science Fiction", rating:4.7, reviews:4521,  badge:"Used – Good",      inStock:true },
  { id:105, title:"Becoming",                             author:"Michelle Obama",      price:139, originalPrice:259, condition:"Like New",   conditionNote:"Excellent condition — looks completely unread.",                       coverClass:"cover-biography",  cover:"https://covers.openlibrary.org/b/isbn/9781524763136-M.jpg", emoji:"👑", category:"Biography",       rating:4.9, reviews:12089, badge:"Used – Like New",  inStock:true },
  { id:106, title:"Gone Girl",                            author:"Gillian Flynn",       price:99,  originalPrice:229, condition:"Very Good",  conditionNote:"Light cover wear, all interior pages clean and crisp.",               coverClass:"cover-mystery",    cover:"https://covers.openlibrary.org/b/isbn/9780553385495-M.jpg", emoji:"🔍", category:"Mystery",         rating:4.2, reviews:3456,  badge:"Used – Very Good", inStock:true },
  { id:107, title:"Pride and Prejudice",                  author:"Jane Austen",         price:79,  originalPrice:159, condition:"Good",       conditionNote:"Vintage Penguin copy. Well-loved, some yellowing typical of age.",    coverClass:"cover-romance",    cover:"https://covers.openlibrary.org/b/isbn/9780141439518-M.jpg", emoji:"❤️", category:"Romance",         rating:4.7, reviews:6543,  badge:"Used – Good",      inStock:true },
  { id:108, title:"1984",                                 author:"George Orwell",       price:95,  originalPrice:175, condition:"Very Good",  conditionNote:"Minor scuff on back cover. Interior pages in perfect condition.",     coverClass:"cover-scifi",      cover:"https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg", emoji:"👁️", category:"Science Fiction", rating:4.8, reviews:6892,  badge:"Used – Very Good", inStock:true },
  { id:109, title:"Thinking, Fast and Slow",              author:"Daniel Kahneman",     price:125, originalPrice:245, condition:"Good",       conditionNote:"Highlighted passages throughout — ideal annotated study copy.",       coverClass:"cover-nonfiction", cover:"https://covers.openlibrary.org/b/isbn/9780374533557-M.jpg", emoji:"🧠", category:"Non-Fiction",     rating:4.5, reviews:4892,  badge:"Used – Good",      inStock:true },
  { id:110, title:"The Hitchhiker's Guide to the Galaxy", author:"Douglas Adams",       price:89,  originalPrice:199, condition:"Like New",   conditionNote:"Minimal wear, tight spine. A beautiful copy in superb condition.",   coverClass:"cover-scifi",      cover:"https://covers.openlibrary.org/b/isbn/9780330325721-M.jpg", emoji:"🚀", category:"Science Fiction", rating:4.6, reviews:4892,  badge:"Used – Like New",  inStock:true }
];
 
// ─── CART MANAGEMENT ──────────────────────────────────────
const Cart = {
  KEY:        'musaCart',
  WISHLIST_KEY: 'musaWishlist',
  COUPON_KEY: 'musaCoupon',
 
  COUPONS: {
    'MUSA10': { discount: 0.10, label: '10% Off' },
    'READ20': { discount: 0.20, label: '20% Off' },
    'BOOK15': { discount: 0.15, label: '15% Off' },
    'SAVE25': { discount: 0.25, label: '25% Off' }
  },
 
  get() {
    try   { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch { return []; }
  },
 
  save(cart) {
    localStorage.setItem(this.KEY, JSON.stringify(cart));
  },
 
  add(bookId, qty = 1, isUsed = false) {
    const cart     = this.get();
    const key      = isUsed ? 'u' + bookId : bookId;
    const existing = cart.find(i => i.id === key);
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, 10);
    } else {
      cart.push({ id: key, qty, isUsed });
    }
    this.save(cart);
    this.updateBadge();
  },
 
  remove(key) {
    const cart = this.get().filter(i => String(i.id) !== String(key));
    this.save(cart);
    this.updateBadge();
  },
 
  updateQty(key, qty) {
    const cart = this.get();
    const item = cart.find(i => String(i.id) === String(key));
    if (item) {
      if (qty < 1) { this.remove(key); return; }
      item.qty = Math.min(qty, 10);
      this.save(cart);
    }
    this.updateBadge();
  },
 
  resolveBook(item) {
    if (item.isUsed) {
      const numId = parseInt(String(item.id).replace('u', ''));
      return USED_BOOKS_DATA.find(b => b.id === numId) || null;
    }
    return BOOKS_DATA.find(b => b.id === item.id) || null;
  },
 
  count() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },
 
  subtotal() {
    return this.get().reduce((sum, i) => {
      const book = this.resolveBook(i);
      return sum + (book ? book.price * i.qty : 0);
    }, 0);
  },
 
  clear() {
    localStorage.removeItem(this.KEY);
    localStorage.removeItem(this.COUPON_KEY);
    this.updateBadge();
  },
 
  updateBadge() {
    const count = this.count();
    $('.cart-badge').text(count).toggleClass('hidden', count === 0);
  },
 
  // Wishlist
  getWishlist() {
    try   { return JSON.parse(localStorage.getItem(this.WISHLIST_KEY)) || []; }
    catch { return []; }
  },
 
  toggleWishlist(bookId) {
    let wl = this.getWishlist();
    if (wl.includes(bookId)) {
      wl = wl.filter(id => id !== bookId);
    } else {
      wl.push(bookId);
    }
    localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(wl));
    return wl.includes(bookId);
  },
 
  isWishlisted(bookId) {
    return this.getWishlist().includes(bookId);
  },
 
  // Coupon — may be patched by rewards.js at runtime
  applyCoupon(code) {
    const upper  = code.toUpperCase();
    // Check personal coupons first
    try {
      const personal = JSON.parse(localStorage.getItem('musaPersonalCoupons') || '{}');
      if (personal[upper]) {
        const coupon = { ...personal[upper], code: upper };
        localStorage.setItem(this.COUPON_KEY, JSON.stringify(coupon));
        return coupon;
      }
    } catch (e) { /* ignore */ }
    // Fall back to static list
    const coupon = this.COUPONS[upper];
    if (coupon) {
      localStorage.setItem(this.COUPON_KEY, JSON.stringify({ code: upper, ...coupon }));
      return coupon;
    }
    return null;
  },
 
  getAppliedCoupon() {
    try   { return JSON.parse(localStorage.getItem(this.COUPON_KEY)) || null; }
    catch { return null; }
  },
 
  removeCoupon() {
    localStorage.removeItem(this.COUPON_KEY);
  }
};
 
// ─── UTILITIES ────────────────────────────────────────────
 
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    '<i class="fas fa-star star-filled"></i>'.repeat(full) +
    (half ? '<i class="fas fa-star-half-alt star-half"></i>' : '') +
    '<i class="far fa-star star-empty"></i>'.repeat(empty)
  );
}
 
function formatPrice(n) {
  return 'R' + Number(n).toFixed(2);
}
 
function getBadgeClass(badge) {
  if (!badge) return 'badge-default';
  const b = badge.toLowerCase();
  if (b.includes('bestseller') || b.includes('#1')) return 'badge-bestseller';
  if (b.includes('new') || b.includes('arrival'))   return 'badge-new';
  if (b.includes('sale') || b.includes('off'))       return 'badge-sale';
  if (b.includes('classic') || b.includes('prize'))  return 'badge-classic';
  if (b.includes('used'))                            return 'badge-used';
  return 'badge-default';
}
 
function getConditionColor(condition) {
  if (condition === 'Like New')  return { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' };
  if (condition === 'Very Good') return { bg: 'bg-sky-100',     text: 'text-sky-700',     dot: 'bg-sky-500'     };
  return                                { bg: 'bg-amber-100',   text: 'text-amber-700',   dot: 'bg-amber-500'   };
}
 
function showToast(message, type = 'success', duration = 3000) {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', cart: '🛒' };
  const icon  = icons[type] || icons.info;
  const $toast = $(`
    <div class="toast toast-${type === 'cart' ? 'success' : type} show">
      <span class="text-xl">${icon}</span>
      <span>${message}</span>
    </div>
  `);
  $('#toast-container').append($toast);
  setTimeout(() => {
    $toast.removeClass('show');
    setTimeout(() => $toast.remove(), 400);
  }, duration);
}
 
function buildBookCard(book, extraClasses = '') {
  const discount   = book.originalPrice
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : 0;
  const wishlisted = Cart.isWishlisted(book.id);
 
  return `
    <div class="book-card bg-white rounded-2xl overflow-hidden shadow-md ${extraClasses}" data-id="${book.id}">
      <div class="book-cover-wrap ${book.coverClass} relative" style="height:200px;
           background-image:url('${book.cover}'); background-size:cover; background-position:center;">
        <img src="${book.cover}" alt="${book.title}"
             style="width:100%;height:100%;object-fit:cover;display:none;"
             onerror="this.style.display='none';" />
        <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-white text-center"
             style="background:${book.cover ? 'none' : 'linear-gradient(135deg,#f59e0b 0%,#d97706 100%)'};
                    display:${book.cover ? 'none' : 'flex'};">
          <span class="text-5xl mb-2">${book.emoji}</span>
          <p class="font-serif font-bold text-sm leading-tight line-clamp-2 opacity-90">${book.title}</p>
          <p class="text-xs opacity-70 mt-1">${book.author}</p>
        </div>
        ${discount > 0 ? `<span class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-${discount}%</span>` : ''}
        <button class="wishlist-btn absolute top-2 right-2 text-white hover:text-red-400 transition-colors
                 bg-black bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center
                 ${wishlisted ? 'active' : ''}" data-id="${book.id}" onclick="event.stopPropagation()">
          <i class="${wishlisted ? 'fas' : 'far'} fa-heart"></i>
        </button>
        ${book.newArrival ? `<span class="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">New</span>` : ''}
      </div>
      <div class="p-4">
        <span class="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${getBadgeClass(book.badge)}">${book.badge}</span>
        <h3 class="font-serif font-bold text-gray-900 text-sm leading-tight mb-0.5 line-clamp-2">${book.title}</h3>
        <p class="text-gray-500 text-xs mb-2">${book.author}</p>
        <div class="flex items-center gap-1 mb-3">
          <div class="flex text-xs">${renderStars(book.rating)}</div>
          <span class="text-xs text-gray-400">(${book.reviews.toLocaleString()})</span>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-sky-600 font-bold text-base">${formatPrice(book.price)}</span>
            ${book.originalPrice ? `<span class="text-gray-400 text-xs line-through ml-1">${formatPrice(book.originalPrice)}</span>` : ''}
          </div>
          <button class="btn-add-cart bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-3 py-2 rounded-xl add-to-cart-btn" data-id="${book.id}">
            <i class="fas fa-cart-plus mr-1"></i>Add
          </button>
        </div>
      </div>
    </div>
  `;
}
 
function buildUsedBookCard(book) {
  const c      = getConditionColor(book.condition);
  const saving = book.originalPrice - book.price;
  return `
    <div class="used-book-card book-card bg-white rounded-2xl overflow-hidden shadow-md border-2 border-dashed border-amber-200" data-used-id="${book.id}">
      <div class="book-cover-wrap ${book.coverClass} relative" style="height:180px;
           background-image:url('${book.cover}'); background-size:cover; background-position:center;">
        <img src="${book.cover}" alt="${book.title}"
             style="width:100%;height:100%;object-fit:cover;display:none;"
             onerror="this.style.display='none';" />
        <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-white text-center"
             style="background:${book.cover ? 'none' : 'linear-gradient(135deg,#f59e0b 0%,#d97706 100%)'};
                    display:${book.cover ? 'none' : 'flex'};">
          <span class="text-4xl mb-2">${book.emoji}</span>
          <p class="font-serif font-bold text-xs leading-tight line-clamp-2 opacity-90">${book.title}</p>
          <p class="text-xs opacity-60 mt-0.5">${book.author}</p>
        </div>
        <span class="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          <i class="fas fa-recycle mr-0.5"></i>Used
        </span>
        <div class="absolute bottom-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          Save ${formatPrice(saving)}
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-center gap-1.5 mb-2">
          <span class="w-2 h-2 rounded-full ${c.dot} flex-shrink-0"></span>
          <span class="text-xs font-bold ${c.text} ${c.bg} px-2 py-0.5 rounded-full">${book.condition}</span>
        </div>
        <h3 class="font-serif font-bold text-gray-900 text-sm leading-tight mb-0.5 line-clamp-1">${book.title}</h3>
        <p class="text-gray-500 text-xs mb-1">${book.author}</p>
        <p class="text-gray-400 text-xs italic mb-3 line-clamp-2">${book.conditionNote}</p>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-amber-600 font-bold text-base">${formatPrice(book.price)}</span>
            <span class="text-gray-400 text-xs line-through ml-1">${formatPrice(book.originalPrice)}</span>
          </div>
          <button class="btn-add-cart bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-xl add-used-to-cart-btn" data-id="${book.id}">
            <i class="fas fa-cart-plus mr-1"></i>Add
          </button>
        </div>
      </div>
    </div>
  `;
}
 
// ─── COMMON jQuery SETUP ──────────────────────────────────
$(function () {
 
  const savedTheme = localStorage.getItem('musaTheme');
  if (savedTheme === 'dark') $('html').addClass('dark');
 
  $(document).on('click', '#theme-toggle', function () {
    const isDark = $('html').toggleClass('dark').hasClass('dark');
    localStorage.setItem('musaTheme', isDark ? 'dark' : 'light');
    $('#theme-icon').toggleClass('fa-moon', !isDark).toggleClass('fa-sun', isDark);
  });
 
  const isDarkOnLoad = $('html').hasClass('dark');
  $('#theme-icon').toggleClass('fa-moon', !isDarkOnLoad).toggleClass('fa-sun', isDarkOnLoad);
 
  Cart.updateBadge();
 
  $(window).on('scroll', function () {
    $('#navbar').toggleClass('scrolled', $(this).scrollTop() > 60);
    $('#scroll-top').toggleClass('visible', $(this).scrollTop() > 400);
  });
 
  $('#mobile-toggle').on('click', function () {
    $('#mobile-menu').toggleClass('open');
    const isOpen = $('#mobile-menu').hasClass('open');
    $('#hamburger-icon').toggleClass('fa-bars', !isOpen).toggleClass('fa-times', isOpen);
  });
 
  $('#scroll-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });
 
  // Search overlay
  $('#search-toggle').on('click', function () {
    $('#search-overlay').addClass('open');
    setTimeout(() => $('#search-input').focus(), 200);
  });
  $('#search-close, #search-overlay').on('click', function (e) {
    if ($(e.target).is('#search-overlay') || $(e.target).is('#search-close') || $(e.target).closest('#search-close').length) {
      $('#search-overlay').removeClass('open');
    }
  });
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('#search-overlay').removeClass('open');
      $('#book-modal').removeClass('open');
    }
  });
 
  // Global search
  $('#search-input').on('input', function () {
    const q = $(this).val().trim().toLowerCase();
    if (q.length < 2) { $('#search-results').empty(); return; }
    const newMatches  = BOOKS_DATA.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    ).slice(0, 4);
    const usedMatches = USED_BOOKS_DATA.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
    ).slice(0, 2);
    const matches = [...newMatches, ...usedMatches];
    if (matches.length === 0) {
      $('#search-results').html('<p class="text-gray-400 text-center py-4">No books found.</p>');
      return;
    }
    $('#search-results').html(matches.map(b => {
      const isUsed = b.id >= 100;
      return `
        <a href="books.html" class="search-result-item flex items-center gap-3 p-3 rounded-xl
             hover:bg-white hover:bg-opacity-10 transition-colors cursor-pointer open-modal-btn"
             data-id="${b.id}" data-used="${isUsed}">
          <div class="${b.coverClass} w-10 h-14 rounded-lg flex items-center justify-center
               flex-shrink-0 text-white text-lg">${b.emoji}</div>
          <div>
            <p class="text-white font-semibold text-sm">${b.title}</p>
            <p class="text-gray-400 text-xs">${b.author} · ${b.category}${isUsed ? ' · <span class="text-amber-400">Used</span>' : ''}</p>
            <p class="text-indigo-300 text-xs font-bold">${formatPrice(b.price)}</p>
          </div>
        </a>`;
    }).join(''));
  });
 
  // Book modal open
  $(document).on('click', '.book-card:not(.used-book-card)', function () {
    const id = parseInt($(this).data('id'));
    if (id) openBookModal(id);
  });
  $(document).on('click', '.used-book-card', function () {
    const id = parseInt($(this).data('used-id'));
    if (id) openUsedBookModal(id);
  });
 
  $(document).on('click', '.open-modal-btn', function (e) {
    e.preventDefault();
    const id     = parseInt($(this).data('id'));
    const isUsed = $(this).data('used') === true || $(this).data('used') === 'true';
    $('#search-overlay').removeClass('open');
    if (isUsed) openUsedBookModal(id);
    else         openBookModal(id);
  });
 
  $('#modal-close, #book-modal').on('click', function (e) {
    if ($(e.target).is('#book-modal') || $(e.target).is('#modal-close') || $(e.target).closest('#modal-close').length) {
      $('#book-modal').removeClass('open');
    }
  });
 
  // Add new book to cart
  $(document).on('click', '.add-to-cart-btn', function (e) {
    e.stopPropagation();
    const id   = parseInt($(this).data('id'));
    const book = BOOKS_DATA.find(b => b.id === id);
    if (!book) return;
    Cart.add(id, 1, false);
    showToast(`<strong>${book.title}</strong> added to cart!`, 'cart');
    animateCartBtn($(this));
  });
 
  // Add used book to cart
  $(document).on('click', '.add-used-to-cart-btn', function (e) {
    e.stopPropagation();
    const id   = parseInt($(this).data('id'));
    const book = USED_BOOKS_DATA.find(b => b.id === id);
    if (!book) return;
    Cart.add(id, 1, true);
    showToast(`<strong>${book.title}</strong> (used copy) added to cart!`, 'cart');
    animateCartBtn($(this), true);
  });
 
  function animateCartBtn($btn, isUsed = false) {
    const origColor = isUsed ? 'bg-amber-500' : 'bg-sky-600';
    $btn.html('<i class="fas fa-check mr-1"></i>Added').addClass('bg-green-500').removeClass(origColor);
    setTimeout(() => {
      $btn.html('<i class="fas fa-cart-plus mr-1"></i>Add').removeClass('bg-green-500').addClass(origColor);
    }, 1500);
  }
 
  // Wishlist toggle
  $(document).on('click', '.wishlist-btn', function (e) {
    e.stopPropagation();
    const id    = parseInt($(this).data('id'));
    const added = Cart.toggleWishlist(id);
    $(this).toggleClass('active', added);
    $(this).find('i').toggleClass('fas', added).toggleClass('far', !added);
    showToast(added ? 'Added to wishlist ❤️' : 'Removed from wishlist', added ? 'info' : 'error', 2000);
  });
});
 
// ─── Open New Book Modal ───────────────────────────────────
function openBookModal(id) {
  const book = BOOKS_DATA.find(b => b.id === id);
  if (!book) return;
  const discount = book.originalPrice ? Math.round((1 - book.price / book.originalPrice) * 100) : 0;
 
  $('#modal-body').html(`
    <div class="flex flex-col md:flex-row gap-6 p-6">
      <div class="flex-shrink-0 mx-auto md:mx-0">
        <div class="${book.coverClass} w-44 h-64 md:w-52 md:h-72 rounded-xl flex flex-col
             items-center justify-center text-white text-center p-4 shadow-xl"
             style="border-radius:6px 14px 14px 6px;">
          <span class="text-6xl mb-3">${book.emoji}</span>
          <p class="font-serif font-bold text-sm leading-tight">${book.title}</p>
          <p class="text-xs opacity-70 mt-1">${book.author}</p>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex items-start justify-between gap-2">
          <div>
            <span class="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${getBadgeClass(book.badge)}">${book.badge}</span>
            <h2 class="font-serif font-bold text-2xl text-gray-900">${book.title}</h2>
            <p class="text-gray-500 text-sm mt-1">by <span class="text-sky-600 font-semibold">${book.author}</span></p>
          </div>
        </div>
        <div class="flex items-center gap-2 mt-3">
          <div class="flex">${renderStars(book.rating)}</div>
          <span class="text-sm font-semibold text-gray-700">${book.rating}</span>
          <span class="text-gray-400 text-sm">(${book.reviews.toLocaleString()} reviews)</span>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed mt-4">${book.description}</p>
        <div class="grid grid-cols-2 gap-3 mt-4">
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-400 uppercase tracking-wide font-semibold">Category</p>
            <p class="text-sm font-semibold text-gray-800 mt-0.5">${book.category}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-400 uppercase tracking-wide font-semibold">Pages</p>
            <p class="text-sm font-semibold text-gray-800 mt-0.5">${book.pages}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-400 uppercase tracking-wide font-semibold">Publisher</p>
            <p class="text-sm font-semibold text-gray-800 mt-0.5">${book.publisher}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3">
            <p class="text-xs text-gray-400 uppercase tracking-wide font-semibold">Year</p>
            <p class="text-sm font-semibold text-gray-800 mt-0.5">${book.year}</p>
          </div>
        </div>
        <div class="flex items-center justify-between mt-5 flex-wrap gap-3">
          <div>
            <span class="text-2xl font-bold text-sky-600">${formatPrice(book.price)}</span>
            ${book.originalPrice ? `<span class="text-gray-400 line-through text-sm ml-2">${formatPrice(book.originalPrice)}</span>` : ''}
            ${discount > 0 ? `<span class="ml-2 bg-sky-100 text-sky-700 text-xs font-bold px-2 py-0.5 rounded-full">-${discount}% OFF</span>` : ''}
          </div>
          <div class="flex gap-2">
            <button class="wishlist-btn ${Cart.isWishlisted(book.id) ? 'active text-sky-500' : 'text-gray-400'}
                     border border-gray-200 rounded-xl px-4 py-2.5 hover:border-sky-300 transition-colors"
                     data-id="${book.id}">
              <i class="${Cart.isWishlisted(book.id) ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <button class="btn-add-cart add-to-cart-btn bg-sky-600 hover:bg-sky-700 text-white
                     font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm"
                     data-id="${book.id}">
              <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `);
  $('#book-modal').addClass('open');
}
 
// ─── Open Used Book Modal ──────────────────────────────────
function openUsedBookModal(id) {
  const book = USED_BOOKS_DATA.find(b => b.id === id);
  if (!book) return;
  const c       = getConditionColor(book.condition);
  const saving  = book.originalPrice - book.price;
  const savePct = Math.round((saving / book.originalPrice) * 100);
 
  $('#modal-body').html(`
    <div class="flex flex-col md:flex-row gap-6 p-6">
      <div class="flex-shrink-0 mx-auto md:mx-0">
        <div class="${book.coverClass} w-44 h-64 md:w-52 md:h-72 rounded-xl flex flex-col
             items-center justify-center text-white text-center p-4 shadow-xl"
             style="border-radius:6px 14px 14px 6px;">
          <span class="text-6xl mb-3">${book.emoji}</span>
          <p class="font-serif font-bold text-sm leading-tight">${book.title}</p>
          <p class="text-xs opacity-70 mt-1">${book.author}</p>
        </div>
        <div class="mt-3 text-center">
          <span class="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-300">
            <i class="fas fa-recycle mr-1"></i> Pre-owned Copy
          </span>
        </div>
      </div>
      <div class="flex-1">
        <span class="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 bg-amber-100 text-amber-700">Used Book</span>
        <h2 class="font-serif font-bold text-2xl text-gray-900">${book.title}</h2>
        <p class="text-gray-500 text-sm mt-1">by <span class="text-amber-600 font-semibold">${book.author}</span></p>
        <div class="flex items-center gap-2 mt-3">
          <div class="flex">${renderStars(book.rating)}</div>
          <span class="text-sm font-semibold text-gray-700">${book.rating}</span>
          <span class="text-gray-400 text-sm">(${book.reviews.toLocaleString()} reviews for this title)</span>
        </div>
        <div class="mt-4 ${c.bg} border border-opacity-50 rounded-2xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-3 h-3 rounded-full ${c.dot}"></span>
            <p class="font-bold ${c.text} text-sm">Condition: ${book.condition}</p>
          </div>
          <p class="text-gray-600 text-sm">${book.conditionNote}</p>
        </div>
        <div class="mt-4 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
          <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <i class="fas fa-piggy-bank text-white"></i>
          </div>
          <div>
            <p class="font-bold text-green-800 text-sm">You save ${formatPrice(saving)} (${savePct}% off new price)</p>
            <p class="text-green-600 text-xs">New copy retails at ${formatPrice(book.originalPrice)}</p>
          </div>
        </div>
        <div class="flex items-center justify-between mt-5 flex-wrap gap-3">
          <div>
            <span class="text-2xl font-bold text-amber-600">${formatPrice(book.price)}</span>
            <span class="text-gray-400 line-through text-sm ml-2">${formatPrice(book.originalPrice)}</span>
          </div>
          <button class="btn-add-cart add-used-to-cart-btn bg-amber-500 hover:bg-amber-600 text-white
                   font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm"
                   data-id="${book.id}">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `);
  $('#book-modal').addClass('open');
}