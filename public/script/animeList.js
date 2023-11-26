$(document).ready(async function() {

  let Link = "https://api.jikan.moe/v4/top/anime";
  listType = listType.toLowerCase()

  if (listType === "airing now") Link = `https://api.jikan.moe/v4/seasons/now?page=${page}&limit=25`
  else if (listType === "popular") Link = `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${page}&limit=25`
  else if (listType === "airing") Link = `https://api.jikan.moe/v4/top/anime?filter=airing&page=${page}&limit=25`
  else if (listType === "upcoming") Link = `https://api.jikan.moe/v4/top/anime?filter=upcoming&page=${page}&limit=25`
  else if (listType === "favorite") Link = `https://api.jikan.moe/v4/top/anime?filter=favorite&page=${page}&limit=25`
  else if (listType === "search") {
    Link = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchQuery)}&page=${page}&limit=25`
    $("#search-input").val(searchQuery)
  }

  let animeList = await superagent.get(Link)
  let pagination = animeList.body?.pagination
  animeList = animeList.body?.data;

  loadAnime(animeList, ".main-part .anime-list")
  loadPagination(pagination);
})

function loadAnime(animeList, address) {

  if (animeList.length === 0) {
    $(document.createElement("div")).addClass("no-anime").text("No Anime Found").appendTo(`.${$(address).parent().attr("class").split(" ").join(".")}`)
    return $(address).remove()
  }

  $(address).html("")

  animeList.forEach((anime) => {
    let animeItem = $(document.createElement("div")).addClass("anime-item")
    $(address).append(animeItem)

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