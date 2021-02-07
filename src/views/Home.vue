<template>
  <b-container>
    <div class="my-3">
      <b-button variant="light" size="sm" @click="handleClick"
        >Generate session</b-button
      >
    </div>
    <b-row class="my-2">
      <b-col>
        Archive: {{ this.allWords.length }}
        <br />
        Remain:
        {{ this.wordSet.length - this.selectedKeys.length }} /
        {{ this.wordSet.length }}
      </b-col>
      <b-col>
        <b-form-select
          v-model="selected"
          :options="[
            { value: 5, text: 5 },
            { value: 7, text: 7 },
            { value: 10, text: 10 },
            { value: 20, text: 20 }
          ]"
        ></b-form-select>
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
          rows="8"
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
  BButton,
  BFormSelect
} from "bootstrap-vue";

import randomNumbers from "@/modules/generateUniqueNumbers.js";
import allWords from "@/modules/words.js";

export default {
  name: "Home",
  components: {
    BFormTextarea,
    BFormSelect,
    BContainer,
    BButton,
    BRow,
    BCol,
    BBadge
  },
  computed: {
    limitedWordCount() {
      return this.selected;
    },
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
          textArr.find(textItem => textItem.indexOf(item) !== -1)
            ? index
            : undefined
        )
        .filter(item => item !== undefined);
    }
  },
  methods: {
    handleClick() {
      const indexes = randomNumbers({
        count: this.limitedWordCount,
        range: { max: this.allWords.length - 1 }
      });

      this.words = this.allWords.filter(
        (item, index) => indexes.indexOf(index) !== -1
      );
    }
  },
  data() {
    return {
      selected: 5,
      text: "",
      words: [],
      allWords
    };
  }
};
</script>

<style lang="stylus" scoped></style>
