export class SideNavOptionsService {
  constructor() {}
  options: Array<any> = [
    {
      icon: 'dashboard',
      name: 'Dashboard',
      path: './dashboard',
    },
    {
      icon: 'cases',
      name: 'Leaves',
      path: './leaves',
      subModules: [
        {
          path: './leaves',
          name: 'Leaves',
          icon: 'history',
        },
        {
          path: './approve-or-reject',
          name: 'Approve/Reject',
          icon: 'checklist',
        },
      ],
    },
  ];

  getOptions(): any {
    return this.options;
  }
}
