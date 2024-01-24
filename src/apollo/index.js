import { createHttpLink, InMemoryCache } from '@apollo/client/core'
export /* async */ function getClientOptions(/* {app, router, ...} */ options) {
  return Object.assign(
    // General options.
    {
      link: createHttpLink({
        uri:
        process.env.GRAPHQL_URI ||
        // Change to your graphql endpoint.
        'https://sprint-test.hasura.app/v1/graphql',

        // пароль от админки, чтобы данные от хасуры в проект передавались без запрашивания пароля
        headers: {
          "x-hasura-admin-secret": "UC4wZu5JKb9iCHrAQiqHdphGdm9ZBAvRu01gF13bop7dFPe1dPv9voImErTzyfFp"
        }
      }),
      cache: new InMemoryCache(),
    },
    // Specific Quasar mode options.
    process.env.MODE === 'spa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'ssr'
      ? {
          //
        }
      : {},
    process.env.MODE === 'pwa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'bex'
      ? {
          //
        }
      : {},
    process.env.MODE === 'cordova'
      ? {
          //
        }
      : {},
    process.env.MODE === 'capacitor'
      ? {
          //
        }
      : {},
    process.env.MODE === 'electron'
      ? {
          //
        }
      : {},
    // dev/prod options.
    process.env.DEV
      ? {
          //
        }
      : {},
    process.env.PROD
      ? {
          //
        }
      : {},
    // For ssr mode, when on server.
    process.env.MODE === 'ssr' && process.env.SERVER
      ? {
          ssrMode: true,
        }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === 'ssr' && process.env.CLIENT
      ? {
          ssrForceFetchDelay: 100,
        }
      : {}
  )
}
