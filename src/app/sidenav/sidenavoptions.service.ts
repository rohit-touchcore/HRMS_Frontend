export class SideNavOptionsService {
  constructor() {}
  options: Array<{ icon:string,name: string; path: string }> = [
    {
      icon:'dashboard',
      name: 'Dashboard',
      path: './dashboard',
    },
    {
      icon:'cases',
      name: 'Leaves',
      path: './leaves',
    },
  ];

  getOptions(): any {
    return this.options;
  }
}
