$(document).ready(async function() {
  try {
    let anime = await superagent.get(`https://api.jikan.moe/v4/anime/${animeID}/full`);
    anime = anime.body?.data
    loadAnimeInfo(anime)

    setTimeout(async function() {
      let characters = await superagent.get(`https://api.jikan.moe/v4/anime/${animeID}/characters`)
      characters = characters.body?.data;
      loadCharacter(characters, ".characters .character-list")
    }, 1000)

    setTimeout(async function() {
      let pictures = await superagent.get(`https://api.jikan.moe/v4/anime/${animeID}/pictures`)
      pictures = pictures.body?.data
      loadPicture(anime, pictures, ".pictures .picture-list")
    }, 2000)

    setTimeout(async function() {
      let musicVideos = await superagent.get(`https://api.jikan.moe/v4/anime/${animeID}/videos`)
      musicVideos = musicVideos.body?.data.music_videos
      loadMusicVideo(anime, musicVideos, ".music-videos .music-video-list")
    }, 3000)

  } catch (e) {
    location.href = "/404"
  }
})

function loadAnimeInfo(anime) {
  $("title").text(`${anime.title} - Anime Hub`)
  $(".anime-top-title").attr("href", `/anime/${anime.mal_id}`).text(anime.title)

  $(".basic-info .thumbnail-con img").attr("src", `${anime.images?.jpg?.large_image_url ? anime.images?.jpg?.large_image_url : anime.images?.jpg?.image_url}`).attr("alt", anime.title)

  $(".basic-info .info .content .anime-title").html(`<b>Title: </b>${anime.title}`)
  $(".basic-info .info .content .anime-alternative-title").html(`<b>Alternative Title: </b>${(anime.titles.length > 0) ? anime.titles.map((x) => x.title).join("; ") : "None"}`)
  $(".basic-info .info .content .anime-score").html(`<b>Score: </b>${anime.score ? anime.score.toLocaleString("vi-VN") : "None"}`)
  $(".basic-info .info .content .anime-scored-by").html(`<b>Scored by: </b>${anime.scored_by ? anime.scored_by.toLocaleString("vi-VN") : `None`}`)
  $(".basic-info .info .content .anime-rank").html(`<b>Rank: </b>${anime.rank ? `#${anime.rank.toLocaleString("vi-VN")}` : "None"}`)
  $(".basic-info .info .content .anime-duration").html(`<b>Duration: </b>${anime.duration ? anime.duration : "None"}`)
  $(".basic-info .info .content .anime-episodes").html(`<b>Episodes: </b>${anime.episodes ? anime.episodes : "None"}`)
  $(".basic-info .info .content .anime-rating").html(`<b>Rating: </b>${anime.rating ? anime.rating.replace(/\b\w/g, (match) => match.toUpperCase()) : "None"}`)
  $(".basic-info .info .content .anime-season").html(`<b>Season: </b>${anime.season ? anime.season.replace(/\b\w/g, (match) => match.toUpperCase()) : "None"}${anime.year ? ` - ${anime.year}` : ``}`)
  $(".basic-info .info .content .anime-type").html(`<b>Type: </b>${anime.type ? anime.type : "None"}`)
  $(".basic-info .info .content .anime-source").html(`<b>Source: </b>${anime.source ? anime.source : "None"}`)
  $(".basic-info .info .content .anime-favorites").html(`<b>Favorites: </b>${anime.favorites ? anime.favorites.toLocaleString("vi-VN") : "None"}`)
  $(".basic-info .info .content .anime-status").html(`<b>Status: </b>${anime.status ? anime.status : "None"}`)
  $(".basic-info .info .content .anime-aired").html(`<b>Aired: </b>${anime.aired?.string ? anime.aired?.string : "None"}`)

  if (anime.studios?.length > 0) {
    anime.studios.forEach((studio) => {
      $(document.createElement("a")).addClass("link").attr("href", `/producer/${studio.mal_id}`).text(studio.name).appendTo(".basic-info .info .content .anime-studios")
    })
  } else {
    $(".basic-info .info .content .anime-studios").html(`<b>Studios: </b>None`)
  }

  if (anime.relations?.length > 0) {
    anime.relations.forEach((relation) => {
      relation.entry.forEach((x, index) => {
        if (x.type === "anime") {
          $(document.createElement("a")).attr("href", `/anime/${x.mal_id}`).text(`${x.name}; `).appendTo(".basic-info .info .content .anime-relations")
        }
      })
    })
  } else {
    $(".basic-info .info .content .anime-relations").html(`<b>Relations: </b>None`)
  }
  $(".basic-info .info .content .anime-link").html(`<b>Link:</b> <a href="${anime.url}" class="link">MyAnimeList</a>`)

  //Trailer
  $(document.createElement("iframe")).attr("src", `${anime.trailer?.embed_url ? anime.trailer?.embed_url : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}`).attr("title", anime.title).attr("width", "600").attr("height", "400").attr("allow", "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture").attr("allowFullScreen", true).appendTo(".trailer .trailer-con")

  //Description
  $(".description .content p").html(anime.synopsis ? `${anime.synopsis?.substring(0, 450).replace(/\n/g, '<br>')}${anime.synopsis?.length > 450 ? "..." : ""}` : "None")

  if (anime.synopsis?.length > 450) {
    let readMoreBtn = $(document.createElement("button")).addClass("read-more").text("Read More")
    $(".description .content p").append(readMoreBtn)

    $(readMoreBtn).on("click", function() {
      if ($('.description .content p .read-more').text().toLowerCase() === 'read more') {
        $('.description .content p').html(anime.synopsis.replace(/\n/g, '<br>'))
      }
    })
  }
}

function loadCharacter(characterList, address) {
  $(address).html("")

  characterList.forEach((data) => {

    let enter = $(document.createElement("br"))

    let characterItem = $(document.createElement("div")).addClass("character-item")
    $(address).append(characterItem)

    let characterLinkThumbnail = $(document.createElement("a")).attr("href", `/character/${data.character.mal_id}`)
    $(characterItem).append(characterLinkThumbnail)

    let characterThumbnail = $(document.createElement("div")).addClass("thumbnail")
    $(characterLinkThumbnail).append(characterThumbnail)

    let characterThumbnailImg = $(document.createElement("img")).attr("src", `${data.character.images?.jpg?.large_image_url ? data.character.images?.jpg?.large_image_url : data.character.images?.jpg?.image_url}`).attr("alt", data.character.name)
    $(characterThumbnail).append(characterThumbnailImg)

    let characterContent = $(document.createElement("div")).addClass("content")
    $(characterItem).append(characterContent)

    let characterContentLink = $(document.createElement("a")).attr("href", `/character/${data.character.mal_id}`)
    $(characterContent).append(characterContentLink)

    let characterName = $(document.createElement("span")).addClass("name").text(data.character.name)
    $(characterContentLink).append(characterName)

    $(characterContent).append(enter)

    let characterRole = $(document.createElement("small")).addClass("text-muted").text(data.role)
    $(characterContent).append(characterRole)
  })
}

function loadPicture(anime, pictureList, address) {
  if (pictureList?.length === 0) return $(address).parent().parent().remove()
  $(address).html("")

  pictureList.forEach((picture) => {

    let pictureItem = $(document.createElement("div")).addClass("picture-item")
    $(address).append(pictureItem)

    let pictureThumbnail = $(document.createElement("div")).addClass("thumbnail")
    $(pictureItem).append(pictureThumbnail)

    let pictureThumbnailImg = $(document.createElement("img")).attr("src", `${picture.jpg?.image_url}`).attr("alt", anime.title)
    $(pictureThumbnail).append(pictureThumbnailImg)
  })
}

function loadMusicVideo(anime, musicVideoList, address) {
  if (musicVideoList?.length === 0) return $(address).parent().parent().remove()
  $(address).html("")

  musicVideoList.forEach((data) => {

    let enter = $(document.createElement("br"))

    let musicVideoItem = $(document.createElement("div")).addClass("music-video-item")
    $(address).append(musicVideoItem)

    let videoContainer = $(document.createElement("div")).addClass("video-con")
    $(musicVideoItem).append(videoContainer)

    let videoIframe = $(document.createElement("iframe")).attr("src", `${data.video?.embed_url ? data.video?.embed_url : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}`).attr("title", data.meta.title).attr("width", "600").attr("height", "400").attr("allow", "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture").attr("allowFullScreen", true)
    $(videoContainer).append(videoIframe)

    let videoContent = $(document.createElement("div")).addClass("content")
    $(musicVideoItem).append(videoContent)

    let videoName = $(document.createElement("span")).addClass("name").html(`<a href="${data.video.url}"><b>${data.meta.title ? data.meta.title : ""}</b> - ${data.meta.author ? data.meta.author : ""}</a>`)
    $(videoContent).append(videoName)

    $(videoContent).append(enter)

    let videoSmall = $(document.createElement("small")).addClass("text-muted").text(data.title)
    $(videoContent).append(videoSmall)
  })
}