// import { MainNavItem } from '@/lib/types/site/NavItem';
import * as Icons from '@/components/shared/Icons';

import {
  recentTrainingsRoute,
  rootCategoriesRoute,
  settingsRoute,
} from './routesConfig';

type MainNavItem = unknown;

export type SiteMenu = {
  mainNav: MainNavItem[];
};

export const siteMenu: SiteMenu = {
  // TODO: See `src/config/dashboard.ts`
  mainNav: [
    {
      titleId: 'Categories',
      icon: Icons.Categories,
      href: rootCategoriesRoute,
    },
    {
      titleId: 'Trainings',
      icon: Icons.Rocket,
      href: recentTrainingsRoute,
    },
    {
      titleId: 'Settings',
      icon: Icons.Settings,
      href: settingsRoute,
    },
    /* // UNUSED
    {
      titleId: 'Welcome',
      icon: Icons.MonitorPlay,
      href: welcomeAliasRoute,
    },
    */
  ],
};
