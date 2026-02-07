import type { PropsWithChildren, ReactElement } from 'react';

export interface INavigate {
  title: string;
  to: string;
  icon?: string | ReactElement;
}

export interface INavigateProps extends PropsWithChildren{
  navigates: INavigate[];
}
