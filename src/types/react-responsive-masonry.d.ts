declare module 'react-responsive-masonry' {
  import * as React from 'react';

  export interface MasonryProps {
    columnsCount?: number;
    gutter?: string | number;
    children?: React.ReactNode;
  }

  const Masonry: React.FC<MasonryProps>;
  export default Masonry;
}
