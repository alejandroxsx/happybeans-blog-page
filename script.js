const url = 'https://happybeansdesign.com/wp-json/wp/v2/posts?per_page=100&_embed';
$.get(url, data => {
  allPosts = data;
  displayArticles('all');

});


function tagFilter( filteredTag ){
  var postArray = [];
  for(const post of allPosts){
    let tags = post['_embedded']["wp:term"][1];
    for(const tag of tags){
      if(tag.name === filteredTag){
          postArray.push(post);
      }
    }
  }
  return postArray;
}

function displayArticles(htmlTag){
    var filtered = tagFilter(htmlTag);
    if(htmlTag === 'all'){
        filtered = allPosts;
    }
    let template = '';
    let jumboTemplate = '';

      filtered.forEach(function(post,i){
        console.log(i);
        const img = post['_embedded']["wp:featuredmedia"][0].source_url;
        if (i == 0 || i ==1){
            let excerpt = post['excerpt']['rendered'];
            excerpt = excerpt.slice(0,100) + '...</p>';
            jumboTemplate+= `
            <div class="jumboContainer fadeIn posts">
              <a class="jumbo-thumbnail" href="${post.link}">
              <img src="${img}">
              </a>

              <span>${excerpt}</span>
            </div>
            `;
        }else
        template+= `
          <a class="post-thumbnail fadeIn posts" href="${post.link}">
          <img src="${img}">
          </a>
        `;
    });
      $("#jumbo-display").html(jumboTemplate);
      $("#post-display").html(template);
      show();
}
function show(){
    var posts = document.getElementsByClassName('posts');
    console.log(posts);
    Array.from(posts).forEach(function(post){
        post.classList.remove('fadeIn');
    });
}
