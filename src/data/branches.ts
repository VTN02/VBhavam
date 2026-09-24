export type Branch = {
  id: string;
  label: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  area: string;
  highlights: string[];
};

export const branches: Branch[] = [
  {
    id: "branch-jaffna",
    label: "Main Restaurant",
    name: "Vishnu Bhavan — Jaffna",
    address: "No. 350, Jaffna–Kankesanturai Road, Jaffna, Sri Lanka",
    phone: "Official hotline to be added",
    hours: "6:00 AM – 10:00 PM • 7 Days a Week",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Vishnu%20Bhavan%2C%20No.%20350%2C%20Jaffna-Kankesanturai%20Road%2C%20Jaffna%2C%20Sri%20Lanka",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Vishnu%20Bhavan%2C%20No.%20350%2C%20Jaffna-Kankesanturai%20Road%2C%20Jaffna&t=&z=15&ie=UTF8&iwloc=&output=embed",
    area: "Jaffna–Kankesanturai (KKS) Road",
    highlights: [
      "100% Pure Vegetarian Kitchen",
      "Breakfast, Lunch & Evening Special Dining",
      "Dine-in, Takeaway & Heritage Savouries",
      "Centrally located on KKS Road with convenient access",
    ],
  },
];
