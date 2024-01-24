<template>
  <q-layout view="hHh Lpr lff" class="my-font">
    <!-- Хедер и бургер -->
    <q-header class="q-py-lg">
      <q-toolbar>
        <q-btn @click="toggleLeftDrawer" flat round dense icon="menu" />
        <q-space />

        <q-list class="row">
          <q-item
            to="/"
            clickable
            v-ripple
            :active="link === 'inbox'"
            @click="link = 'inbox'"
            active-class="my-menu-link"
          >
            <q-item-section class="text-h6">Главная</q-item-section>
          </q-item>

          <q-item
          to="/shop"
            clickable
            v-ripple
            :active="link === 'outbox'"
            @click="link = 'outbox'"
            active-class="my-menu-link"
          >
            <q-item-section class="text-h6">Магазины</q-item-section>
          </q-item>

          <q-item
          to="/contacts"
            clickable
            v-ripple
            :active="link === 'trash'"
            @click="link = 'trash'"
            active-class="my-menu-link"
          >
            <q-item-section class="text-h6">Контакты</q-item-section>
          </q-item>
        </q-list>
        <q-btn to="/basket" flat icon="shopping_cart"></q-btn>
        <q-btn flat icon="account_circle"></q-btn>
      </q-toolbar>
      <q-img
        class="backround_unicorn absolute-top"
        src="../assets/unicorn_back.png"
      ></q-img>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      group: ref([]),
      options: [
        {
          label: "Option 1",
          value: "op1",
        },
        {
          label: "Option 2",
          value: "op2",
        },
        {
          label: "Option 3",
          value: "op3",
        },
      ],
    };
  },
});
</script>

<style lang="scss">
@font-face {
  font-family: Comic-Sans-MS;
  src: url(../fonts/Comic-Sans-MS.woff);
}

.my-font {
  font-family: "Comic-Sans-MS";
}

.backround_unicorn {
  height: 100%;
  opacity: 0.4;
  z-index: -1;
}
</style>
