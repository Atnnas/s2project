export default function sitemap() {
  const baseUrl = 'https://s2-project.com';
  
  const routes = ['', '/servicios', '/nosotros', '/portafolio', '/privacidad', '/terminos'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new URLSearchParams(route).get('lastModified') || new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : (route === '/privacidad' || route === '/terminos') ? 0.3 : 0.8,
  }));

  return [...routes];
}
