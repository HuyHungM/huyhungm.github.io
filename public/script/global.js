$(document).ready(function() {

  $(window).scroll(function() {
    if ($(this).scrollTop() > 20) {
      $('#scroll-to-top').fadeIn();
    } else {
      $('#scroll-to-top').fadeOut();
    }
  });

  $('#scroll-to-top').click(function() {
    $('html, body').animate({scrollTop : 0},800);
    return false;
  });

  $(".search-bar").on("submit", function(event) {
    event.preventDefault();

    let searchQuery = $("#search-input").val()

    location.href = `/search?query=${encodeURIComponent(searchQuery)}&page=1`
  })
})

function loaderFunction() {
  myVar = setTimeout(showPage, 1400);
}

function showPage() {
  $(".loader").css("display", "none")
}

function loadPagination(pagination) {

  let currentPage = pagination.current_page
  let totalPages = pagination.last_visible_page

  var startPage = Math.max(1, currentPage - 2);
  var endPage = Math.min(startPage + 4, totalPages);

  var firstPage = $(document.createElement('li')).addClass("page");
  var firstPageLink = $(document.createElement('a')).attr("href", `/${listType.toLowerCase()}?page=1`).text("Start");
  if (listType.toLowerCase() === "search") $(firstPageLink).attr("href", `/${listType.toLowerCase()}?query=${encodeURIComponent(searchQuery)}&page=1`)
  if (currentPage === 1) {
    $(firstPageLink).addClass("disable").attr("href", "#")
    $(firstPageLink).on("click", function(event) {
      event.preventDefault()

      $("html, body").animate({scrollTop: 0}, "slow");
      return false;
    })
  }

  $(firstPage).append(firstPageLink);
  $("#pagination").append(firstPage);

  for (var i = startPage; i <= endPage; i++) {
    var page = $(document.createElement('li')).addClass("page");
    var pageLink = $(document.createElement('a')).attr("href", `/${listType.toLowerCase()}?page=${i}`).text(i);
    if (listType.toLowerCase() === "search") $(pageLink).attr("href", `/${listType.toLowerCase()}?query=${encodeURIComponent(searchQuery)}&page=${i}`)

    if (i === currentPage) {
      $(pageLink).addClass("active").attr("href", "#");
      $(pageLink).on("click", function(event) {
        event.preventDefault()
  
        $("html, body").animate({scrollTop: 0}, "slow");
        return false;
      })
    }

    $("#pagination").append(page);
    $(page).append(pageLink);
  }

  var pageFormLi = $(document.createElement('li')).addClass("page");
  $("#pagination").append(pageFormLi)
  var pageForm = $(document.createElement("form")).addClass("page-form")
  $(pageFormLi).append(pageForm)
  var pageInput = $(document.createElement("input")).attr("id", "page-input").attr("placeholder", "...").attr("type", "number").attr("max", totalPages).attr("min", 1).attr("required", true)
  $(pageForm).append(pageInput)

  $(pageForm).on("submit", function(event) {
    event.preventDefault();
    
    var pageValue = $("#page-input").val()
    location.href = `/${listType.toLowerCase()}?query=${encodeURIComponent(searchQuery)}&page=${pageValue}`
  })


  var lastPage = $(document.createElement('li')).addClass("page");
  var lastPageLink = $(document.createElement('a')).attr("href", `/${listType.toLowerCase()}?page=${totalPages}`).text("End");
  if (listType.toLowerCase() === "search") $(lastPageLink).attr("href", `/${listType.toLowerCase()}?query=${encodeURIComponent(searchQuery)}&page=${totalPages}`)
  if (currentPage === totalPages) {
    $(lastPageLink).addClass("disable").attr("href", "#")
    $(lastPageLink).on("click", function(event) {
      event.preventDefault()

      $("html, body").animate({scrollTop: 0}, "slow");
      return false;
    })
  }

  $(lastPage).append(lastPageLink);
  $("#pagination").append(lastPage);
}