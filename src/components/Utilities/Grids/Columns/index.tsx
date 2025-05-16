import ColumnBlock from '@components/Utilities/ColumnBlock';
import { ColumnRatios, Links } from '@typings/components';
import {
  ColumnBlocks_Asset_BlockType,
  ColumnBlocks_Data_BlockType,
  ColumnBlocks_Faqs_BlockType,
  ColumnBlocks_Form_BlockType,
  ColumnBlocks_Quote_BlockType,
  ColumnBlocks_Redactor_BlockType,
} from '@typings/graphql';

export type ColumnsProps = {
  columns: (
    | Partial<ColumnBlocks_Asset_BlockType>
    | Partial<ColumnBlocks_Data_BlockType>
    | Partial<ColumnBlocks_Faqs_BlockType>
    | Partial<ColumnBlocks_Form_BlockType>
    | (Partial<ColumnBlocks_Quote_BlockType> & {
        label?: string;
        textColor?: string;
        button?: Partial<Links>;
      })
    | Partial<ColumnBlocks_Redactor_BlockType>
  )[];
  columnAlignment:
    | 'start'
    | 'center'
    | 'end'
    | Omit<string, 'start' | 'center' | 'end'>;
  columnRatio?: ColumnRatios | Omit<string, ColumnRatios>;
  columnNumber: '2' | '3' | Omit<string, '2' | '3'>;
};

const Columns = ({
  columns,
  // verticalCenter = true,
  columnAlignment = 'start',
  columnRatio = '1:1',
  columnNumber = '2',
}: ColumnsProps) => {
  const hasAssetRight =
    columns.length === 2 && columns[1].__typename.includes('asset');

  return (
    <div
      className={`grid-cols-1 gap-y-normal md:gap-y-large md:gap-x-normal items-${columnAlignment} ${
        columnNumber === '2' && columnRatio === '1:1'
          ? 'md:grid-cols-2'
          : 'md:grid-cols-3'
      } ${hasAssetRight ? 'flex flex-col-reverse md:grid' : 'grid'}`}
    >
      {columns.map((column) => {
        return (
          <div
            key={column.id}
            className={
              columnNumber === '2'
                ? columnRatio === '2:1'
                  ? 'odd:col-span-2'
                  : columnRatio === '1:2'
                  ? 'even:col-span-2'
                  : undefined
                : undefined
            }
          >
            <ColumnBlock data={[column]} />
          </div>
        );
      })}
    </div>
  );
};

export default Columns;

//! Need to add type guards to each of the columnAlignment, columnRatio and columnNumber props.
