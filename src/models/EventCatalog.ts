interface ConfigExtra {
  displayName: string;
  dataType: string;
}

export interface EventCatalog {
  id: number;
  displayName: string;
  isAnimalRequired: boolean;
  configExtra: ConfigExtra[] | null;
}
