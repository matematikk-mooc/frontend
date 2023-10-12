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

const treeData = [
  {
    label: 'box1',
    nodes: [
      {
        label: 'box_1.2',
        nodes: [{ label: 'box_1.2.1', nodes: [] }, { label: 'box_1.2.2', nodes: [] }, { label: 'box_1.2.3', nodes: [] }, { label: 'box_1.2.4', nodes: [] }]
      }
    ]
  }, {
    label: 'box2',
    nodes: [{ label: 'box_2.2.1', nodes: [] }, { label: 'box_2.2.2', nodes: [] }, { label: 'box_2.2.3', nodes: [] }, { label: 'box_2.2.4', nodes: [] }]
  }, {
    label: 'box3',
    nodes: [{ label: 'box_3.2.1', nodes: [] }, { label: 'box_3.2.2', nodes: [] }, { label: 'box_3.2.3', nodes: [] }, { label: 'box_1.2.4', nodes: [] }]
  }
]
