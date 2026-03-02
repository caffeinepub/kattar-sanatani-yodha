import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Philosophy from './pages/Philosophy';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Admin from './pages/Admin';
import Membership from './pages/Membership';
import Login from './pages/Login';
import MemberDashboard from './pages/MemberDashboard';
import { MemberAuthProvider } from './hooks/useMemberAuth';

const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: About });
const programsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/programs', component: Programs });
const philosophyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/philosophy', component: Philosophy });
const resourcesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/resources', component: Resources });
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: Contact });
const donateRoute = createRoute({ getParentRoute: () => rootRoute, path: '/donate', component: Donate });
const adminRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin', component: Admin });
const membershipRoute = createRoute({ getParentRoute: () => rootRoute, path: '/membership', component: Membership });
const loginRoute = createRoute({ getParentRoute: () => rootRoute, path: '/login', component: Login });
const dashboardRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dashboard', component: MemberDashboard });

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  programsRoute,
  philosophyRoute,
  resourcesRoute,
  contactRoute,
  donateRoute,
  adminRoute,
  membershipRoute,
  loginRoute,
  dashboardRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <MemberAuthProvider>
      <RouterProvider router={router} />
    </MemberAuthProvider>
  );
}
