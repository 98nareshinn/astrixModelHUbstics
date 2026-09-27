export type Lang = "hi" | "en";

export const strings = {
  brand: { hi: "भूमि साथी", en: "Bhoomi Saathi" },
  tagline: { hi: "आपका घर | आपकी ज़मीन | आपका साथी", en: "Your home | Your land | Your companion" },
  taglineShort: { hi: "बिलाड़ा से राजस्थान तक", en: "Beawar to all of Rajasthan" },

  nav: {
    home: { hi: "होम", en: "Home" },
    properties: { hi: "प्रॉपर्टी", en: "Properties" },
    maps: { hi: "नक्शे", en: "Maps" },
    services: { hi: "होम सर्विसेज़", en: "Home Services" },
    news: { hi: "न्यूज़", en: "News" },
    login: { hi: "लॉगिन", en: "Login" },
    dashboard: { hi: "डैशबोर्ड", en: "Dashboard" },
    postProperty: { hi: "प्रॉपर्टी डालें", en: "Post Property" },
    logout: { hi: "लॉगआउट", en: "Logout" },
  },

  home: {
    heroEyebrow: { hi: "बिलाड़ा, राजस्थान", en: "Beawar, Rajasthan" },
    heroTitle: { hi: "अपनी ज़मीन, अपना घर — अपने ही शहर में", en: "Your land, your home — right here in your city" },
    heroSubtitle: {
      hi: "बिलाड़ा और आसपास के इलाकों की प्रॉपर्टी, नक्शे, न्यूज़ और घर से जुड़ी सर्विसेज़ — सब एक जगह",
      en: "Properties, maps, news and home services across Beawar and nearby areas — all in one place",
    },
    searchPlaceholder: { hi: "कॉलोनी, खसरा नंबर या इलाका खोजें...", en: "Search colony, khasra number or area..." },
    searchBtn: { hi: "खोजें", en: "Search" },
    postCta: { hi: "अपनी प्रॉपर्टी डालें", en: "Post your property" },
    mapCta: { hi: "नक्शा देखें", en: "View map" },
    quickLinks: { hi: "जल्दी पहुँचें", en: "Quick access" },
    latestProperties: { hi: "नई प्रॉपर्टी", en: "Latest Properties" },
    viewAll: { hi: "सभी देखें", en: "View all" },
    whyUs: { hi: "भूमि साथी क्यों?", en: "Why Bhoomi Saathi?" },
    localNews: { hi: "बिलाड़ा न्यूज़", en: "Beawar News" },
    howItWorks: { hi: "यह कैसे काम करता है", en: "How it works" },
    servicesTeaser: { hi: "घर से जुड़ी हर मदद, एक कॉल पर", en: "Every home service, one call away" },
  },

  whyCards: [
    { title: { hi: "खसरा नंबर से पहचान", en: "Verified by Khasra number" }, body: { hi: "हर ज़मीन और प्रॉपर्टी की जानकारी खसरा नंबर के साथ — कोई भ्रम नहीं", en: "Every plot and property carries its khasra number — no confusion" } },
    { title: { hi: "स्थानीय टीम, स्थानीय भरोसा", en: "Local team, local trust" }, body: { hi: "बिलाड़ा की टीम खुद हर लिस्टिंग को जाँचती है", en: "Our Beawar team personally reviews every listing" } },
    { title: { hi: "सीधी बातचीत", en: "Direct contact" }, body: { hi: "बिचौलिए नहीं — मालिक और खरीदार की सीधी बात", en: "No middlemen — direct contact between owner and buyer" } },
  ],

  propertyTypes: {
    apartment: { hi: "अपार्टमेंट", en: "Apartment" },
    house: { hi: "मकान", en: "House" },
    villa: { hi: "विला", en: "Villa" },
    plot: { hi: "प्लॉट", en: "Plot" },
    land: { hi: "कृषि भूमि", en: "Agricultural Land" },
    shop: { hi: "दुकान", en: "Shop" },
    office: { hi: "ऑफिस", en: "Office" },
    warehouse: { hi: "गोदाम", en: "Warehouse" },
  },

  listingTypes: {
    sale: { hi: "बिक्री", en: "Sale" },
    rent: { hi: "किराया", en: "Rent" },
    lease: { hi: "लीज़", en: "Lease" },
  },

  property: {
    khasra: { hi: "खसरा नंबर", en: "Khasra No." },
    propertyNo: { hi: "प्रॉपर्टी नंबर", en: "Property No." },
    size: { hi: "साइज़", en: "Size" },
    facing: { hi: "मुख", en: "Facing" },
    roadWidth: { hi: "सड़क चौड़ाई", en: "Road Width" },
    landType: { hi: "भूमि प्रकार", en: "Land Type" },
    price: { hi: "कीमत", en: "Price" },
    location: { hi: "स्थान", en: "Location" },
    verified: { hi: "सत्यापित", en: "Verified" },
    pending: { hi: "समीक्षा में", en: "Pending Review" },
    contactOwner: { hi: "संपर्क करें", en: "Contact" },
    call: { hi: "कॉल करें", en: "Call" },
    whatsapp: { hi: "व्हाट्सऐप", en: "WhatsApp" },
    share: { hi: "शेयर करें", en: "Share" },
    scheduleVisit: { hi: "विज़िट शेड्यूल करें", en: "Schedule Visit" },
    sendEnquiry: { hi: "पूछताछ भेजें", en: "Send Enquiry" },
    description: { hi: "विवरण", en: "Description" },
    amenities: { hi: "सुविधाएँ", en: "Amenities" },
    comments: { hi: "टिप्पणियाँ", en: "Comments" },
    postedBy: { hi: "पोस्ट किया", en: "Posted by" },
  },

  filters: {
    title: { hi: "फ़िल्टर", en: "Filters" },
    budget: { hi: "बजट", en: "Budget" },
    propertyType: { hi: "प्रॉपर्टी प्रकार", en: "Property Type" },
    listingType: { hi: "लिस्टिंग प्रकार", en: "Listing Type" },
    bedrooms: { hi: "बेडरूम", en: "Bedrooms" },
    area: { hi: "इलाका", en: "Area" },
    apply: { hi: "लागू करें", en: "Apply" },
    clear: { hi: "साफ़ करें", en: "Clear" },
    verifiedOnly: { hi: "केवल सत्यापित", en: "Verified only" },
  },

  services: {
    title: { hi: "घर से जुड़ी सर्विसेज़", en: "Home Services" },
    subtitle: { hi: "भरोसेमंद लोकल प्रोफेशनल्स, एक जगह", en: "Trusted local professionals, in one place" },
    bookNow: { hi: "बुक करें", en: "Book Now" },
    viewDetails: { hi: "विवरण देखें", en: "View Details" },
  },

  maps: {
    title: { hi: "इलाका नक्शे", en: "Area Maps" },
    subtitle: { hi: "बिलाड़ा की कॉलोनियों के विस्तृत नक्शे", en: "Detailed maps of Beawar's colonies" },
    unlock: { hi: "भुगतान करें और डाउनलोड करें", en: "Pay & Unlock" },
    price: { hi: "कीमत", en: "Price" },
    format: { hi: "फॉर्मेट", en: "Format" },
    pages: { hi: "पेज", en: "Pages" },
  },

  news: {
    title: { hi: "बिलाड़ा ज़मीन-जायदाद न्यूज़", en: "Beawar Land & Property News" },
    subtitle: { hi: "ताज़ा खबरें, आपके शहर से", en: "Latest updates, from your city" },
    readMore: { hi: "पूरा पढ़ें", en: "Read more" },
    source: { hi: "स्रोत", en: "Source" },
  },

  auth: {
    publicUser: { hi: "आम यूज़र", en: "Public User" },
    admin: { hi: "एडमिन", en: "Admin" },
    mobile: { hi: "मोबाइल नंबर", en: "Mobile Number" },
    password: { hi: "पासवर्ड", en: "Password" },
    email: { hi: "ईमेल", en: "Email" },
    loginBtn: { hi: "लॉगिन करें", en: "Log In" },
    demoNote: { hi: "डेमो एडमिन: admin@bhoomisaathi.in / admin123", en: "Demo admin: admin@bhoomisaathi.in / admin123" },
  },

  upload: {
    title: { hi: "अपनी प्रॉपर्टी डालें", en: "Post Your Property" },
    subtitle: { hi: "जानकारी भरें — हमारी टीम जल्द जाँच करेगी", en: "Fill in the details — our team reviews it shortly" },
    step1: { hi: "प्रॉपर्टी की जानकारी दें", en: "Enter property details" },
    step2: { hi: "समीक्षा में जाएगी", en: "Goes to review" },
    step3: { hi: "एडमिन अप्रूव करेगा", en: "Admin approves" },
    step4: { hi: "पब्लिक फ़ीड में दिखेगी", en: "Goes live on the feed" },
    submit: { hi: "सबमिट करें", en: "Submit" },
    title_field: { hi: "शीर्षक", en: "Title" },
  },

  approvals: {
    title: { hi: "अप्रूवल क्यू", en: "Approval Queue" },
    approve: { hi: "स्वीकृत करें", en: "Approve" },
    reject: { hi: "अस्वीकृत करें", en: "Reject" },
    noItems: { hi: "फ़िलहाल कोई पेंडिंग प्रॉपर्टी नहीं", en: "No pending properties right now" },
  },

  dashboard: {
    title: { hi: "डैशबोर्ड", en: "Dashboard" },
    published: { hi: "पब्लिश्ड", en: "Published" },
    pending: { hi: "पेंडिंग", en: "Pending" },
    enquiries: { hi: "पूछताछ", en: "Enquiries" },
    myListings: { hi: "मेरी लिस्टिंग", en: "My Listings" },
    team: { hi: "टीम", en: "Team" },
  },

  footer: {
    about: { hi: "भूमि साथी बिलाड़ा और राजस्थान के लिए एक स्थानीय प्रॉपर्टी और होम सर्विस प्लेटफ़ॉर्म है।", en: "Bhoomi Saathi is a local property and home-services platform for Beawar and Rajasthan." },
    quickLinks: { hi: "क्विक लिंक्स", en: "Quick Links" },
    contact: { hi: "संपर्क", en: "Contact" },
    rights: { hi: "सर्वाधिकार सुरक्षित", en: "All rights reserved" },
  },

  common: {
    loading: { hi: "लोड हो रहा है...", en: "Loading..." },
    seeAll: { hi: "सभी देखें", en: "See all" },
    back: { hi: "वापस", en: "Back" },
    from: { hi: "से", en: "from" },
    perMonth: { hi: "/महीना", en: "/month" },
    lac: { hi: "लाख", en: "Lac" },
    crore: { hi: "करोड़", en: "Cr" },
    sqft: { hi: "वर्ग फ़ीट", en: "sq.ft" },
  },
} as const;

export function t<K extends keyof typeof strings>(section: K) {
  return strings[section];
}
