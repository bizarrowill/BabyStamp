$(document).ready(function() {
  // Getting a reference to the input field where user adds a new stamp
  var $newItemInput = $("input.new-item");
  // Our new stamps will go inside the stampContainer
  var $stampContainer = $(".stamp-container");
  // Adding event listeners for deleting, editing, and adding stamps
  $(document).on("click", "button.delete", deleteStamp);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".stamp-item", editStamp);
  $(document).on("keyup", ".stamp-item", finishEdit);
  $(document).on("blur", ".stamp-item", cancelEdit);
  $(document).on("submit", "#stamp-form", insertStamp);

  // Our initial stamps array
  var stamps = [];

  // Getting stamps from database when page loads
  getStamps();

  // This function resets the stamps displayed with new stamps from the database
  function initializeRows() {
    $stampContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < stamps.length; i++) {
      rowsToAdd.push(createNewRow(stamps[i]));
    }
    $stampContainer.prepend(rowsToAdd);
  }

  // This function grabs stamps from the database and updates the view
  function getStamps() {
    $.get("/api/stamps", function(data) {
      stamps = data;
      initializeRows();
    });
  }

  // This function deletes a stamp when the user clicks the delete button
  function deleteStamp(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/stamps/" + id
    }).then(getStamps);
  }

  // This function handles showing the input box for a user to edit a stamp
  function editStamp() {
    var currentStamp = $(this).data("stamp");
    $(this).children().hide();
    $(this).children("input.edit").val(currentStamp.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var stamp = $(this).parent().data("stamp");
    stamp.complete = !stamp.complete;
    updateStamp(stamp);
  }

  // This function starts updating a stamp in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit() {
    var updatedStamp = $(this).data("stamp");
    if (event.which === 13) {
      updatedStamp.text = $(this).children("input").val().trim();
      $(this).blur();
      updateStamp(updatedStamp);
    }
  }

  // This function updates a stamp in our database
  function updateStamp(stamp) {
    $.ajax({
      method: "PUT",
      url: "/api/stamps",
      data: stamp
    }).then(getStamps);
  }

  // This function is called whenever a stamp item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentStamp = $(this).data("stamp");
    if (currentStamp) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentStamp.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a stamp-item row
  function createNewRow(stamp) {
    var $newInputRow = $(
      [
        "<li class='list-group-item stamp-item'>",
        "<span>",
        stamp.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-default'>x</button>",
        "<button class='complete btn btn-default'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", stamp.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("stamp", stamp);
    if (stamp.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new stamp into our database and then updates the view
  function insertStamp(event) {
    event.preventDefault();
    var stamp = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/stamps", stamp, getStamps);
    $newItemInput.val("");
  }
});
