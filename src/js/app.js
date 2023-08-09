import FooterTest from '../templates/components/FooterTest.vue'
import { createApp } from "vue/dist/vue.esm-bundler.js";

const app = createApp({});
app.component('footer-test', FooterTest)
app.mount('#application');

console.log("in app.js");

export default app;

// import { createSSRApp } from 'vue'

// export function createApp() {
//   return createSSRApp({
//     data: () => ({ count: 1 }),
//     template: `<p>HELLO</p>`
//   })
// }

// import { createSSRApp } from 'vue'
// import express from 'express'
// import { renderToString } from 'vue/server-renderer'

// const server = express()

// server.get('/', (req, res) => {
//   const app = createSSRApp({
//     data: () => ({ count: 1 }),
//     template: `<button @click="count++">{{ count }}</button>`
//   })

//   renderToString(app).then((html) => {
//     res.send(`
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>Vue SSR Example</title>
//       </head>
//       <body>
//         <div id="application">${html}</div>
//       </body>
//     </html>
//     `)
//   })
// })

// server.listen(3000, () => {
//   console.log('ready')
// })