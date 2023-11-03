$(document).ready(async function() {
  try {
    let producer = await superagent.get(`https://api.jikan.moe/v4/producers/${producerID}/full`)
    producer = producer.body?.data;
    loadProducerInfo(producer)
  } catch (e) {
    console.log(e)
  }
})

function loadProducerInfo(producer) {
  $("title").text(`${producer.titles[0].title} - Anime Hub`)
  $(".producer-top-title").attr("href", `/producer/${producer.mal_id}`).text(producer.titles[0].title)

  $(".basic-info .thumbnail-con img").attr("src", `${producer.images?.jpg?.large_image_url ? producer.images?.jpg?.large_image_url : producer.images?.jpg?.image_url}`).attr("alt", producer.titles[0].title)

  $(".basic-info .info .content .producer-title").html(`<b>Title: </b>${producer.titles[0].title}`)
  $(".basic-info .info .content .producer-alternative-titles").html(`<b>Alternative Titles: </b>${(producer.titles.length > 1) ? "" : "None"}`)
  if (producer.titles.length > 1) {
    for (var i = 1; i < producer.titles.length; i++) {
      $(".basic-info .info .content .producer-alternative-titles").append(`${producer.titles[i].title} (${producer.titles[i].type});`)
    }
  }

  $(".basic-info .info .content .producer-anime-count").html(`<b>Anime Count: </b>${producer.count}`)
  $(".basic-info .info .content .producer-favorites").html(`<b>Favorites: </b>${producer.favorites ? producer.favorites.toLocaleString("vi-VN") : "None"}`)
  $(".basic-info .info .content .producer-established").html(`<b>Established: </b>${producer.established ? moment(producer.established).format("DD/MM/YYYY") : "None"}`)
  $(".basic-info .info .content .producer-external").html(`<b>External: </b>${producer.external.length > 0 ? "" : "None"}`)
  if (producer.external.length > 0) {
    producer.external.forEach((data) => {
      $(".basic-info .info .content .producer-external").append(`<a href="${data.url}" class="link">${data.name}</a>; `)
    })
  }

  //About
  $(".basic-info .info .content .producer-about")
  .html(producer.about ? `<b>About:</b> ${producer.about.replace(/(https?:\/\/\S+)/g, "<a href='$1' class='link'>$1</a>").replace(/\n/g, '<br>').substring(0, 450)}${producer.about.length > 450 ? "..." : ""}` : "<b>About: </b>None")

  if (producer.about?.length > 450) {
    let readMoreBtn = $(document.createElement("button")).addClass("read-more").text("Read More")
    $(".basic-info .info .content .producer-about").append(readMoreBtn)

    $(readMoreBtn).on("click", function() {
      if ($('.basic-info .info .content .producer-about .read-more').text().toLowerCase() === 'read more') {
        $('.basic-info .info .content .producer-about').html(`<b>About:</b> ${producer.about.replace(/(https?:\/\/\S+)/g, "<a href='$1' class='link'>$1</a>").replace(/\n/g, '<br>')}`)
      }
    })
  }
  
  $(".basic-info .info .content .producer-link").html(`<b>Link:</b> <a href="${producer.url}" class="link">MyAnimeList</a>`)
}