export interface PackageXml {
    Package: {
      types: PackageType[];
    };
  }
  
  export interface PackageType {
    name: string[];
    members: string[];
  }
  