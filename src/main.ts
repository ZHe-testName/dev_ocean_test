import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import store, { usersKey } from './store/store';
import router from './router';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App)
  .use(vuetify)
  .use(store, usersKey)
  .use(router);

router
  .isReady()
  .then(() => {
    app.mount('#app');
    store.dispatch('fetchUsers');
  });
