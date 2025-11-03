import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from '../../context/ThemeContext';

const carModelsData = {
  BMW: [
    {
      id: 'b1',
      brand: 'BMW',
      name: 'X5',
      price: '₹99.90 Lakh - ₹1.13 Crore',
      image:
        'https://images.pexels.com/photos/7154531/pexels-photo-7154531.jpeg',
      specs: {
        engine: '2998 cc',
        power: '335 bhp',
        mileage: '11.2 kmpl',
        transmission: 'Automatic',
      },
      features: [
        'Panoramic Sunroof',
        'Touchscreen Infotainment',
        '3D Surround View',
      ],
    },
    {
      id: 'b2',
      brand: 'BMW',
      name: '3 Series',
      price: '₹72.90 Lakh',
      image:
        'https://images.pexels.com/photos/31983216/pexels-photo-31983216.jpeg',
      specs: {
        engine: '1998 cc',
        power: '255 bhp',
        mileage: '16.13 kmpl',
        transmission: 'Automatic',
      },
      features: ['Sunroof', 'Digital Cockpit', 'Wireless Charging'],
    },
    {
      id: 'b3',
      brand: 'BMW',
      name: '5 Series',
      price: '₹68.90 Lakh',
      image:
        'https://images.pexels.com/photos/16439513/pexels-photo-16439513.jpeg',
      specs: {
        engine: '1995 cc',
        power: '188 bhp',
        mileage: '20.37 kmpl',
        transmission: 'Automatic',
      },
      features: [
        'Remote Control Parking',
        'Gesture Control',
        'Ambient Lighting',
      ],
    },
    {
      id: 'b4',
      brand: 'BMW',
      name: '7 Series',
      price: '₹1.81 Crore',
      image:
        'https://images.pexels.com/photos/10689099/pexels-photo-10689099.jpeg',
      specs: {
        engine: '2998 cc',
        power: '375 bhp',
        mileage: '12.61 kmpl',
        transmission: 'Automatic',
      },
      features: ['Theatre Screen', 'Automatic Doors', 'Massager Seats'],
    },
    {
      id: 'b5',
      brand: 'BMW',
      name: 'X3',
      price: '₹72.50 Lakh',
      image:
        'https://images.pexels.com/photos/32164460/pexels-photo-32164460.jpeg',
      specs: {
        engine: '1995 cc',
        power: '188 bhp',
        mileage: '16.55 kmpl',
        transmission: 'Automatic',
      },
      features: [
        'Panoramic Sunroof',
        'Harman Kardon Sound',
        'Parking Assistant',
      ],
    },
    {
      id: 'b6',
      brand: 'BMW',
      name: 'X7',
      price: '₹1.30 Crore',
      image:
        'https://images.pexels.com/photos/10573462/pexels-photo-10573462.jpeg',
      specs: {
        engine: '2998 cc',
        power: '375 bhp',
        mileage: '11.29 kmpl',
        transmission: 'Automatic',
      },
      features: [
        'Sky Lounge Sunroof',
        'Crystal Gear Selector',
        'Three-Row Seating',
      ],
    },
    {
      id: 'b7',
      brand: 'BMW',
      name: 'M3',
      price: '₹1.30 Crore',
      image:
        'https://images.pexels.com/photos/29580176/pexels-photo-29580176.jpeg',
      specs: {
        engine: '2993 cc',
        power: '503 bhp',
        mileage: '10.13 kmpl',
        transmission: 'Automatic',
      },
      features: ['M Sport Differential', 'Carbon Fibre Roof', 'M Sport Seats'],
    },
    {
      id: 'b8',
      brand: 'BMW',
      name: 'M5',
      price: '₹1.74 Crore',
      image:
        'https://images.pexels.com/photos/17888840/pexels-photo-17888840.jpeg',
      specs: {
        engine: '4395 cc',
        power: '617 bhp',
        mileage: '9.12 kmpl',
        transmission: 'Automatic',
      },
      features: [
        'M xDrive System',
        'Carbon Ceramic Brakes',
        'M Multifunction Seats',
      ],
    },
    {
      id: 'b9',
      brand: 'BMW',
      name: 'i4',
      price: '₹72.50 Lakh',
      image: 'https://images.pexels.com/photos/951318/pexels-photo-951318.jpeg',
      specs: {
        engine: 'Electric',
        power: '335 bhp',
        mileage: '590 km range',
        transmission: 'Automatic',
      },
      features: ['Curved Display', 'Electric Powertrain', 'Sport Boost'],
    },
    {
      id: 'b10',
      brand: 'BMW',
      name: 'iX',
      price: '₹1.21 Crore',
      image: 'https://images.pexels.com/photos/100651/pexels-photo-100651.jpeg',
      specs: {
        engine: 'Electric',
        power: '322 bhp',
        mileage: '425 km range',
        transmission: 'Automatic',
      },
      features: [
        'Shy Tech',
        'Hexagonal Steering Wheel',
        'Large Curved Display',
      ],
    },
  ],
  Mercedes: [
    {
      id: 'm1',
      brand: 'Mercedes',
      name: 'C-Class',
      price: '₹61.85 Lakh',
      image:
        'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg',
      specs: {
        engine: '1496 cc',
        power: '201 bhp',
        mileage: '16.9 kmpl',
        transmission: 'Automatic',
      },
      features: [
        'Vertical Touchscreen',
        'Digital Instrument Cluster',
        'Ambient Lighting',
      ],
    },
    {
      id: 'm2',
      brand: 'Mercedes',
      name: 'E-Class',
      price: '₹76.05 Lakh',
      image: 'https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg',
      specs: {
        engine: '1991 cc',
        power: '194 bhp',
        mileage: '16.1 kmpl',
        transmission: 'Automatic',
      },
      features: [
        'Widescreen Cockpit',
        'Burmester Surround Sound',
        'Air Body Control',
      ],
    },
    {
      id: 'm3',
      brand: 'Mercedes',
      name: 'S-Class',
      price: '₹1.77 Crore',
      image: 'https://images.pexels.com/photos/195636/pexels-photo-195636.jpeg',
      specs: {
        engine: '2999 cc',
        power: '362 bhp',
        mileage: '12.82 kmpl',
        transmission: 'Automatic',
      },
      features: [
        'Rear-Axle Steering',
        'MBUX High-End Rear Entertainment',
        'Digital Light',
      ],
    },
    {
      id: 'm4',
      brand: 'Mercedes',
      name: 'GLA',
      price: '₹51.75 Lakh',
      image:
        'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg',
      specs: {
        engine: '1332 cc',
        power: '161 bhp',
        mileage: '17.4 kmpl',
        transmission: 'Automatic',
      },
      features: [
        'MBUX Infotainment',
        'Panoramic Sunroof',
        'Off-Road Engineering Package',
      ],
    },
    {
      id: 'm5',
      brand: 'Mercedes',
      name: 'GLC',
      price: '₹74.45 Lakh',
      image: 'https://images.pexels.com/photos/193995/pexels-photo-193995.jpeg',
      specs: {
        engine: '1993 cc',
        power: '194 bhp',
        mileage: '14.72 kmpl',
        transmission: 'Automatic',
      },
      features: [
        'Transparent Hood',
        'Vertical Touchscreen',
        '4MATIC All-Wheel Drive',
      ],
    },
    {
      id: 'm6',
      brand: 'Mercedes',
      name: 'GLE',
      price: '₹96.40 Lakh',
      image: 'https://images.pexels.com/photos/164654/pexels-photo-164654.jpeg',
      specs: {
        engine: '1993 cc',
        power: '265 bhp',
        mileage: '13.8 kmpl',
        transmission: 'Automatic',
      },
      features: [
        'E-Active Body Control',
        'Widescreen Cockpit',
        '7-Seater Option',
      ],
    },
    {
      id: 'm7',
      brand: 'Mercedes',
      name: 'AMG GT',
      price: '₹2.71 Crore',
      image:
        'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg',
      specs: {
        engine: '3982 cc',
        power: '577 bhp',
        mileage: '8.4 kmpl',
        transmission: 'Automatic',
      },
      features: [
        'Twin-Turbo V8',
        'AMG Performance Seats',
        'Rear-Axle Steering',
      ],
    },
    {
      id: 'm8',
      brand: 'Mercedes',
      name: 'EQS',
      price: '₹1.62 Crore',
      image: 'https://images.pexels.com/photos/205740/pexels-photo-205740.jpeg',
      specs: {
        engine: 'Electric',
        power: '516 bhp',
        mileage: '857 km range',
        transmission: 'Automatic',
      },
      features: [
        'MBUX Hyperscreen',
        'All-Electric Powertrain',
        'Futuristic Interior',
      ],
    },
    {
      id: 'm9',
      brand: 'Mercedes',
      name: 'CLA',
      price: '₹42.00 Lakh',
      image: 'https://images.pexels.com/photos/132774/pexels-photo-132774.jpeg',
      specs: {
        engine: '2143 cc',
        power: '134 bhp',
        mileage: '17.9 kmpl',
        transmission: 'Automatic',
      },
      features: ['Coupe-like Design', 'Frameless Doors', 'MBUX System'],
    },
    {
      id: 'm10',
      brand: 'Mercedes',
      name: 'G-Class',
      price: '₹2.55 Crore',
      image:
        'https://images.pexels.com/photos/8622817/pexels-photo-8622817.jpeg',
      specs: {
        engine: '2925 cc',
        power: '326 bhp',
        mileage: '9.35 kmpl',
        transmission: 'Automatic',
      },
      features: [
        'Iconic Boxy Design',
        'Three Locking Differentials',
        'Luxury Interior',
      ],
      description:
        'The Mercedes-Benz G-Class is a legendary off-road luxury SUV, combining rugged capability with ultimate refinement.',
    },
  ],
  Audi: [
    {
      id: '1',
      name: 'A4',
      image:
        'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/a4/my2023/1920x1080-gal-2-AA4_191002_1.jpg',
    },
    {
      id: '2',
      name: 'A6',
      image:
        'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/a6/my2023/1920x1080-gal-2-AA6_191002_1.jpg',
    },
    {
      id: '3',
      name: 'Q5',
      image:
        'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/q5/my2023/1920x1080-gal-2-AQ5_191002_1.jpg',
    },
    {
      id: '4',
      name: 'Q7',
      image:
        'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/q7/my2023/1920x1080-gal-2-AQ7_191002_1.jpg',
    },
    {
      id: '5',
      name: 'e-tron',
      image:
        'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/e-tron/my2023/1920x1080-gal-2-AET_191002_1.jpg',
    },
    {
      id: '6',
      name: 'RS6 Avant',
      image:
        'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/rs6-avant/my2023/1920x1080-gal-2-ARS6_191002_1.jpg',
    },
    {
      id: '7',
      name: 'TT',
      image:
        'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/tt/my2023/1920x1080-gal-2-ATT_191002_1.jpg',
    },
    {
      id: '8',
      name: 'R8',
      image:
        'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/r8/my2023/1920x1080-gal-2-AR8_191002_1.jpg',
    },
    {
      id: '9',
      name: 'A8',
      image:
        'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/a8/my2023/1920x1080-gal-2-AA8_191002_1.jpg',
    },
    {
      id: '10',
      name: 'Q3',
      image:
        'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/q3/my2023/1920x1080-gal-2-AQ3_191002_1.jpg',
    },
  ],

  Toyota: [
    {
      id: '1',
      name: 'Camry',
      image:
        'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2023/camry/xse/2548/2pt/36/1.png',
    },
    {
      id: '2',
      name: 'Corolla',
      image:
        'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2023/corolla/xse/1852/2pt/40/1.png',
    },
    {
      id: '3',
      name: 'RAV4',
      image:
        'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2023/rav4/xse/4477/2pt/1g3/1.png',
    },
    {
      id: '4',
      name: 'Highlander',
      image:
        'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2023/highlander/platinum/6966/2pt/1g3/1.png',
    },
    {
      id: '5',
      name: 'Prius',
      image:
        'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2023/prius/limited/1236/2pt/218/1.png',
    },
    {
      id: '6',
      name: 'Tacoma',
      image:
        'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2023/tacoma/trdpro/7544/2pt/3r3/1.png',
    },
    {
      id: '7',
      name: 'Tundra',
      image:
        'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2023/tundra/1794edition/5657/2pt/3t3/1.png',
    },
    {
      id: '8',
      name: 'Sienna',
      image:
        'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2023/sienna/platinum/5356/2pt/1j9/1.png',
    },
    {
      id: '9',
      name: 'Supra',
      image:
        'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2023/supra/30premium/4382/2pt/d90/1.png',
    },
    {
      id: '10',
      name: 'bZ4X',
      image:
        'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2023/bz4x/limited/3766/2pt/2mq/1.png',
    },
  ],
  Honda: [
    {
      id: '1',
      name: 'Civic',
      image:
        'https://www.honda.com/-/media/honda-automobiles/vehicles/2023/civic-sedan/gallery/exterior/01-civic-sedan-sport-gallery.jpg',
    },
    {
      id: '2',
      name: 'Accord',
      image:
        'https://www.honda.com/-/media/honda-automobiles/vehicles/2023/accord/gallery/exterior/01-accord-sport-gallery.jpg',
    },
    {
      id: '3',
      name: 'CR-V',
      image:
        'https://www.honda.com/-/media/honda-automobiles/vehicles/2023/cr-v/gallery/exterior/01-cr-v-sport-gallery.jpg',
    },
    {
      id: '4',
      name: 'Pilot',
      image:
        'https://www.honda.com/-/media/honda-automobiles/vehicles/2023/pilot/gallery/exterior/01-pilot-elite-gallery.jpg',
    },
    {
      id: '5',
      name: 'HR-V',
      image:
        'https://www.honda.com/-/media/honda-automobiles/vehicles/2023/hr-v/gallery/exterior/01-hr-v-sport-gallery.jpg',
    },
    {
      id: '6',
      name: 'Odyssey',
      image:
        'https://www.honda.com/-/media/honda-automobiles/vehicles/2023/odyssey/gallery/exterior/01-odyssey-elite-gallery.jpg',
    },
    {
      id: '7',
      name: 'Ridgeline',
      image:
        'https://www.honda.com/-/media/honda-automobiles/vehicles/2023/ridgeline/gallery/exterior/01-ridgeline-rtl-e-gallery.jpg',
    },
    {
      id: '8',
      name: 'Passport',
      image:
        'https://www.honda.com/-/media/honda-automobiles/vehicles/2023/passport/gallery/exterior/01-passport-trailsport-gallery.jpg',
    },
    {
      id: '9',
      name: 'Insight',
      image:
        'https://www.honda.com/-/media/honda-automobiles/vehicles/2022/insight/gallery/exterior/01-insight-touring-gallery.jpg',
    },
    {
      id: '10',
      name: 'Clarity',
      image:
        'https://www.honda.com/-/media/honda-automobiles/vehicles/2021/clarity-plug-in-hybrid/gallery/exterior/01-clarity-touring-gallery.jpg',
    },
  ],

  Ford: [
    {
      id: '1',
      name: 'F-150',
      image:
        'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/f-150/2023/collections/3-2/23_FRD_F150_LTD_32.jpg',
    },
    {
      id: '2',
      name: 'Mustang',
      image:
        'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/mustang/2023/collections/3-2/23_FRD_MST_GT_32.jpg',
    },
    {
      id: '3',
      name: 'Explorer',
      image:
        'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/explorer/2023/collections/3-2/23_FRD_EPR_PLT_32.jpg',
    },
    {
      id: '4',
      name: 'Escape',
      image:
        'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/escape/2023/collections/3-2/23_FRD_ESC_PLT_32.jpg',
    },
    {
      id: '5',
      name: 'Bronco',
      image:
        'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/bronco/2023/collections/3-2/23_FRD_BRO_WLD_32.jpg',
    },
    {
      id: '6',
      name: 'Edge',
      image:
        'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/edge/2023/collections/3-2/23_FRD_EDG_ST_32.jpg',
    },
    {
      id: '7',
      name: 'Ranger',
      image:
        'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/ranger/2023/collections/3-2/23_FRD_RGR_LRT_32.jpg',
    },
    {
      id: '8',
      name: 'Expedition',
      image:
        'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/expedition/2023/collections/3-2/23_FRD_EXP_PLT_32.jpg',
    },
    {
      id: '9',
      name: 'Maverick',
      image:
        'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/maverick/2023/collections/3-2/23_FRD_MAV_LRT_32.jpg',
    },
    {
      id: '10',
      name: 'Mustang Mach-E',
      image:
        'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/mustang-mach-e/2023/collections/3-2/23_FRD_MCE_GT_32.jpg',
    },
  ],

  Chevrolet: [
    {
      id: '1',
      name: 'Silverado',
      image:
        'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2023/trucks/silverado/01-images/colorizer/jellies/2023-silverado-1500-high-country-gba.jpg',
    },
    {
      id: '2',
      name: 'Camaro',
      image:
        'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2023/performance/camaro/01-images/colorizer/jellies/2023-camaro-zl1-gba.jpg',
    },
    {
      id: '3',
      name: 'Corvette',
      image:
        'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2023/performance/corvette/01-images/colorizer/jellies/2023-corvette-stingray-gba.jpg',
    },
    {
      id: '4',
      name: 'Tahoe',
      image:
        'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2023/suvs/tahoe/01-images/colorizer/jellies/2023-tahoe-high-country-gba.jpg',
    },
    {
      id: '5',
      name: 'Equinox',
      image:
        'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2023/suvs/equinox/01-images/colorizer/jellies/2023-equinox-premier-gba.jpg',
    },
    {
      id: '6',
      name: 'Blazer',
      image:
        'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2023/suvs/blazer/01-images/colorizer/jellies/2023-blazer-rs-gba.jpg',
    },
    {
      id: '7',
      name: 'Traverse',
      image:
        'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2023/suvs/traverse/01-images/colorizer/jellies/2023-traverse-high-country-gba.jpg',
    },
    {
      id: '8',
      name: 'Malibu',
      image:
        'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2023/cars/malibu/01-images/colorizer/jellies/2023-malibu-premier-gba.jpg',
    },
    {
      id: '9',
      name: 'Colorado',
      image:
        'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2023/trucks/colorado/01-images/colorizer/jellies/2023-colorado-zr2-gba.jpg',
    },
    {
      id: '10',
      name: 'Bolt EV',
      image:
        'https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2023/electric/bolt-ev/01-images/colorizer/jellies/2023-bolt-ev-2lt-gba.jpg',
    },
  ],

  Volkswagen: [
    {
      id: '1',
      name: 'Golf',
      image:
        'https://www.vw.com/content/dam/onehub_pkw/us/en/models/golf-gti/my23/colorizer/golf-gti-se-deep-black-pearl.png',
    },
    {
      id: '2',
      name: 'Jetta',
      image:
        'https://www.vw.com/content/dam/onehub_pkw/us/en/models/jetta/my23/colorizer/jetta-sel-deep-black-pearl.png',
    },
    {
      id: '3',
      name: 'Passat',
      image:
        'https://www.vw.com/content/dam/onehub_pkw/us/en/models/passat/my22/colorizer/passat-se-deep-black-pearl.png',
    },
    {
      id: '4',
      name: 'Tiguan',
      image:
        'https://www.vw.com/content/dam/onehub_pkw/us/en/models/tiguan/my23/colorizer/tiguan-sel-r-line-deep-black-pearl.png',
    },
    {
      id: '5',
      name: 'Atlas',
      image:
        'https://www.vw.com/content/dam/onehub_pkw/us/en/models/atlas/my23/colorizer/atlas-sel-premium-r-line-deep-black-pearl.png',
    },
    {
      id: '6',
      name: 'ID.4',
      image:
        'https://www.vw.com/content/dam/onehub_pkw/us/en/models/id4/my23/colorizer/id4-pro-s-plus-aurora-red-metallic.png',
    },
    {
      id: '7',
      name: 'Arteon',
      image:
        'https://www.vw.com/content/dam/onehub_pkw/us/en/models/arteon/my23/colorizer/arteon-sel-premium-r-line-deep-black-pearl.png',
    },
    {
      id: '8',
      name: 'Taos',
      image:
        'https://www.vw.com/content/dam/onehub_pkw/us/en/models/taos/my23/colorizer/taos-sel-deep-black-pearl.png',
    },
    {
      id: '9',
      name: 'Atlas Cross Sport',
      image:
        'https://www.vw.com/content/dam/onehub_pkw/us/en/models/atlas-cross-sport/my23/colorizer/atlas-cross-sport-sel-premium-r-line-deep-black-pearl.png',
    },
    {
      id: '10',
      name: 'Golf R',
      image:
        'https://www.vw.com/content/dam/onehub_pkw/us/en/models/golf-r/my23/colorizer/golf-r-deep-black-pearl.png',
    },
  ],
  Nissan: [
    {
      id: '1',
      name: 'Altima',
      image:
        'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/altima/2023/overview/2023-nissan-altima-sedan-super-black.png',
    },
    {
      id: '2',
      name: 'Maxima',
      image:
        'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/maxima/2023/overview/2023-nissan-maxima-sedan-super-black.png',
    },
    {
      id: '3',
      name: 'Sentra',
      image:
        'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/sentra/2023/overview/2023-nissan-sentra-sedan-super-black.png',
    },
    {
      id: '4',
      name: 'Rogue',
      image:
        'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/rogue/2023/overview/2023-nissan-rogue-suv-super-black.png',
    },
    {
      id: '5',
      name: 'Murano',
      image:
        'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/murano/2023/overview/2023-nissan-murano-suv-magnetic-black-pearl.png',
    },
    {
      id: '6',
      name: 'Pathfinder',
      image:
        'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/pathfinder/2023/overview/2023-nissan-pathfinder-suv-super-black.png',
    },
    {
      id: '7',
      name: 'Frontier',
      image:
        'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/frontier/2023/overview/2023-nissan-frontier-truck-magnetic-black-pearl.png',
    },
    {
      id: '8',
      name: 'Titan',
      image:
        'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/titan/2023/overview/2023-nissan-titan-truck-super-black.png',
    },
    {
      id: '9',
      name: 'Kicks',
      image:
        'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/kicks/2023/overview/2023-nissan-kicks-crossover-super-black.png',
    },
    {
      id: '10',
      name: 'Ariya',
      image:
        'https://www.nissanusa.com/content/dam/Nissan/us/vehicles/ariya/2023/overview/2023-nissan-ariya-crossover-aurora-black-pearl.png',
    },
  ],
  Hyundai: [
    {
      id: '1',
      name: 'Elantra',
      image:
        'https://www.hyundaiusa.com/content/dam/hyundai/us/en/vehicles/elantra/2023/gallery/exterior/elantra-limited-phantom-black.png',
    },
    {
      id: '2',
      name: 'Sonata',
      image:
        'https://www.hyundaiusa.com/content/dam/hyundai/us/en/vehicles/sonata/2023/gallery/exterior/sonata-limited-phantom-black.png',
    },
    {
      id: '3',
      name: 'Tucson',
      image:
        'https://www.hyundaiusa.com/content/dam/hyundai/us/en/vehicles/tucson/2023/gallery/exterior/tucson-limited-phantom-black.png',
    },
    {
      id: '4',
      name: 'Santa Fe',
      image:
        'https://www.hyundaiusa.com/content/dam/hyundai/us/en/vehicles/santa-fe/2023/gallery/exterior/santa-fe-limited-phantom-black.png',
    },
    {
      id: '5',
      name: 'Palisade',
      image:
        'https://www.hyundaiusa.com/content/dam/hyundai/us/en/vehicles/palisade/2023/gallery/exterior/palisade-limited-moonlight-cloud.png',
    },
    {
      id: '6',
      name: 'Kona',
      image:
        'https://www.hyundaiusa.com/content/dam/hyundai/us/en/vehicles/kona/2023/gallery/exterior/kona-limited-ultra-black.png',
    },
    {
      id: '7',
      name: 'Venue',
      image:
        'https://www.hyundaiusa.com/content/dam/hyundai/us/en/vehicles/venue/2023/gallery/exterior/venue-limited-black-noir-pearl.png',
    },
    {
      id: '8',
      name: 'Ioniq 5',
      image:
        'https://www.hyundaiusa.com/content/dam/hyundai/us/en/vehicles/ioniq-5/2023/gallery/exterior/ioniq-5-limited-phantom-black.png',
    },
    {
      id: '9',
      name: 'Accent',
      image:
        'https://www.hyundaiusa.com/content/dam/hyundai/us/en/vehicles/accent/2022/gallery/exterior/accent-limited-phantom-black.png',
    },
    {
      id: '10',
      name: 'Veloster N',
      image:
        'https://www.hyundaiusa.com/content/dam/hyundai/us/en/vehicles/veloster-n/2022/gallery/exterior/veloster-n-phantom-black.png',
    },
  ],
};

const ModelsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {brand} = route.params;
  const models = brand ? carModelsData[brand] || [] : [];
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const windowWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const tileSize = windowWidth / numColumns - 24;

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  }, []);

  const renderModelItem = ({item}) => (
    <TouchableOpacity
      style={[styles.modelItem, {width: tileSize, height: tileSize + 40}]}
      onPress={() => navigation.navigate('CarDetail', item)}>
      <Image source={{uri: item.image}} style={styles.modelImage} />
      <Text style={styles.modelName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={models}
        renderItem={renderModelItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.gridContainer}
        ListHeaderComponent={
          <Text style={styles.headerText}>{brand} Models</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={theme.text}
          />
        }
      />
    </SafeAreaView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    headerText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.text,
      marginVertical: 16,
      textAlign: 'center',
    },
    gridContainer: {
      paddingHorizontal: 12,
    },
    modelItem: {
      margin: 6,
      backgroundColor: theme.card,
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderWidth: theme.background === '#121212' ? 1 : 0,
      borderColor: theme.border,
    },
    modelImage: {
      width: '100%',
      height: '80%',
      resizeMode: 'cover',
    },
    modelName: {
      flex: 1,
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      paddingVertical: 8,
      textAlign: 'center',
    },
  });

export default ModelsScreen;
