$(document).ready( async function() {
  let recommendedAnime = await superagent.get("https://api.jikan.moe/v4/recommendations/anime?page=1");
  recommendedAnime = recommendedAnime.body?.data[0]?.entry[0];
  loadRecommendAnime(recommendedAnime)

  let popularAnime = await superagent.get("https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=1&limit=15")
  popularAnime = popularAnime.body?.data
  loadAnime(popularAnime, ".popular .anime-list")

  setTimeout(async function() {
    let upcomingAnime = await superagent.get("https://api.jikan.moe/v4/top/anime?filter=upcoming&page=1&limit=15")
    upcomingAnime = upcomingAnime.body?.data
    loadAnime(upcomingAnime, ".upcoming .anime-list")
  }, 1000)

  setTimeout(async function() {
    let airingAnime = await superagent.get("https://api.jikan.moe/v4/top/anime?filter=airing&page=1&limit=15")
    airingAnime = airingAnime.body?.data
    loadAnime(airingAnime, ".airing .anime-list")
  }, 2000)

  setTimeout(async function() {
    let favoriteAnime = await superagent.get("https://api.jikan.moe/v4/top/anime?filter=favorite&page=1&limit=15")
    favoriteAnime = favoriteAnime.body?.data
    loadAnime(favoriteAnime, ".favorite .anime-list")
  }, 3000)
})

function loadAnime(animeList, address) {
  $(`${address}`).html("")

  animeList.forEach((anime) => {
    let animeItem = $(document.createElement("div")).addClass("anime-item")
    $(`${address}`).append(animeItem)

    let animeLinkThumbnail = $(document.createElement("a")).attr("href", `/anime/${anime.mal_id}`)
    $(animeItem).append(animeLinkThumbnail)

    let animeThumbnail = $(document.createElement("div")).addClass("thumbnail")
    $(animeLinkThumbnail).append(animeThumbnail)

    let animeThumbnailImg = $(document.createElement("img")).attr("src", `${anime.images?.jpg?.large_image_url ? anime.images?.jpg?.large_image_url : anime.images?.jpg?.image_url}`).attr("alt", anime.title)
    $(animeThumbnail).append(animeThumbnailImg)

    let animeContent = $(document.createElement("div")).addClass("content")
    $(animeItem).append(animeContent)

    let animeContentLink = $(document.createElement("a")).attr("href", `/anime/${anime.mal_id}`)
    $(animeContent).append(animeContentLink)

    let animeName = $(document.createElement("span")).addClass("name").text(anime.title)
    $(animeContentLink).append(animeName)
  })
}

function loadRecommendAnime(anime) {
  $(".recommend").html("")

  $(document.createElement("div")).addClass("title").html("<b>Recommended</b> to you").appendTo(".recommend")

  let animeLink = $(document.createElement("a")).attr('href', `/anime/${anime?.mal_id}`)
  $(".recommend").append(animeLink)

  let animeCenter = $(document.createElement("div")).addClass("center")
  $(animeLink).append(animeCenter)

  let animeImg = $(document.createElement("img")).attr("src", `${anime?.images?.jpg?.large_image_url ? anime?.images?.jpg?.large_image_url : anime?.images?.jpg?.image_url}`).attr("alt", anime?.title).addClass("thumbnail")
  $(animeCenter).append(animeImg)

  let animeContent = $(document.createElement("div")).addClass("content")
  $(animeCenter).append(animeContent)

  let animeName = $(document.createElement("span")).addClass("name").text(anime?.title)
  $(animeContent).append(animeName)
}