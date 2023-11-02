$(document).ready(async function() {
  try {
    let person = await superagent.get(`https://api.jikan.moe/v4/people/${personID}/full`)
    person = person.body?.data;
    loadPersonInfo(person)
    loadAnime(person.anime, ".anime .anime-list")
    loadAnimeVoice(person.voices, ".anime .anime-list")
    loadCharacter(person.voices, ".characters .character-list")
  } catch (e) {
    console.log(e)
  }
})

function loadPersonInfo(person) {
  $("title").text(`${person.name} - Anime Hub`)
  $(".person-top-title").attr("href", `/person/${person.mal_id}`).text(person.name)

  $(".basic-info .thumbnail-con img").attr("src", `${person.images?.jpg?.large_image_url ? person.images?.jpg?.large_image_url : person.images?.jpg?.image_url}`).attr("alt", person.name)

  $(".basic-info .info .content .person-name").html(`<b>Name: </b>${person.name}`)
  $(".basic-info .info .content .person-alternative-names").html(`<b>Alternative Names: </b>${person.given_name ? `${person.given_name}; ` : ""}${person.family_name ? `${person.family_name}; ` : ""}${person.alternate_names ? person.alternate_names.join("; ") : ""}`)
  $(".basic-info .info .content .person-birthday").html(`<b>Birthday: </b>${person.birthday ? moment(person.birthday).format("DD/MM/YYYY") : "None"}`)
  $(".basic-info .info .content .person-favorites").html(`<b>Favorites: </b>${person.favorites ? person.favorites.toLocaleString("vi-VN") : "None"}`)
  $(".basic-info .info .content .person-website").html(`<b>Website: </b>${person.website_url ? `<a href="${person.website_url}" class="link">${person.name}</a>` : "None"}`)

  //About
  $(".basic-info .info .content .person-about")
  .html(person.about ? `<b>About:</b> ${person.about.replace(/(https?:\/\/\S+)/g, "<a href='$1' class='link'>$1</a>").replace(/\n/g, '<br>').substring(0, 450)}${person.about.length > 450 ? "..." : ""}` : "<b>About: </b>None")

  if (person.about?.length > 450) {
    let readMoreBtn = $(document.createElement("button")).addClass("read-more").text("Read More")
    $(".basic-info .info .content .person-about").append(readMoreBtn)

    $(readMoreBtn).on("click", function() {
      if ($('.basic-info .info .content .person-about .read-more').text().toLowerCase() === 'read more') {
        $('.basic-info .info .content .person-about').html(`<b>About:</b> ${person.about.replace(/(https?:\/\/\S+)/g, "<a href='$1' class='link'>$1</a>").replace(/\n/g, '<br>')}`)
      }
    })
  }
  
  $(".basic-info .info .content .person-link").html(`<b>Link:</b> <a href="${person.url}" class="link"> MyAnimeList</a>`)
}

function loadAnime(animeList, address) {
  $(`${address}`).html("")

  animeList.forEach((data) => {

    let enter = $(document.createElement("br"))

    let animeItem = $(document.createElement("div")).addClass("anime-item")
    $(`${address}`).append(animeItem)

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

    let animePosition = $(document.createElement("small")).addClass("text-muted").text(data.position)
    $(animeContent).append(animePosition)
  })
}

function loadAnimeVoice(animeList, address) {

  animeList.forEach((data) => {

    let enter = $(document.createElement("br"))

    let animeItem = $(document.createElement("div")).addClass("anime-item")
    $(`${address}`).append(animeItem)

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

    let animePosition = $(document.createElement("small")).addClass("text-muted").text(`Voice - ${data.character.name}`)
    $(animeContent).append(animePosition)
  })
}

function loadCharacter(characterList, address) {
  $(`${address}`).html("")
  
  characterList.forEach((data) => {

    let enter = $(document.createElement("br"))

    let characterItem = $(document.createElement("div")).addClass("character-item")
    $(`${address}`).append(characterItem)

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

    let characterAnime = $(document.createElement("small")).addClass("text-muted").text(`${data.role} - ${data.anime.title}`)
    $(characterContent).append(characterAnime)
  })
}