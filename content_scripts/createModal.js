function createModal(word, meaning, example) {

  word = word.trim().toLowerCase();
  meaning = meaning || '';
  example = example || '';

  let modal = document.createElement('div');
  modal.className = 'kz-overlay';

  let modalContent = document.createElement('div');
  modalContent.className = 'kz-modal-content';

  let wordField = document.createElement('input');
  wordField.value = word;
  wordField.className = 'kz-word-field';

  let meaningLabel = document.createElement('label');
  meaningLabel.className = 'kz-meaning-label';
  meaningLabel.setAttribute('for', 'kz-meaning-field');
  let meaningLabelText = document.createTextNode('Meaning');
  meaningLabel.appendChild(meaningLabelText);

  let meaningField = document.createElement('textarea');
  meaningField.placeholder = 'Enter a meaning';
  meaningField.maxLength = '5000';
  meaningField.className = 'kz-meaning-field';
  meaningField.id = 'kz-meaning-field'
  if (meaningField) meaningField.value = meaning;

  let exampleLabel = document.createElement('label');
  exampleLabel.className = 'kz-example-label';
  exampleLabel.setAttribute('for', 'kz-example-field');
  let exampleLabelText = document.createTextNode('Example');
  exampleLabel.appendChild(exampleLabelText);

  let exampleField = document.createElement('textarea');
  exampleField.placeholder = 'Enter an example';
  exampleField.maxLength = '5000';
  exampleField.className = 'kz-example-field';
  exampleField.id = 'kz-example-field';
  if (exampleField) exampleField.value = example;

  let closeButton = document.createElement('button');
  closeButton.className = 'kz-close-button';
  closeButton.onclick = () => modal.remove();

  let closeButtonIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  closeButtonIcon.setAttribute('width', '24');
  closeButtonIcon.setAttribute('height', '24');
  closeButtonIcon.setAttribute('viewBox', '0 0 24 24');

  let closeButtonIconPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
  closeButtonIconPath.setAttribute('fill', 'rgba(12, 12, 13, .8)');
  closeButtonIconPath.setAttribute('d', 'M5.293 6.707a1 1 0 1 1 1.414-1.414L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707z');
  closeButtonIcon.appendChild(closeButtonIconPath);
  closeButton.appendChild(closeButtonIcon)

  let addButton = document.createElement('button');
  addButton.className = 'kz-add-button';
  addButton.onclick = function() {
    if (wordField.value) {
      unwrapWord(wordField.value);
      addWord(wordField.value, meaningField.value, exampleField.value);
      modal.remove();
      wrapWord(wordField.value);
      browser.storage.local.get().then((dict) => Object.keys(dict).forEach(word => createTooltip(word, dict[word].meaning, dict[word].example));
    } else {
      alert("Word field couldn't be empty!")
    };
  }

  let addButtonText = document.createTextNode('Done')
  addButton.appendChild(addButtonText);
  modalContent.appendChild(wordField);
  modalContent.appendChild(meaningLabel);
  modalContent.appendChild(meaningField);
  modalContent.appendChild(exampleLabel);
  modalContent.appendChild(exampleField);
  modalContent.appendChild(addButton);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  wordField.focus();
}
