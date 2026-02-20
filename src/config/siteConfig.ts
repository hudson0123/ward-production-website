export const siteConfig = {
  global: {
    name: "Ward Creatives",
    location: "Athens, Georgia",
    logo: "/bulldogs-logo.png",
    logoAlt: "Georgia Bulldogs",
  },
  
  hero: {
    tagline: "Real Estate Photography & Videography",
    titlePrimary: "Built to be seen.",
    titleSecondary: "Shot to be remembered.",
    description: "Strong ideas demand strong execution. Our work is built on precision, discipline, and clarity — every frame, intentional.",
    videoSrc: "/placeholder.mp4",
  },
  
  about: {
    tagline: "The Creator",
    titlePrimary: "Keegan",
    titleSecondary: "Ward",
    subtitle: "Photographer / Videographer / Editor",
    bio: "Born and raised in Athens, Georgia, Keegan has spent over 4 years perfecting the art of real estate production. His approach is defined by precision, discipline, and a deep understanding of how spaces communicate through a lens. It's more than snapping a photo; it's about creating a feeling that people can connect with.",
    imageSrc: "/keegan.png",
    imageAlt: "Keegan Ward",
  },
  
  portfolio: {
    tagline: "Portfolio",
    titlePrimary: "Visual",
    titleSecondary: "Storytelling",
    description: "Capturing spaces with architectural precision and cinematic clarity. Every frame is a studied composition.",
    photographyTitle: "Real Estate Photography",
    filmsTitle: "Real Estate Films",
    reelsTitle: "Social Media Reels",
    
    photography: [
      { id: 1,  src: "/horizontal-images/DJI_20260217162409_0049_D.JPG", alt: "Aerial Shot 1" },
      { id: 2,  src: "/horizontal-images/DJI_20260217162515_0058_D.JPG", alt: "Aerial Shot 2" },
      { id: 3,  src: "/horizontal-images/DJI_20260217182621_0144_D.JPG", alt: "Aerial Shot 3" },
      { id: 4,  src: "/horizontal-images/DJI_20260217182922_0161_D.JPG", alt: "Aerial Shot 4" },
      { id: 5,  src: "/horizontal-images/DJI_20260217182958_0164_D.JPG", alt: "Aerial Shot 5", onlyPortfolio: true },
      { id: 6,  src: "/horizontal-images/DJI_20260217183106_0165_D.JPG", alt: "Aerial Shot 6", onlyPortfolio: true },
      { id: 7,  src: "/horizontal-images/DSC00364.JPG",                  alt: "Photo 1" },
      { id: 8,  src: "/horizontal-images/DSC00373.JPG",                  alt: "Photo 2" },
      { id: 9,  src: "/horizontal-images/DSC00390 copy.JPG",             alt: "Photo 3" },
      { id: 10, src: "/horizontal-images/DSC00397.JPG",                  alt: "Photo 4" },
      { id: 11, src: "/horizontal-images/DSC00412.JPG",                  alt: "Photo 5" },
      { id: 12, src: "/horizontal-images/DSC00415.JPG",                  alt: "Photo 6" },
      { id: 13, src: "/horizontal-images/DSC00420.JPG",                  alt: "Photo 7" },
      { id: 14, src: "/horizontal-images/DSC00424 copy.JPG",             alt: "Photo 8" },
      { id: 15, src: "/horizontal-images/DSC00451.JPG",                  alt: "Photo 9", onlyPortfolio: true },
      { id: 16, src: "/horizontal-images/DSC00511.JPG",                  alt: "Photo 10", onlyPortfolio: true },
      { id: 17, src: "/horizontal-images/DSC00517.JPG",                  alt: "Photo 11", onlyPortfolio: true },
      { id: 18, src: "/horizontal-images/DSC00522.JPG",                  alt: "Photo 12", onlyPortfolio: true },
      { id: 19, src: "/horizontal-images/DSC00526.JPG",                  alt: "Photo 13", onlyPortfolio: true },
    ],
    
    films: [
      {
        id: 1,
        src: "/placeholder.mp4",
        title: "Modern Home Tour",
        tagline: "Drone | Cinematic Walkthrough",
        address: "123 Main St, Los Angeles, CA",
      },
      {
        id: 2,
        src: "/placeholder.mp4",
        title: "789 Ocean View Drive",
        tagline: "Architectural Cinematography",
        address: "Malibu, CA",
      },
      {
        id: 3,
        src: "/placeholder.mp4",
        title: "Experimental Loft",
        tagline: "Interior Design Feature",
        address: "New York, NY",
        onlyPortfolio: true,
      },
    ],
    
    reels: [
      { id: 1, src: "/stock-reel.mp4", title: "Modern Luxury Home Tour", views: "12.5k" },
      { id: 2, src: "/stock-reel2.mp4", title: "Waterfront Property Walkthrough", views: "9.8k" },
      { id: 3, src: "/stock-reel.mp4", title: "Inside a Luxury Mountain Estate", views: "7.2k" },
      { id: 4, src: "/stock-reel2.mp4", title: "Urban Living Feature", views: "15k", onlyPortfolio: true },
    ],
  },
  
  packages: {
    tagline: "Services",
    titlePrimary: "Tailored",
    titleSecondary: "Productions",
    description: "Professional real estate media tiers designed for maximum impact.",
    list: [
      {
        name: "Base Package",
        tagline: "Essential listing coverage",
        description: "Professional ground photography designed to showcase your property's best features. Perfect for clean, MLS-ready images that make your listing shine without extras. Delivered fully edited for web and print.",
        mediaSrc: "/horizontal-images/DSC00364.JPG",
        mediaType: "image",
      },
      {
        name: "Elevation Package",
        tagline: "Adds perspective & scale",
        description: "Ground photography plus aerial drone imagery to capture the full scope of your property. Aerials highlight location, lot size, and surroundings, creating listings that stand out in the market.",
        mediaSrc: "/horizontal-images/DSC00412.JPG",
        mediaType: "image",
      },
      {
        name: "Horizontal Video",
        tagline: "Bring the property to life",
        description: "Cinematic video coverage, including ground and drone footage, that tells a story and brings flow to your listing. Edited for MLS and online presentation, it's the perfect way to give buyers an immersive property experience.",
        mediaSrc: "/placeholder.mp4",
        mediaType: "video",
      },
      {
        name: "Signature Package",
        tagline: "Complete visual coverage",
        description: "The ultimate listing package: ground photography, drone photography, and both ground and aerial video. Fully edited and MLS-ready, ensuring every aspect of your property is presented with maximum impact.",
        featured: true,
        mediaSrc: "/placeholder.mp4",
        mediaType: "video",
      },
      {
        name: "Premium Package",
        tagline: "High-visibility marketing",
        description: "A full-scale marketing package designed to grab attention. Includes ground and drone photos, an MLS-style video tour, and two short-form vertical videos optimized for social media engagement. Perfect for listings that demand visibility and reach.",
        mediaSrc: "/placeholder.mp4",
        mediaType: "video",
      },
      {
        name: "Raw Land Package",
        tagline: "Visual clarity for land or underdeveloped properties",
        description: "Specialized coverage for land listings, focusing on scale, boundaries, and location. Includes drone photography and ground shots to define your property clearly, helping buyers see potential and value at a glance.",
        mediaSrc: "/horizontal-images/DSC00517.JPG",
        mediaType: "image",
      },
      {
        name: "Social Media Reels",
        tagline: "Show-stopping short-form video",
        description: "A cinematic 30–60 second reel crafted to capture attention instantly. Designed for social media, marketing campaigns, and high-impact listing promotion. Includes professional editing, music, and pacing optimized for maximum viewer retention.",
        mediaSrc: "/placeholder.mp4",
        mediaType: "video",
      },
    ],
    addOns: [
      "Virtual Staging",
      "Lawn Replacement",
      "On Camera Intro",
      "On Camera Intro + Highlights",
      "Property Outline",
      "Drop Pins",
      "Amenities",
      "Twilight",
      "Google Earth Satellite Imagery",
    ],
  },
  
  contact: {
    tagline: "Collaboration",
    titlePrimary: "Let's Work",
    titleSecondary: "Together",
    description: "Have a project that requires a meticulous eye for detail? We are ready to bring it to life with precision and cinematic clarity.",
    socialLinks: [
      { name: "Instagram", url: "https://instagram.com/wardcreatives" },
      { name: "Facebook", url: "https://facebook.com/wardcreatives" },
      { name: "TikTok", url: "https://tiktok.com/@wardcreatives" },
    ],
    emailJS: {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_b5upqw8',
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_sw03weo',
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'MPZF1URUHxxJW4bJf',
    }
  },
  
  seo: {
    defaultTitle: "Ward Creatives | Real Estate Photography & Videography in Athens, GA",
    titleTemplate: "%s | Ward Creatives",
    defaultDescription: "Premium architectural photography, cinematic property films, and high-impact social reels for real estate in Athens, GA and surrounding areas. Precision in every frame.",
    baseUrl: "https://ward-creatives.com",
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://ward-creatives.com',
      site_name: 'Ward Creatives',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Ward Creatives Real Estate Media',
        },
      ],
    },
    twitter: {
      handle: '@wardcreatives',
      site: '@wardcreatives',
      cardType: 'summary_large_image',
    },
    keywords: [
      "Real Estate Photography Athens GA",
      "Real Estate Videography Georgia",
      "Architectural Photography",
      "Property Films",
      "Real Estate Reels",
      "Athens Georgia Photographer",
    ],
  },
  
  footer: {
    copyright: `© ${new Date().getFullYear()} Ward Creatives. All rights reserved.`,
  }
};
