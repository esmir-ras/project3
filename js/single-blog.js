    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    
    $.ajax({
      type: "GET",
      url: "https://getsomeapi.com/wp-json/wp/v2/posts/" + id,
    }).done(function (data) {
        document.getElementById('row').innerHTML = "";
        var html = $('<div class="col-md-8 mt-3" style="margin: 0 auto;">');
            html.append('<h1 class="mt-3 mb-3" style="text-align : center;">' + data.title.rendered + '</h1>')
            html.append('<div style="text-align : center;">' + data.content.rendered + '</div>')
            html.append('</div>');
        $('#row').append(html);
    });
  