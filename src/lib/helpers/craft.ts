const sanitiseContentBlockName = (component) => {
  const componentName = component.__typename.split('_')[1];
  const fixedComponentName =
    componentName[0].toUpperCase() + componentName.substr(1);
  return fixedComponentName;
};

/**
 * getContentBlocks
 * @param contentBlocks
 */
export const getContentBlocks = (contentBlocks) => {
  if (contentBlocks.length === 0) return [];

  return contentBlocks.map((component) => {
    return {
      name: sanitiseContentBlockName(component),
      id: component.id ?? 0,
      component,
    };
  });
};

const sanitiseColumnBlockName = (component) => {
  if (!component?.__typename) return null;
  const componentName = component.__typename.split('_')[0];
  const fixedComponentName =
    componentName[0].toUpperCase() + componentName.substr(1);
  return fixedComponentName;
};

/**
 * getColumnBlocks
 * @param columnBlocks
 */
export const getColumnBlock = (
  columnBlock: any
): { name: string; id: number; component: any } => {
  return {
    name: columnBlock[0].__typename.includes('columnBlocks')
      ? sanitiseContentBlockName(columnBlock[0])
      : sanitiseColumnBlockName(columnBlock[0]),
    id: columnBlock[0].id ?? 0,
    component: columnBlock[0],
  };
};
