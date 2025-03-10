---
layout: category
title: Algorithm
category: Algorithm
permalink: /categories/algorithm/
subcategories: ["Techniques", "Coding Test"]
---

<h1>{{ page.title }}</h1>

{% assign category_name = page.category %}
{% assign subcategories = page.subcategories %}

<!-- 알고리즘 카테고리에 해당하는 포스트 표시 -->
{% for post in site.categories[category_name] %}
  <article class="archive-item">
    <h4><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h4>
  </article>
{% endfor %}

<!-- Techniques, Coding Test 카테고리에 해당하는 포스트 추가 표시 -->
{% for subcategory in subcategories %}
  {% for post in site.categories[subcategory] %}
    <article class="archive-item">
      <h4><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h4>
    </article>
  {% endfor %}
{% endfor %}
