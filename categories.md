---
layout: home
title: "文章分类"
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
    </li>
  </ul>
</div>
