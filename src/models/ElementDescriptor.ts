import { Ubication } from './Ubication';
import { Clasification } from './Clasification';
import { Descriptor } from './Descriptor';

export class ElementDescriptors {
  id: string;
  element: string;
  ubication: Ubication;
  clasification: Clasification;
  generalDescription: GeneralDescriptionDescriptor;
  orderLemma: OrderLemmaDescriptor;
  useInformation: UseInformationDescriptor[];
  contornoDefinition: ContornoDefinitionDescriptor[];
  example: ExampleDescriptor;
  paradigmaticInfo: ParadigmaticInfoDescriptor;
}

export class GeneralDescriptionDescriptor {
  tipo: Descriptor;
  structure: Descriptor;
  conceptualDomain: Descriptor;
}

export class UseInformationDescriptor {
  anotation: string;
  position: Descriptor;
  format: Descriptor;
  tipography: Descriptor;
}

export class OrderLemmaDescriptor {
  order: Descriptor[];
  criteriaOfLematization: Descriptor[];
  formalStructure: Descriptor[];
  ubicationOfContorno: Descriptor;
  typeOfVariant: Descriptor[];
  formatOfVariant: Descriptor[];
  tipographyOfVariant: Descriptor[];
}

export class ContornoDefinitionDescriptor {
  definition: string;
  typeOfDefinition: Descriptor;
  argumentalSchema: Descriptor;
  relationship: Descriptor[];
  contorno: string;
  typeOfContorno: Descriptor[];
  positionOfContorno: Descriptor[];
  formatOfContorno: Descriptor[];
}

export class ExampleDescriptor {
  anotation: string;
  typeOfExample: Descriptor[];
  formatOfExample: Descriptor[];
  functionOfExample: Descriptor[];
}

export class ParadigmaticInfoDescriptor {
  typeOfRelationship: Descriptor;
  formOfPresentation: Descriptor[];
  position: Descriptor[];
}
