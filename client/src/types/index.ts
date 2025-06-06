export interface Antibiotic {
  id: string;
  name: string;
  group: string;
  bacteriaKilled: string[];
}

export interface Bacteria {
  id: string;
  name: string;
  shortInfo: string;
  antibiotics: string[];
}
