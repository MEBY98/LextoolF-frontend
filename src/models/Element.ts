import { Ubication } from './Ubication';
import { Clasification } from './Clasification';

export class Element {
  id: string;
  element: string;
  ubication: Ubication;
  clasification: Clasification;
  generalDescription: GeneralDescription;
  orderLemma: OrderLemma;
  useInformation: UseInformation[];
  contornoDefinition: ContornoDefinition[];
  example: Example;
  paradigmaticInfo: ParadigmaticInfo;
}

export class NewElement {
  element: string;
  ubication: string;
  clasification: string;
  generalDescription: GeneralDescription;
  orderLemma: OrderLemma;
  useInformation: UseInformation[];
  contornoDefinition: ContornoDefinition[];
  example: Example;
  paradigmaticInfo: ParadigmaticInfo;
}

export class ElementToEdit {
  id?: string;
  element: string;
  ubication: string;
  clasification: string;
  generalDescription: GeneralDescription;
  orderLemma: OrderLemma;
  useInformation: UseInformation[];
  contornoDefinition: ContornoDefinition[];
  example: Example;
  paradigmaticInfo: ParadigmaticInfo;
}

export class GeneralDescription {
  tipo: string;
  structure: string;
  conceptualDomain: string;
}

export class UseInformation {
  anotation: string;
  position: string;
  format: string;
  tipography: string;
}

export class OrderLemma {
  order: string[];
  criteriaOfLematization: string[];
  formalStructure: string[];
  ubicationOfContorno: string;
  typeOfVariant: string[];
  formatOfVariant: string[];
  tipographyOfVariant: string[];
}

export class ContornoDefinition {
  definition: string;
  typeOfDefinition: string;
  argumentalSchema: string;
  relationship: string[];
  contorno: string;
  typeOfContorno: string[];
  positionOfContorno: string[];
  formatOfContorno: string[];
}

export class Example {
  anotation: string;
  typeOfExample: string[];
  formatOfExample: string[];
  functionOfExample: string[];
}

export class ParadigmaticInfo {
  typeOfRelationship: string;
  formOfPresentation: string[];
  position: string[];
}
