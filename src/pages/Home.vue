<template>
  <q-page class="my-font">
    <!-- Фильтры слева -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="180"
      :breakpoint="700"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-lg">
          <div class="q-py-sm">Цвет</div>
          <q-option-group
            v-model="group"
            :options="options"
            color="grey"
            type="checkbox"
          />
          <!-- <div class="q-py-sm">Цвет</div>
          <q-option-group
            v-model="group"
            :options="options"
            color="grey"
            type="checkbox"
          />
          <div class="q-py-sm">Тип</div>
          <q-option-group
            v-model="group"
            :options="options"
            color="grey"
            type="checkbox"
          />
          <div class="q-py-sm">Материал</div>
          <q-option-group
            v-model="group"
            :options="options"
            color="grey"
            type="checkbox"
          /> -->
        </div>
      </q-scroll-area>
    </q-drawer>
    <!-- Поиск и кнопка сортировки -->
    <div class="flex q-mt-md items-end justify-around">
      <div class="input_main">
        <div>
          <q-input
            @keyup.enter="addTask"
            rounded
            outlined
            v-model="addToNote"
            placeholder="Поиск"
            class="q-mt-md"
          >
            <template v-slot:append>
              <q-btn @click="addTask" round dense flat icon="search" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="q-mr-md q-pt-md">
        <q-select
          class="select_main"
          rounded
          outlined
          v-model="model"
          :options="options"
          label="Сортировать по"
        />
      </div>
    </div>
    <!-- Каталог -->
    <div class="q-pa-md row justify-around">
      <q-card v-for="toy in toys" :key="toy.id" class="my-card q-pa-md q-ma-sm">
        <q-img :src="toy.image1" alt="logo" />
        <q-card-section class="q-pa-none">
          <div class="text-subtitle1 q-pt-lg">{{ toy.name }}</div>
          <div class="flex items-center justify-between q-pt-lg">
            <div class="text-h6">{{ toy.price }} ₽</div>
            <q-btn @click="addToBasket(toy)" flat icon="shopping_cart"></q-btn>
          </div>
          <q-btn
            class="q-mt-md"
            style="width: 100%"
            label="Подробнее"
            color="primary"
            @click="clickInfo(toy)"
          />
        </q-card-section>
      </q-card>
    </div>
    <!-- Индивидуальная карточка -->
    <q-dialog v-model="fixed" class="my-font">
      <q-card style="width: 700px">
        <q-card-section class="flex justify-between">
          <div class="text-h6" style="max-width: 600px">
            {{ dialogDesk.name }}
          </div>
          <q-btn flat icon="shopping_cart"></q-btn>
        </q-card-section>

        <q-separator />

        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 500px"
          class="q-mx-sm"
        >
          <q-card-section>
            <q-carousel
              v-model="slide"
              animated
              arrows
              :autoplay="autoplay"
              :arrows-style="arrowsStyle"
              infinite
              transition-prev="slide-right"
              transition-next="slide-left"
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = true"
            >
              <q-carousel-slide
                class="carousel_img"
                :name="1"
                :img-src="dialogDesk.image1"
              />
              <q-carousel-slide
                class="carousel_img"
                :name="2"
                :img-src="dialogDesk.image2"
              />
              <q-carousel-slide
                class="carousel_img"
                :name="3"
                :img-src="dialogDesk.image3"
              />
            </q-carousel>

            <div class="text-h4 q-my-md">{{ dialogDesk.price }} ₽</div>
            <div>
              <p class="text-h6 text-weight-bold">Описание</p>
              <p class="text-italic">{{ dialogDesk.description }}</p>
            </div>
            <div>
              <p class="text-h6 text-weight-bold">Характеристики</p>
              <div class="text-italic">
                <p>
                  Высота/Длина ..................... {{ dialogDesk.height }} см
                </p>
                <p>
                  Цвет товара ........................... {{ dialogDesk.color }}
                </p>
                <p>
                  Тип ..........................................
                  {{ dialogDesk.type }}
                </p>
                <p>
                  Материал ...............................
                  {{ dialogDesk.material }}
                </p>
              </div>
            </div>
          </q-card-section>
        </q-scroll-area>
        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Назад" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { computed, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    const { result, loading, error } = useQuery(gql`
      query MyQuery {
        toys {
          color
          description
          height
          material
          name
          price
          type
          image1
          image2
          image3
        }
      }
    `);

    const toys = computed(() => result.value?.toys ?? []);

    const fixed = ref(false);

    let dialogDesk = ref("");

    const clickInfo = (toy) => {
      fixed.value = true;
      dialogDesk.value = toy;
    };

    return {
      toys,
      clickInfo,
      fixed,
      dialogDesk,

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
      model: ref(null),
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#f468ae",
        width: "5px",
        opacity: 0.75,
      },
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#f468ae",
        width: "9px",
        opacity: 0.2,
      },
      slide: ref(1),
      autoplay: ref(true),
      arrowStyle: {
        color: "black",
      },
    };
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: Comic-Sans-MS;
  src: url(../fonts/Comic-Sans-MS.woff);
}

.my-font {
  font-family: "Comic-Sans-MS";
}

.my-card {
  width: 100%;
  max-width: 200px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 460px;
}

.input_main {
  margin: 0 auto;
  width: 590px;
}

.select_main {
  width: 190px;
  margin: 0 auto;
}

.carousel_img {
  background-size: contain;
  background-repeat: no-repeat;
}

.q-carousel__control {
  color: black;
}

.q-carousel__arrow .q-icon {
  font-size: 36px;
}

.q-btn {
  text-transform: math-auto;
}

.q-dialog__inner--minimized > div {
  max-width: 705px;
}
</style>
