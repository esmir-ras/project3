
    let state = {
      posts: [],
      baseUrl: 'https://getsomeapi.com/wp-json/wp/v2/posts',
      perPage: '?per_page=12',
    //   wpFetchHeaders: {
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Expose-Headers': 'x-wp-total'
    //     }
    //   }
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
          var html = "";
          for (let i = 0; i < state.posts.length; i++) {
            if(i > 11){
              break;
            }
            if(i == 0){
              html += '<div class="carousel-item active">';
              html += '<div class="row">';
            }
            id = state.posts[i].id;
            html += '<div class="col-md-3 mb-3">';
            html += '<div class="card">';
            html += '<img class="img-fluid" alt="100%x280" src="'+state.posts[i].jetpack_featured_media_url+'">';
            html += '<div class="card-body">';
            html += '<h4 class="card-title">'+state.posts[i].title.rendered+'</h4>';
            html += '</div></div></div>';
            if(i == 3 || i == 7){
              html += '</div></div>'
              html += '<div class="carousel-item">';
              html += '<div class="row">';
            }
            
          }
          $('#row').append(html);
      })


  