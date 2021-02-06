<template>
  <b-container>
    <div class="my-3">
      <b-button variant="light" size="sm" @click="handleClick"
        >Generate session</b-button
      >
    </div>
    <b-row class="my-2">
      <b-col>
        Remain: {{ this.wordSet.length - this.selectedKeys.length }} /
        {{ this.wordSet.length }}
      </b-col>
    </b-row>
    <b-row class="my-2">
      <b-col>
        <div></div>
        <b-badge
          class="mr-2"
          :key="index"
          v-for="(item, index) in wordSet"
          pill
          :variant="item.selected ? 'success' : 'light'"
          >{{ item.value }}</b-badge
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-textarea
          v-model="text"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  BFormTextarea,
  BContainer,
  BRow,
  BCol,
  BBadge,
  BButton
} from "bootstrap-vue";

import randomNumbers from "@/modules/generateUniqueNumbers.js";

export default {
  name: "Home",
  components: {
    BFormTextarea,
    BContainer,
    BButton,
    BRow,
    BCol,
    BBadge
  },
  computed: {
    wordSet() {
      return this.words.map((item, index) => ({
        id: index,
        value: item,
        selected: this.selectedKeys.indexOf(index) !== -1
      }));
    },
    selectedKeys() {
      const textArr = this.text.split(" ");

      return this.words
        .map((item, index) =>
          textArr.find(textItem => textItem === item) ? index : undefined
        )
        .filter(item => item !== undefined);
    }
  },
  methods: {
    handleClick() {
      const indexes = randomNumbers({
        count: 3,
        range: { max: this.allWords.length - 1 }
      });

      this.words = this.allWords.filter(
        (item, index) => indexes.indexOf(index) !== -1
      );
    }
  },
  data() {
    return {
      text: "",
      words: [],
      allWords: [
        "apple",
        "car",
        "mercedes",
        "honda",
        "yamaha",
        "mercedes",
        "suzuki"
      ]
    };
  }
};
</script>

<style lang="stylus" scoped></style>
