import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Philosophy from './pages/Philosophy';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Resources from './pages/Resources';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const programsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/programs',
  component: Programs,
});

const philosophyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/philosophy',
  component: Philosophy,
});

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/resources',
  component: Resources,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

const donateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/donate',
  component: Donate,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  programsRoute,
  philosophyRoute,
  resourcesRoute,
  contactRoute,
  donateRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
