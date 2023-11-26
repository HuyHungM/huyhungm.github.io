$(document).ready(async function() {
  try {
    let character = await superagent.get(`https://api.jikan.moe/v4/characters/${characterID}/full`)
    character = character.body?.data;
    loadCharacterInfo(character)
    loadAnime(character.anime, ".appear-in .anime-list")
    loadVoiceActor(character.voices, ".voice-actors .voice-actor-list")
  } catch (e) {
    console.log(e)
  }
})

function loadCharacterInfo(character) {
  $("title").text(`${character.name} - Anime Hub`)
  $(".character-top-title").attr("href", `/character/${character.mal_id}`).text(character.name)

  $(".basic-info .thumbnail-con img").attr("src", `${character.images?.jpg?.large_image_url ? character.images?.jpg?.large_image_url : character.images?.jpg?.image_url}`).attr("alt", character.name)

  $(".basic-info .info .content .character-name").html(`<b>Name: </b>${character.name}${character.name_kanji ? ` - ${character.name_kanji}` : ""}`)
  $(".basic-info .info .content .character-nicknames").html(`<b>Nicknames: </b>${(character.nicknames?.length > 0) ? character.nicknames.join("; ") : "None"}`)
  $(".basic-info .info .content .character-favorites").html(`<b>Favorites: </b>${character.favorites ? character.favorites.toLocaleString("vi-VN") : "None"}`)

  //About
  $(".basic-info .info .content .character-about").html(character.about ? `<b>About: </b> ${character.about?.substring(0, 450).replace(/\n/g, '<br>')}${character.about?.length > 450 ? "..." : ""}` : "<b>About: </b>None")

  if (character.about?.length > 450) {
    let readMoreBtn = $(document.createElement("button")).addClass("read-more").text("Read More")
    $(".basic-info .info .content .character-about").append(readMoreBtn)

    $(readMoreBtn).on("click", function() {
      if ($('.basic-info .info .content .character-about .read-more').text().toLowerCase() === 'read more') {
        $('.basic-info .info .content .character-about').html("<b>About: </b>" + character.about.replace(/\n/g, '<br>'))
      }
    })
  }
  
  $(".basic-info .info .content .character-link").html(`<b>Link:</b> <a href="${character.url}" class="link">MyAnimeList</a>`)
}

function loadAnime(animeList, address) {
  $(address).html("")

  animeList.forEach((data) => {

    let enter = $(document.createElement("br"))

    let animeItem = $(document.createElement("div")).addClass("anime-item")
    $(address).append(animeItem)

    let animeLinkThumbnail = $(document.createElement("a")).attr("href", `/anime/${data.anime.mal_id}`)
    $(animeItem).append(animeLinkThumbnail)

    let animeThumbnail = $(document.createElement("div")).addClass("thumbnail")
    $(animeLinkThumbnail).append(animeThumbnail)

    let animeThumbnailImg = $(document.createElement("img")).attr("src", `${data.anime.images?.jpg?.large_image_url ? data.anime.images?.jpg?.large_image_url : data.anime.images?.jpg?.image_url}`).attr("alt", data.anime.title)
    $(animeThumbnail).append(animeThumbnailImg)

    let animeContent = $(document.createElement("div")).addClass("content")
    $(animeItem).append(animeContent)

    let animeContentLink = $(document.createElement("a")).attr("href", `/anime/${data.anime.mal_id}`)
    $(animeContent).append(animeContentLink)

    let animeName = $(document.createElement("span")).addClass("name").text(data.anime.title)
    $(animeContentLink).append(animeName)

    $(animeContent).append(enter)

    let animeRole = $(document.createElement("small")).addClass("text-muted").text(data.role)
    $(animeContent).append(animeRole)
  })
}

function loadVoiceActor(voiceActorList, address) {
  $(address).html("")

  voiceActorList.forEach((voice) => {

    let enter = $(document.createElement("br"))

    let voiceActorItem = $(document.createElement("div")).addClass("voice-actor-item")
    $(address).append(voiceActorItem)

    let voiceActorLinkThumbnail = $(document.createElement("a")).attr("href", `/person/${voice.person.mal_id}`)
    $(voiceActorItem).append(voiceActorLinkThumbnail)

    let voiceActorThumbnail = $(document.createElement("div")).addClass("thumbnail")
    $(voiceActorLinkThumbnail).append(voiceActorThumbnail)

    let voiceActorThumbnailImg = $(document.createElement("img")).attr("src", `${voice.person.images?.jpg?.large_image_url ? voice.person.images?.jpg?.large_image_url : voice.person.images?.jpg?.image_url}`).attr("alt", voice.person.name)
    $(voiceActorThumbnail).append(voiceActorThumbnailImg)

    let voiceActorContent = $(document.createElement("div")).addClass("content")
    $(voiceActorItem).append(voiceActorContent)

    let voiceActorContentLink = $(document.createElement("a")).attr("href", `/person/${voice.person.mal_id}`)
    $(voiceActorContent).append(voiceActorContentLink)

    let voiceActorName = $(document.createElement("span")).addClass("name").text(voice.person.name)
    $(voiceActorContentLink).append(voiceActorName)

    $(voiceActorContent).append(enter)

    let voiceActorLanguage = $(document.createElement("small")).addClass("text-muted").text(voice.language)
    $(voiceActorContent).append(voiceActorLanguage)
  })
}