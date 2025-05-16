import { getColumnBlock } from '@helpers/craft';
import dynamic from 'next/dynamic';
import { createElement } from 'react';

const components = {
  // Column block types
  Asset: dynamic(() => import('@components/Atoms/Image')),
  Data: dynamic(() => import('@components/Molecules/Data')),
  Faqs: dynamic(() => import('@components/Molecules/Accordion')),
  Form: dynamic(() => import('@components/Molecules/Form')),
  Quote: dynamic(() => import('@components/Molecules/Quote')),
  Redactor: dynamic(() => import('@components/Atoms/Redactor')),
  LinkList: dynamic(() => import('@components/Molecules/LinkList')),

  // Information Grid blocks
  InformationGridBlocks: dynamic(
    () => import('@components/Molecules/InfoBlock')
  ),
};

const ColumnBlock = ({
  data,
  sectionName,
}: {
  data: any;
  sectionName?: string;
}) => {
  const columnBlock = data?.[0] ? getColumnBlock(data) : null;

  // Bale early if column block is empty
  if (columnBlock === null) return null;

  const { name } = columnBlock;

  if (typeof components[name] !== 'undefined') {
    const { component, ...rest } = columnBlock;

    let props = {
      ...component,
      ...rest,
    };

    // Additional LinkList props
    if (name === 'LinkList') {
      props['small'] = sectionName !== 'fullWidthSection' ? true : false;
    }

    // Additional ColumnAsset/Asset props
    if (name === 'Asset') {
      const imageProps = props['image'][0];
      props = { ...props, ...imageProps };
    }

    // Additional Form props
    if (name === 'Form') {
      props['handle'] = props.form[0].handle;
    }

    return createElement(components[name], {
      key: name + component.id,
      ...props,
    });
  }

  // The component doesn't exist in the codebase yet
  return createElement(
    () => <div>The component {name} has not been created yet.</div>,
    { key: name }
  );
};

export default ColumnBlock;
