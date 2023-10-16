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

            newMarkAsDoneButton.onclick = ((event) => {
                console.log(event)
                if(newMarkAsDoneButton.getAttribute('completed') === 'true') {
                    newMarkAsDoneButton.setAttribute('completed', 'false');
                    newMarkAsDoneButton.classList.remove('custom-mark-as-done-completed');
                    newMarkAsDoneButton.innerHTML = notCompletedContent
                }
                else{
                    newMarkAsDoneButton.setAttribute('completed', 'true');
                    newMarkAsDoneButton.classList.add('custom-mark-as-done-completed');
                    newMarkAsDoneButton.innerHTML = completedContent

                }
            })
            originalMarkAsDoneButton.parentNode.replaceChild(newMarkAsDoneButton, originalMarkAsDoneButton);

    },


}

})();

            //Rediger
            // let editButton = document.getElementsByClassName("btn edit-wiki")[0];
            //Publisert
            // let publishButton = document.getElementsByClassName("btn btn-published")[0];
            //Avpublisert
            // let unpublishButton = document.getElementsByClassName("btn btn-unpublished")[0];
            //Studentvisning
            // const studentViewButton = document.getElementById('easy_student_view');
