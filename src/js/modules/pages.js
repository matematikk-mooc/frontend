
import util from './util';

export default (function() {
  function updateButtonText(container, input, label) {
    if (input.is(':checked')) {
      label.html('Marker som ulest');
      container.addClass('is-done');
    } else {
      label.html('Marker som lest');
      container.removeClass('is-done');
    }
  }
  function getHeaderBarJson() {
    var headerBarPosition = 'after';

    //Content page
    var headerBar = $(
      '#wiki_page_show > div.header-bar-outer-container > div > div.header-bar.flex-container > div.header-bar-right.header-right-flex'
    );

    //Quiz
    if (!headerBar.length) {
      headerBar = $('#quiz_show > div.header-bar > div');
    }
    //File
    if (!headerBar.length) {
      headerBar = $('#content');
      headerBarPosition = 'before';
    }
    var headerBarJson = { headerBar: headerBar, position: headerBarPosition };

    return headerBarJson;
  }

  function addButton(buttonHtml) {
    var headerBarJson = getHeaderBarJson();
    if (headerBarJson.headerBar.length) {
      if (headerBarJson.position == 'after') {
        headerBarJson.headerBar.append(buttonHtml);
      } else {
        headerBarJson.headerBar.before(buttonHtml);
      }
    } else {
      setTimeout(function() {
        addButton(buttonHtml);
      }, 500);
    }
  }

  return {
    modifyMarkAsDoneButton: function () {
      $('body').bind('wiki-page-rendered', function () {
        var container = $('#mark-as-done-container')
        container.appendTo('#content .usercontent')

        var input = container.find('input')
        var label = container.find('label')
        input.change(function () {
          updateButtonText(container, input, label)
        })

        updateButtonText(container, input, label)

        container.show()
      })
    },
    addStudentViewButton: function () {
      var buttonHtml = '<a class="btn admin-button" '
      buttonHtml +=
        'rel="nofollow" data-method="post" href="/courses/' +
        ENV.COURSE_ID +
        '/student_view">';
      buttonHtml += '<i class="icon-student-view"></i>Studentvisning</a>';
      addButton(buttonHtml);
    },
    removeItemsInStudentView: function () {
      const userIsStudent = !util.isTeacherOrAdmin()
      if (userIsStudent) {
        // Get the element with the ID "sticky-container"
        var adminNavigation = document.getElementById('sticky-container')
        // Check if the element is found
        if (adminNavigation) {
          // Remove the element from the DOM
          adminNavigation.parentNode.removeChild(adminNavigation)
        }
        var adminHeader = document.querySelector('.header-bar-outer-container')
        // Check if the element is found
        if (adminHeader) {
          // Remove the element from the DOM
          adminHeader.parentNode.removeChild(adminHeader)
        }
      }
    },
    createMarkAsDoneButtonClone: function (parent, markAsDoneButton) {
      let cloneButtonId = "mark-as-done-checkbox-clone"
      let oldMarkAsDoneButtonClone = document.getElementById(cloneButtonId)
      if (oldMarkAsDoneButtonClone) {
        oldMarkAsDoneButtonClone.remove()
      }

      let newMarkAsDoneButtonClone = markAsDoneButton.cloneNode(true)
      newMarkAsDoneButtonClone.setAttribute("id", cloneButtonId)
      parent.prepend(newMarkAsDoneButtonClone)
      newMarkAsDoneButtonClone.onclick = function () {
        markAsDoneButton.click()
      }
    },

  }
    
})();
