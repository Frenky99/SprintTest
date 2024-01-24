<template>
  <q-page>
    <!-- Если корзинка пустая -->
    <div class="text-center q-mt-xl absolute-center">
      <p class="text-h4">В корзинке пусто</p>
      <p class="text-h4">
        Вернемся в каталог, чтобы выбрать что-то подходящее?
      </p>
      <q-btn size="20px" color="primary" to="/">На главную</q-btn>
    </div>

    <!-- Карточка в корзинке -->
    <div class="q-ma-xl">
      <q-card class="my-card basket_card">
        <!-- <q-img :src="toy.image1" alt="logo" /> -->
        <div style="width: 60%" class="flex q-ma-xs justify-around">
          <img
            style="width: 39%; height: 100%"
            src="..\assets\unicorn1.webp"
            alt=""
          />
          <div class="flex column justify-around">
            <div class="text-subtitle1 q-pt-lg">Игрушка</div>
            <q-btn flat icon="delete"></q-btn>
          </div>
        </div>

        <div
          style="width: 40%"
          class="flex items-center justify-around column q-pt-lg"
        >
          <div class="text-h6">700 ₽</div>
          <div style="width: 125px" class="flex">
            <q-btn>-</q-btn>
            <p style="margin: 0 auto">0</p>
            <q-btn>+</q-btn>
          </div>
        </div>
      </q-card>
    </div>

    <!-- Окно формы отправки и счетчик цены -->
    <div class="q-gutter-sm flex justify-around">
      <q-btn
        style="margin: 5px; padding: 10px 60px"
        label="Оформить"
        color="primary"
        @click="fixed = true"
      />

      <q-dialog v-model="fixed">
        <q-card>
          <q-card-section>
            <div class="text-h6">Введите данные для получения заказа</div>
          </q-card-section>

          <q-separator />

          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="height: 400px"
            class="q-mx-sm"
          >
            <q-card-section>
              <div class="q-pa-md" style="max-width: 400px">
                <q-form
                  v-model="clearForm"
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-gutter-md"
                >
                  <p class="text-h6">Получатель</p>
                  <q-input
                    filled
                    v-model="name"
                    label="Ваше Имя *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Пожалуйста введите имя',
                    ]"
                  />
                  <q-input
                    filled
                    v-model="surname"
                    label="Ваша Фамилия *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Пожалуйста введите фамилию',
                    ]"
                  />

                  <q-input
                    filled
                    type="number"
                    v-model="phone"
                    hint="+7(999)999-99-99"
                    label="Контактный телефон*"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 10 && val.length < 12) ||
                        'Пожалуйста введите телефон',
                    ]"
                  />
                  <p class="text-h6">Куда доставить?</p>
                  <q-input
                    filled
                    v-model="address"
                    label="Адрес *"
                    hint="г. Волгоград, ул. Гражданская, д. 28"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Пожалуйста введите ваш адрес',
                    ]"
                  />
                  <q-input
                    filled
                    type="number"
                    v-model="apartment"
                    label="Квартира / офис"
                    lazy-rules
                  />
                  <q-input
                    v-model="text"
                    label="Комментарий для курьера"
                    filled
                    type="textarea"
                  />

                  <q-toggle
                    v-model="accept"
                    label="Я согласен(а) на обработку персональных данных"
                  />

                  <div class="q-mt-md flex justify-between">
                    <q-btn
                      @click="alert"
                      label="Оформить"
                      type="submit"
                      color="primary"
                    />
                    <q-btn
                      label="Очистить"
                      type="reset"
                      color="primary"
                      flat
                      class="q-ml-sm"
                    />
                  </div>
                </q-form>
              </div>
            </q-card-section>
          </q-scroll-area>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              @click="clearClick"
              flat
              label="Назад"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div>
        <p class="text-h6">Итого: 1000 ₽</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const surname = ref(null);
    const phone = ref(null);
    const address = ref(null);
    const apartment = ref(null);
    const text = ref(null);
    const accept = ref(false);

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

    return {
      toys,
      name,
      surname,
      phone,
      address,
      apartment,
      text,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Вы не подтвердили согласие",
          });
        } else {
          $q.dialog({
            message: "Спасибо! Ваш заказ передан в доставку!",
          });
        }
      },

      onReset() {
        name.value = null;
        surname.value = null;
        phone.value = null;
        address.value = null;
        apartment.value = null;
        text.value = null;
        accept.value = false;
      },

      fixed: ref(false),
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
    };
  },
  methods: {
    clearClick() {
      clearForm.value = "";
    },
  },
};
</script>

<style scoped>
.q-btn {
  text-transform: none;
}

.my-card {
  max-width: 800px;
  border-radius: 10px;
  max-height: 200px;
  margin: 0 auto;
  display: flex;
}
</style>
