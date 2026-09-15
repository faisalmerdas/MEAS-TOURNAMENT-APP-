import { Redirect } from 'expo-router';

/**
 * Catch-all for paths no screen claims.
 *
 * On native this is only reachable through a malformed deep link. On web it also
 * covers the page being served from a sub-path (a preview host, a CDN folder),
 * where the initial URL would otherwise never match a route and the router would
 * show its "unmatched route" screen instead of the app.
 */
export default function UnmatchedRoute() {
  return <Redirect href="/" />;
}
