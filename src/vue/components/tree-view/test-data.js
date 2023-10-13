export const testData = [
  {
    label: 'Root 1',
    isAdmin: false,
    children: [
      {
        label: 'Child 1.1',
        isAdmin: true,
        children: [
          {
            label: 'Grandchild 1.1.1', isAdmin: false, children: []
          },
          { label: 'Grandchild 1.1.2', isAdmin: true, children: [] },
        ],
      },
      { label: 'Child 1.2', isAdmin: false, children: [] },
    ],
  },
  {
    label: 'Root 2',
    isAdmin: true,
    children: [
      {
        label: 'Child 2.1',
        isAdmin: true,
        children: [
          { label: 'Grandchild 2.1.1', isAdmin: true, children: [] },
          { label: 'Grandchild 2.1.2', isAdmin: false, children: [] },
        ],
      },
      { label: 'Child 2.2', isAdmin: false, children: [] },
    ],
  },
]



