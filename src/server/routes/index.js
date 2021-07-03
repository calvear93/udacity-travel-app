// add here the routes
const routes = [
    require('./form.routes')
];

// injects routes to express app
export function createRoutes(app)
{
    for (let { default: route } of routes)
    {
        app[route.method](route.path, route.exec);

        console.info(`Route ${route.method.toUpperCase()} at ${route.path} loaded`);
    }
}
