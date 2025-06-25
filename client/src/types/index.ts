export interface Antibiotic {
  name: string;
  laktam: boolean;
  group: string;
  baktericid: boolean;
  bacteriaKilled: string[]; // array of bacteria names or IDs
  bacteriaNotKilled: string[]; // array of bacteria names or IDs
  dosage: string;
  observandum: string[];
}

export interface Bacteria {
  name: string;
  gramStainPositive: boolean;
  shape: string;
  capsule: boolean;
  aerob: boolean;
  laktamasProducer: boolean;
  antibioticsSensitive: string[]; // array of antibiotic names or IDs
  antibioticsResistent: string[]; // array of antibiotic names or IDs
  extendedResistance: string;
  trivia: string;
}
