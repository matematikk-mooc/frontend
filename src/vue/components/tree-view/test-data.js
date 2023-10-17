export const testData = [
  {
    label: 'Root 1',
    isAdmin: false,
    children: [
      {
        label: 'Child 1.1',
        isAdmin: true,
        type:'module',
        children: [
          {
            label: 'Grandchild 1.1.1', type:'page', isAdmin: false, children: []
          },
          { label: 'Grandchild 1.1.2', type:'page', isAdmin: true, children: [] },
        ],
      },
      { label: 'Child 1.2', isAdmin: false, children: [] },
    ],
  },
  {
    label: 'Root 2',
    isAdmin: true,
    type:'module',
    children: [
      {
        label: 'Child 2.1',
        isAdmin: true,
        type:'module',
        children: [
          { label: 'Grandchild 2.1.1', type:'page', isAdmin: true, children: [] },
          { label: 'Grandchild 2.1.2',type:'page' ,isAdmin: false, children: [] },
        ],
      },
      { label: 'Child 2.2', isAdmin: false, type:'page',children: [] },
    ],
  },
]



