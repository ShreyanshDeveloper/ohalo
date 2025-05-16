import { PreviewData as NextPreviewData } from 'next';

declare namespace ohalo {
  export type PreviewData = NextPreviewData & {
    token?: string;
  };
}

export as namespace ohalo;
export = ohalo;
