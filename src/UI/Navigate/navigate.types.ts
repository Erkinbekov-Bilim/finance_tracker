import type { ReactElement } from 'react';

export interface INavigate {
  title: string;
  to: string;
  icon?: string | ReactElement;
}

export interface INavigateProps {
  navigates: INavigate[];
}
