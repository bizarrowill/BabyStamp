$(document).ready(function() {
  // Getting a reference to the input field where user adds a new nap
  var $newItemInput = $("input.new-item");
  // Our new naps will go inside the napContainer
  var $napContainer = $(".nap-container");
  // Adding event listeners for deleting, editing, and adding naps
  $(document).on("click", "button.delete", deleteNap);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".nap-item", editNap);
  $(document).on("keyup", ".nap-item", finishEdit);
  $(document).on("blur", ".nap-item", cancelEdit);
  $(document).on("submit", "#nap-form", insertNap);

  // Our initial naps array
  var naps = [];

  // Getting naps from database when page loads
  getNaps();

  // This function resets the naps displayed with new naps from the database
  function initializeRows() {
    $napContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < naps.length; i++) {
      rowsToAdd.push(createNewRow(naps[i]));
    }
    $napContainer.prepend(rowsToAdd);
  }

  // This function grabs naps from the database and updates the view
  function getNaps() {
    $.get("/api/naps", function(data) {
      naps = data;
      initializeRows();
    });
  }

  // This function deletes a nap when the user clicks the delete button
  function deleteNap(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/naps/" + id
    }).then(getNaps);
  }

  // This function handles showing the input box for a user to edit a nap
  function editNap() {
    var currentNap = $(this).data("nap");
    $(this).children().hide();
    $(this).children("input.edit").val(currentNap.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var nap = $(this).parent().data("nap");
    nap.complete = !nap.complete;
    updateNap(nap);
  }

  // This function starts updating a nap in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit() {
    var updatedNap = $(this).data("nap");
    if (event.which === 13) {
      updatedNap.text = $(this).children("input").val().trim();
      $(this).blur();
      updateNap(updatedNap);
    }
  }

  // This function updates a nap in our database
  function updateNap(nap) {
    $.ajax({
      method: "PUT",
      url: "/api/naps",
      data: nap
    }).then(getNaps);
  }

  // This function is called whenever a nap item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentNap = $(this).data("nap");
    if (currentNap) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentNap.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a nap-item row
  function createNewRow(nap) {
    var $newInputRow = $(
      [
        "<li class='list-group-item nap-item'>",
        "<span>",
        nap.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-default'>x</button>",
        "<button class='complete btn btn-default'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", nap.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("nap", nap);
    if (nap.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new nap into our database and then updates the view
  function insertNap(event) {
    event.preventDefault();
    var nap = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/naps", nap, getNaps);
    $newItemInput.val("");
  }
});
