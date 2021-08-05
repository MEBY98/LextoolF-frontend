export class ObservationStore {
  id: String;
  name: String;
  tab: String;
  descriptorsTypes: [DescriptorTypeStore];
}

export class DescriptorStore {
  id: String;
  description: String;
}

export class DescriptorTypeStore {
  id: String;
  name: String;
  inputType: String;
  multiInput: Boolean;
  tab: String;
  descriptors: [DescriptorStore];
}
