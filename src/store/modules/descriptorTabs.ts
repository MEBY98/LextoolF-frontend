export class ObservationStore {
  id: string;
  name: string;
  tab: string;
  descriptorsTypes: DescriptorTypeStore[];
}

export class DescriptorStore {
  id: string;
  description: string;
}

export class DescriptorTypeStore {
  id: string;
  name: string;
  inputType: string;
  multiInput: boolean;
  tab: string;
  descriptors: DescriptorStore[];
}
