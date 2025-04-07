---
layout: cc
title: Categories
permalink: /categories/
---

<!-- <div>
{% for category in site.categories %}
  <div class="archive-group">
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <div id="#{{ category_name | slugize }}"></div>
    <p></p>
    <h3 class="category-head">{{ category_name }}</h3>
    <a name="{{ category_name | slugize }}"></a>
    {% for post in site.categories[category_name] %}
    <article class="archive-item">
      <h4><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></h4>
    </article>
    {% endfor %}
  </div>
{% endfor %}
</div> -->

{% for item in site.categories %}
{% capture category_name %}{{ item[0] }}{% endcapture %}
<h3 class="category-head">{{ category_name }}</h3>
<a name="{{ category_name | slugize }}"></a>

{% if site.categories[category_name] %}
{% for post in site.categories[category_name] %}
<h4>
<a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}
</a>
</h4>
{% endfor %}
{% else %}
<p>No posts available in this category.</p>
{% endif %}
<hr style="margin-top:35px;">

{% endfor %}