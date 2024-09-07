document.addEventListener("DOMContentLoaded", function () {
  const uploadArea = document.getElementById("uploadAreaPP");
  const fileInput = document.getElementById("profile-picture");
  const previewArea = document.getElementById("previewAreaPP");

  // Handle drag events
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
  });

  // Highlight on dragover
  ["dragenter", "dragover"].forEach((eventName) => {
    uploadArea.addEventListener(
      eventName,
      () => uploadArea.classList.add("dragover"),
      false
    );
  });

  // Unhighlight on drag leave or drop
  ["dragleave", "drop"].forEach((eventName) => {
    uploadArea.addEventListener(
      eventName,
      () => uploadArea.classList.remove("dragover"),
      false
    );
  });

  // Handle drop event
  uploadArea.addEventListener("drop", handleDrop, false);

  // Click to open file dialog
  uploadArea.addEventListener("click", () => fileInput.click());

  // Handle file input change event
  fileInput.addEventListener("change", handleFiles, false);

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles({ target: { files: files } });
  }

  function handleFiles(event) {
    const files = event.target.files;
    Array.from(files).forEach((file) => previewFile(file));
  }

  function previewFile(file) {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("preview-item");

      const imgElement = document.createElement("img");
      imgElement.src = reader.result;
      imgElement.classList.add("preview-image");

      const imageDetails = document.createElement("div");
      imageDetails.classList.add("image-details");
      imageDetails.textContent = `Size: ${(file.size / 1024).toFixed(2)} KB`;

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = ` <img class="delete-icon" src="./images/trash.svg" alt="Delete Icon" />`;
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        imgContainer.remove();
      });

      imgContainer.appendChild(imgElement);
      imgContainer.appendChild(imageDetails);
      imgContainer.appendChild(deleteButton);
      previewArea.appendChild(imgContainer);
    };
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const uploadAreaId = document.getElementById("uploadAreaId");
  const fileInputId = document.getElementById("personal-id");
  const previewAreaId = document.getElementById("previewAreaId");

  // Handle drag events
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    uploadAreaId.addEventListener(eventName, preventDefaults, false);
  });

  // Highlight on dragover
  ["dragenter", "dragover"].forEach((eventName) => {
    uploadAreaId.addEventListener(
      eventName,
      () => uploadAreaId.classList.add("dragover"),
      false
    );
  });

  // Unhighlight on drag leave or drop
  ["dragleave", "drop"].forEach((eventName) => {
    uploadAreaId.addEventListener(
      eventName,
      () => uploadAreaId.classList.remove("dragover"),
      false
    );
  });

  // Handle drop event
  uploadAreaId.addEventListener("drop", handleDrop, false);

  // Click to open file dialog
  uploadAreaId.addEventListener("click", () => fileInputId.click());

  // Handle file input change event
  fileInputId.addEventListener("change", handleFiles, false);

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles({ target: { files: files } });
  }

  function handleFiles(event) {
    const files = event.target.files;
    Array.from(files).forEach((file) => previewFile(file));
  }

  function previewFile(file) {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("preview-item");

      const imgElement = document.createElement("img");
      imgElement.src = reader.result;
      imgElement.classList.add("preview-image");

      const imageDetails = document.createElement("div");
      imageDetails.classList.add("image-details");
      imageDetails.textContent = `Size: ${(file.size / 1024).toFixed(2)} KB`;

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = ` <img class="delete-icon" src="./images/trash.svg" alt="Delete Icon" />`;
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        imgContainer.remove();
      });

      imgContainer.appendChild(imgElement);
      imgContainer.appendChild(imageDetails);
      imgContainer.appendChild(deleteButton);
      previewAreaId.appendChild(imgContainer);
    };
  }
});

// Contact Form submission using PHP Mailer
$(document).ready(function () {
  // Reset all error indicators
  $(
    ".form-body .form-input-field-error, .form-body .form-select-field-error"
  ).removeClass("form-input-field-error form-select-field-error");
  $(".form-error").hide();
  $(".form-body").on("submit", function (event) {
    event.preventDefault();

    // Validate the form before submission
    let isValid = validateForm();

    if (isValid) {
      var formData = new FormData(document.querySelector(".form-body"));

      // Disable the submit button and show the loader
      const $submitButton = $(".form-body button[type='submit']");
      $submitButton.prop("disabled", true).addClass("loading");

      $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
          if (response.trim() === "success") {
            $(".form-body")[0].reset();
            // $(".form-body input[type='file']").val("");
            document.getElementById("previewAreaPP").innerHTML = "";
            document.getElementById("previewAreaId").innerHTML = "";
            alert(
              "Thank you! We've received your message and will get back to you shortly."
            );
          } else {
            alert(
              "There was an error trying to send your message. Please try again later."
            );
          }
        },
        error: function () {
          alert(
            "There was an error trying to send your message. Please try again later."
          );
        },
        complete: function () {
          // Re-enable the submit button and hide the loader after the request completes
          $submitButton.prop("disabled", false).removeClass("loading");
        },
      });
    }
  });

  // Function to validate the form
  function validateForm() {
    let isValid = true;

    // Reset all error indicators
    $(
      ".form-body .form-input-field-error, .form-body .form-select-field-error"
    ).removeClass("form-input-field-error form-select-field-error");
    $(".form-error").hide();

    // Iterate through input fields and check for empty values
    $(".form-body input, .form-body select").each(function () {
      if ($(this).val().trim() === "") {
        isValid = false;
        // Add error class to the relevant fields
        if ($(this).is("input")) {
          $(this).addClass("form-input-field-error");
        } else if ($(this).is("select")) {
          $(this).addClass("form-select-field-error");
        }

        // Display error message for groups if any input in the group is empty
        showGroupError($(this));
      } else {
        isValid = true;
        // Add error class to the relevant fields
        if ($(this).is("input")) {
          $(this).removeClass("form-input-field-error");
        } else if ($(this).is("select")) {
          $(this).removeClass("form-select-field-error");
        }
      }
    });

    return isValid;
  }

  // Function to show group error message
  function showGroupError(field) {
    // Check for specific groups by their IDs or classes
    if (field.is("#first-name, #middle-name, #last-name")) {
      $("#name-group-error").show();
    } else if (field.is("#email")) {
      $("#email-group-error").show();
    } else if (field.is("#phone-number")) {
      $("#phone-group-error").show();
    } else if (field.is("#street-home-address, #area, #city", "#country")) {
      $("#address-group-error").show();
    } else if (field.is("#day, #month, #year")) {
      $("#birth-date-group-error").show();
    } else if (field.is("#gender")) {
      $("#gender-group-error").show();
    } else if (field.is("#select-your-course")) {
      $("#course-group-error").show();
    } else if (field.is("#preferred-time-for-online-sessions")) {
      $("#preferred-time-group-error").show();
    } else if (field.is("#profile-picture")) {
      $("#profile-picture-group-error").show();
    } else if (field.is("#personal-id")) {
      $("#personal-id-group-error").show();
    }
  }
});
