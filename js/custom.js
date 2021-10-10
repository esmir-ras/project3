
    let state = {
      posts: [],
      baseUrl: 'https://getsomeapi.com/wp-json/wp/v2/posts',
      perPage: '?per_page=10',

    }

    async function getNumPosts() {
      const { headers } = await axios(`${state.baseUrl}${state.perPage}`, state.wpFetchHeaders)
      return headers['x-wp-totalpages']
    }

    async function fetchPosts(numPages) {
      const posts = []

      for (let page = 1; page <= numPages; page += 1) {
        const post = axios.get(`${state.baseUrl}${state.perPage}&page=${page}`, state.wpFetchHeaders)
        posts.push(post)
      }

      await axios.all(posts).then((response) => {
        const postData = response.map(res => res.data)
        state.posts = postData.flat()
      }).catch(e => console.log('error fetching posts: ', e))

      return true
    }

      state.posts = getNumPosts()
      .then(numPosts => fetchPosts(numPosts))
      .then((data) => {
        console.log('data ', state)
        document.getElementById('row').innerHTML = "";
        for (let i = 0; i < state.posts.length; i++) {
            id = state.posts[i].id;
            var html = '<div class="col-md-4 col-sm-6 col-xl-4 my-3">';
            html += '<a href="single-blog.html?id='+id+'"><div  class="card d-block h-100 box-shadow-hover pointer">';
            html += '<div class="pt-3 h-75p align-items-center d-flex justify-content-center">';
            html += '<img class="img-fluid w-xs-120p" src="'+state.posts[i].jetpack_featured_media_url+'"></div><div class="card-body p-4">';
            html += '<h3 class="h4"><strong>'+state.posts[i].title.rendered+'</strong></h3>';
            html += '</div></a></div>';
            $('#row').append(html);
        }
      })


  