import '../../vue/design/re-styles/buttons.scss';

export default (function () {
    return {
        replaceMarkAsDone: function () {

            const originalMarkAsDoneButton = document.querySelector('#mark-as-done-checkbox');

            if (!originalMarkAsDoneButton) {
              return;
            }

            const notCompletedContent = `<span class="mark-done-labels"><img src="${SERVER}vector_images/markasdone.svg"/><p>Merk som ferdig</p></span>`;
            const completedContent = `<span class="mark-done-labels"><img src="${SERVER}vector_images/markasdonecompleted.svg"/><p>Ferdig</p></span>`;

            const attributes = Array.from(originalMarkAsDoneButton.attributes).reduce((acc, attr) => {
              if (attr.name !== 'class') {
                acc[attr.name] = attr.value;
              }
              return acc;
            }, {});

            let newMarkAsDoneButton = document.createElement('button');
            newMarkAsDoneButton.classList.add('custom-button');
            newMarkAsDoneButton.classList.add('custom-mark-as-done-checkbox');

            for (const [attr, value] of Object.entries(attributes)) {
                newMarkAsDoneButton.setAttribute(attr, value);
                if(attr === 'data-is-checked' && value === 'true') {
                    newMarkAsDoneButton.classList.add('custom-mark-as-done-completed');
                    newMarkAsDoneButton.setAttribute('completed', 'true')
                    newMarkAsDoneButton.innerHTML =  completedContent
                }
                else if(attr === 'data-is-checked' && value === 'false') {
                    newMarkAsDoneButton.innerHTML = notCompletedContent
                }
            }

            newMarkAsDoneButton.onclick = (event) => {
                setTimeout(() => { //Setting timeout to allow Canvas to update their database before we update our UI
                  if (newMarkAsDoneButton.getAttribute('completed') === 'true') {
                    newMarkAsDoneButton.setAttribute('completed', 'false');
                    newMarkAsDoneButton.classList.remove('custom-mark-as-done-completed');
                    newMarkAsDoneButton.innerHTML = notCompletedContent;
                    newMarkAsDoneButton.setAttribute('style', "outline: unset !important;")
                  } else {
                    newMarkAsDoneButton.setAttribute('completed', 'true');
                    newMarkAsDoneButton.classList.add('custom-mark-as-done-completed');
                    newMarkAsDoneButton.innerHTML = completedContent;
                    newMarkAsDoneButton.setAttribute('style', "outline: unset !important;")
                  }
                }, 500); // Set the timeout duration in milliseconds (adjust as needed)
            };
            originalMarkAsDoneButton.parentNode.replaceChild(newMarkAsDoneButton, originalMarkAsDoneButton);

    },


}

})();
