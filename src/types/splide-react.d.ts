declare module "@splidejs/react-splide" {
  import * as React from "react";

  export interface SplideProps {
    options?: Record<string, any>;
    hasTrack?: boolean;
    tag?: string;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export const Splide: React.FC<SplideProps>;

  export interface SplideSlideProps {
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export const SplideSlide: React.FC<SplideSlideProps>;
}
