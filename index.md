---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "野山杂货铺"
  text: "一个用来记录个人思绪的地方"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<script setup>
import { data } from './posts.data.js'
// 测试数据获取是否正常
console.log(data)
</script>

# 文章分类

<div v-for="(posts, cat) in data.categories" :key="cat">
  <h2>{{ cat }}</h2>
  <ul>
    <li v-for="post in posts">
      <a :href="post.url">{{ post.title }}</a>
      <small>{{ post.date }}</small>
    </li>
  </ul>
</div>
