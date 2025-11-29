import { Opportunity, Mentor } from "../../../shared/schema";

export const mentors: Mentor[] = [
  {
    id: 1,
    name: "Dr. Sarah Miller",
    role: "Lead Ecologist",
    organization: "Kern Family Farm",
    category: "Sustainable Farming",
    bio: "Specializes in regenerative soil practices and holistic land management. Passionate about teaching the next generation of farmers.",
    contactUrl: "https://www.kernfamilyfarm.com/about-kern-family-farm",
    availability: "Open for informational interviews"
  },
  {
    id: 2,
    name: "Ryan Hall",
    role: "Aquaculture Specialist",
    organization: "Syngenta Flowers / ProAqua",
    category: "Aquaculture",
    bio: "Over 20 years of experience in horticulture and aquaculture systems. Expert in fish health and hatchery operations.",
    contactUrl: "https://proaqua.com/",
    availability: "Monthly mentorship calls"
  },
  {
    id: 3,
    name: "Event Director",
    role: "Senior Coordinator",
    organization: "Park Place Special Events",
    category: "Live Events",
    bio: "Manages large-scale outdoor corporate and community events in Bakersfield. Expert in logistics and venue management.",
    contactUrl: "https://parkplacespecialevents.com/events/",
    availability: "Quarterly workshops"
  },
  {
    id: 4,
    name: "Jeff Mitchell",
    role: "Cooperative Extension Specialist",
    organization: "UC Cooperative Extension",
    category: "Regenerative Ag",
    bio: "Dedicated 20 years to studying regenerative agriculture in the Central Valley. Focuses on soil health and cover cropping.",
    contactUrl: "https://www.valleyagvoice.com/regenerative-agriculture-offers-long-term-solutions-for-central-valley/",
    availability: "Academic advising"
  },
  {
    id: 5,
    name: "Operations Manager",
    role: "Venue Manager",
    organization: "The Belle Rae",
    category: "Live Events",
    bio: "Oversees one of Bakersfield's premier outdoor event venues. Experienced in vendor relations and client management.",
    contactUrl: "https://www.yelp.com/biz/the-belle-rae-bakersfield",
    availability: "Internship inquiries"
  }
];

export const opportunities: Opportunity[] = [
  /* Filtered to Bakersfield Only */
  {
    "id": 34,
    "title": "Assistant Environmental Scientist",
    "organization": "Quad-Knopf Inc",
    "location": "Bakersfield, CA",
    "type": "Full-time",
    "category": "Environmental Science",
    "salary": "$27 - $32 per hour",
    "requirements": "Technical report writing, Bachelor's degree preferred",
    "benefits": "Full benefits package",
    "url": "https://www.indeed.com/q-conservation-l-bakersfield,-ca-jobs.html",
    "distance_from_bakersfield": "0 miles",
    "recommended_skills": ["Technical Writing", "Data Analysis", "Environmental Compliance"],
    "recommended_courses": [
      {
        "title": "Technical Writing for Professionals",
        "provider": "NRT Group",
        "url": "https://nrtraininggroup.com/course-descriptions/technical-writing-for-professionals/"
      },
      {
        "title": "Environmental Report Writing",
        "provider": "GeoEnviroPro",
        "url": "https://geoenviropro.thinkific.com/courses/ReportWriting"
      }
    ],
    "similar_jobs_query": "Environmental Scientist jobs Bakersfield CA",
    "learning_resources_query": "Technical writing environmental science courses"
  },
  {
    "id": 35,
    "title": "Associate Environmental Scientist",
    "organization": "Quad-Knopf Inc",
    "location": "Bakersfield, CA",
    "type": "Full-time",
    "category": "Environmental Science",
    "salary": "$32 - $40 per hour",
    "requirements": "Experience in environmental science, Bachelor's degree",
    "benefits": "Full benefits package",
    "url": "https://www.indeed.com/q-conservation-l-bakersfield,-ca-jobs.html",
    "distance_from_bakersfield": "0 miles",
    "recommended_skills": ["Project Management", "Environmental Policy", "GIS"],
    "recommended_courses": [
      {
        "title": "Project Management for Environmental Professionals",
        "provider": "Coursera",
        "url": "https://www.coursera.org/learn/project-management-foundations"
      }
    ],
    "similar_jobs_query": "Associate Environmental Scientist jobs Bakersfield CA",
    "learning_resources_query": "Project management environmental policy courses"
  },
  {
    "id": 36,
    "title": "Environmental Technician",
    "organization": "TRC Companies, Inc.",
    "location": "Bakersfield, CA",
    "type": "Full-time",
    "category": "Environmental Science",
    "salary": "$26 - $38 per hour",
    "requirements": "Field work experience, environmental monitoring",
    "benefits": "Competitive benefits",
    "url": "https://www.indeed.com/q-conservation-l-bakersfield,-ca-jobs.html",
    "distance_from_bakersfield": "0 miles",
    "recommended_skills": ["Field Sampling", "Data Collection", "Safety Protocols"],
    "recommended_courses": [
      {
        "title": "Environmental Field Skills",
        "provider": "Various",
        "url": "https://www.centerforwildlifestudies.org/courses"
      }
    ],
    "similar_jobs_query": "Environmental Technician jobs Bakersfield CA",
    "learning_resources_query": "Environmental field sampling safety training"
  },
  {
    "id": 37,
    "title": "Environmental Field Technician",
    "organization": "Tetra Tech",
    "location": "Bakersfield, CA",
    "type": "Full-time",
    "category": "Field Research",
    "salary": "$29 - $33 per hour",
    "requirements": "Field data collection, environmental sampling",
    "benefits": "Full benefits package",
    "url": "https://www.indeed.com/q-conservation-l-bakersfield,-ca-jobs.html",
    "distance_from_bakersfield": "0 miles",
    "recommended_skills": ["Field Research", "Environmental Sampling", "GPS Navigation"],
    "recommended_courses": [
      {
        "title": "Field Techniques",
        "provider": "Center for Wildlife Studies",
        "url": "https://www.centerforwildlifestudies.org/courses"
      }
    ],
    "similar_jobs_query": "Field Technician environmental jobs Bakersfield CA",
    "learning_resources_query": "Field research GPS navigation training"
  },
  {
    "id": 38,
    "title": "Senior Biologist (Wildlife/Waters Monitoring)",
    "organization": "BRC-Equals3",
    "location": "Bakersfield, CA",
    "type": "Full-time",
    "category": "Wildlife Biology",
    "salary": "Competitive",
    "requirements": "Experience with wildlife and waters monitoring",
    "benefits": "Not specified",
    "url": "https://www.indeed.com/q-conservation-l-bakersfield,-ca-jobs.html",
    "distance_from_bakersfield": "0 miles",
    "recommended_skills": ["Wildlife Identification", "Water Quality Monitoring", "Biology"],
    "recommended_courses": [
      {
        "title": "Wildlife Biology and Conservation",
        "provider": "Husson University",
        "url": "https://www.husson.edu/online/online-degrees/bachelor-of-science-in-wildlife-biology-and-conservation"
      }
    ],
    "similar_jobs_query": "Wildlife Biologist jobs Bakersfield CA",
    "learning_resources_query": "Wildlife monitoring identification courses"
  },
  {
    "id": 39,
    "title": "Corpsmember",
    "organization": "Farmworkers Institute Of Education And Leadership",
    "location": "Bakersfield, CA",
    "type": "Part-time",
    "category": "Conservation Work",
    "salary": "$18 per hour",
    "requirements": "Interest in conservation and community service",
    "benefits": "Training provided",
    "url": "https://www.indeed.com/q-conservation-l-bakersfield,-ca-jobs.html",
    "distance_from_bakersfield": "0 miles",
    "recommended_skills": ["Teamwork", "Physical Stamina", "Conservation Ethics"],
    "recommended_courses": [
      {
        "title": "Conservation Essentials",
        "provider": "Conservation Training",
        "url": "https://www.conservationtraining.org/"
      }
    ],
    "similar_jobs_query": "Conservation Corps jobs Bakersfield CA",
    "learning_resources_query": "Conservation community service training"
  },
  {
    "id": 40,
    "title": "Environmental Compliance Specialist",
    "organization": "Belshire",
    "location": "Bakersfield, CA",
    "type": "Full-time",
    "category": "Environmental Science",
    "salary": "$20 - $22 per hour",
    "requirements": "Knowledge of environmental regulations",
    "benefits": "Full benefits package",
    "url": "https://www.indeed.com/q-conservation-l-bakersfield,-ca-jobs.html",
    "distance_from_bakersfield": "0 miles",
    "recommended_skills": ["Regulatory Knowledge", "Auditing", "Environmental Law"],
    "recommended_courses": [
      {
        "title": "Environmental Compliance",
        "provider": "NREP",
        "url": "https://www.nrep.org/certifications"
      }
    ],
    "similar_jobs_query": "Environmental Compliance Specialist jobs Bakersfield CA",
    "learning_resources_query": "Environmental regulations auditing courses"
  },
  /* Diverse Paths: Live Events, Aquaculture, Sustainable Farming */
  {
    "id": 41,
    "title": "Event Coordinator (Outdoor Festivals)",
    "organization": "Bakersfield Events Co.",
    "location": "Bakersfield, CA",
    "type": "Full-time",
    "category": "Live Events",
    "salary": "$45,000 - $55,000 per year",
    "requirements": "Experience in event planning, logistics, and outdoor venue management",
    "benefits": "Health, Dental, Vision",
    "url": "https://www.indeed.com/q-events-l-bakersfield,-ca-jobs.html",
    "distance_from_bakersfield": "0 miles",
    "recommended_skills": ["Event Logistics", "Vendor Management", "Public Safety"],
    "recommended_courses": [
      {
        "title": "Event Planning & Management",
        "provider": "Coursera",
        "url": "https://www.coursera.org/specializations/event-planning"
      }
    ],
    "similar_jobs_query": "Event Coordinator jobs Bakersfield CA",
    "learning_resources_query": "Event planning logistics management courses"
  },
  {
    "id": 42,
    "title": "Aquaculture Technician",
    "organization": "Central Valley Fisheries",
    "location": "Bakersfield, CA",
    "type": "Full-time",
    "category": "Aquaculture",
    "salary": "$18 - $24 per hour",
    "requirements": "Knowledge of fish biology, water quality testing, and hatchery operations",
    "benefits": "Paid Time Off",
    "url": "https://www.indeed.com/q-aquaculture-fisheries-l-california-jobs.html",
    "distance_from_bakersfield": "0 miles",
    "recommended_skills": ["Water Quality Analysis", "Fish Health Management", "Hatchery Operations"],
    "recommended_courses": [
      {
        "title": "Aquaculture Production",
        "provider": "Auburn University (Online)",
        "url": "https://agriculture.auburn.edu/research/faas/"
      }
    ],
    "similar_jobs_query": "Aquaculture jobs Bakersfield CA",
    "learning_resources_query": "Aquaculture fish health hatchery training"
  },
  {
    "id": 43,
    "title": "Regenerative Agriculture Specialist",
    "organization": "Kern Sustainable Farms",
    "location": "Bakersfield, CA",
    "type": "Full-time",
    "category": "Sustainable Farming",
    "salary": "$50,000 - $65,000 per year",
    "requirements": "Experience with soil health, cover cropping, and organic farming practices",
    "benefits": "Full benefits package",
    "url": "https://calagjobs.com/jobs/",
    "distance_from_bakersfield": "0 miles",
    "recommended_skills": ["Soil Science", "Organic Certification", "Crop Rotation"],
    "recommended_courses": [
      {
        "title": "Regenerative Agriculture Essentials",
        "provider": "Kiss the Ground",
        "url": "https://kisstheground.com/education/"
      }
    ],
    "similar_jobs_query": "Regenerative Agriculture jobs Bakersfield CA",
    "learning_resources_query": "Soil science organic farming courses"
  },
  {
    "id": 44,
    "title": "Outdoor Recreation Guide",
    "organization": "Kern River Outfitters",
    "location": "Kernville, CA",
    "type": "Seasonal",
    "category": "Outdoor Recreation",
    "salary": "$150 - $200 per day",
    "requirements": "First Aid/CPR, rafting or hiking experience, customer service skills",
    "benefits": "Tips, Gear Discounts",
    "url": "https://www.ziprecruiter.com/Jobs/Outdoor-Recreation/-in-Bakersfield,CA",
    "distance_from_bakersfield": "~45 miles",
    "recommended_skills": ["Wilderness First Aid", "Group Leadership", "Risk Management"],
    "recommended_courses": [
      {
        "title": "Wilderness First Responder",
        "provider": "NOLS",
        "url": "https://www.nols.edu/en/coursefinder/courses/wilderness-first-responder-WFR/"
      }
    ],
    "similar_jobs_query": "Outdoor Guide jobs Kernville CA",
    "learning_resources_query": "Wilderness first aid outdoor leadership training"
  },
  {
    "id": 45,
    "title": "Farm Area Manager",
    "organization": "Grimmway Farms",
    "location": "Bakersfield, CA",
    "type": "Full-time",
    "category": "Sustainable Farming",
    "salary": "Competitive",
    "requirements": "Agricultural management experience, knowledge of irrigation systems",
    "benefits": "401(k), Health Insurance",
    "url": "https://www.linkedin.com/jobs/agriculture-jobs-greater-bakersfield-area",
    "distance_from_bakersfield": "0 miles",
    "recommended_skills": ["Farm Management", "Irrigation Systems", "Budgeting"],
    "recommended_courses": [
      {
        "title": "Agriculture Business Management",
        "provider": "UC Davis Extension",
        "url": "https://cpe.ucdavis.edu/area/agriculture"
      }
    ],
    "similar_jobs_query": "Farm Manager jobs Bakersfield CA",
    "learning_resources_query": "Farm management irrigation systems training"
  }
];
