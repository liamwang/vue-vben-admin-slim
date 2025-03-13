import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('page.dashboard.title'),
    },
    name: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('#/views/_core/fallback/coming-soon.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: '控制台',
        },
      },
      {
        name: 'demo',
        path: '/demo',
        component: () => import('#/views/dashboard/demo.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: '演示页',
        },
      },
    ],
  },
];

export default routes;
