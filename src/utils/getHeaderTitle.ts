import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';

import type { User } from '@/types/user';

export function getHeaderTitle(route: Partial<Route<string, object | undefined>>, user?: User) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return `Buongiorno ${user ? user.name : 'boh'}!`;
    case 'Agenda':
      return 'La mia agenda';
    case 'Trace':
      return 'Traccia';
    case 'Diaries':
      return 'Diari';
  }
}
