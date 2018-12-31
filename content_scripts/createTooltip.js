function createTooltip(word, meaning, example) {
  tippy(`.kz-${word.trim().replace(/\s/g, '_')}`, {
    content: function() {

      let tooltip = document.createElement('div');
      tooltip.className = 'kz-tooltip';

      let editButton = document.createElement('button');
      editButton.className = 'kz-tooltip__edit-button';
      editButton.onclick = () => createModal(word, meaning, example);
      let editButtonIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      let editButtonIconPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      editButtonIconPath.setAttribute("d", "M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z");
      editButtonIconPath.setAttribute("fill", "rgba(12, 12, 13, 0.8)");
      editButtonIcon.setAttribute("viewBox", "0 1 13 15");
      editButtonIcon.setAttribute("width", "16");
      editButtonIcon.setAttribute("height", "16");
      editButtonIcon.appendChild(editButtonIconPath);
      editButton.appendChild(editButtonIcon);
      tooltip.appendChild(editButton)

      let trashButton = document.createElement('button');
      trashButton.className = 'kz-tooltip__trash-button';
      trashButton.onclick = () => {
        unwrapWord(word);
        browser.storage.local.remove(word);
      }
      let trashButtonIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      let trashButtonIconPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      //trashButtonIconPath.setAttribute("d", "M20 5h-5a3 3 0 1 0-6 0H4a1 1 0 0 0 0 2h1v12a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7h1a1 1 0 1 0 0-2zm-8-2a2 2 0 0 1 2 2h-4a2 2 0 0 1 2-2zM7 7v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7H7zm2.539 2.002a.5.5 0 0 0-.503.498l-.034 8a.5.5 0 0 0 1 .004l.034-8a.5.5 0 0 0-.497-.502zm4.497.498a.5.5 0 0 1 1 .004l-.034 8a.5.5 0 0 1-1-.004l.034-8zM12 9.002a.5.5 0 0 0-.502.498l-.034 8a.5.5 0 0 0 1 .004l.034-8A.5.5 0 0 0 12 9.002z");
      trashButtonIconPath.setAttribute("d", "M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z");
      trashButtonIconPath.setAttribute("fill", "rgba(12, 12, 13, 0.8)");
      trashButtonIconPath.setAttribute("fill-rule", "evenodd");
      trashButtonIconPath.setAttribute("clip-rule", "evenodd");
      trashButtonIcon.setAttribute("viewBox", "0 0 14 16");
      trashButtonIcon.setAttribute("width", "16");
      trashButtonIcon.setAttribute("height", "16");
      trashButtonIcon.appendChild(trashButtonIconPath);
      trashButton.appendChild(trashButtonIcon);
      tooltip.appendChild(trashButton)

      let wordSpan = document.createElement('span');
      wordSpan.className = 'kz-tooltip__word-span';
      let wordSpanText = document.createTextNode(word);
      wordSpan.appendChild(wordSpanText);
      tooltip.appendChild(wordSpan);

      if (meaning.replace(/\s/g, '').length) {
        meaning = meaning.trim();
        let meaningSpan = document.createElement('span');
        meaningSpan.className = 'kz-tooltip__meaning-span';
        let meaningSpanText = document.createTextNode(': ' + meaning);
        meaningSpan.appendChild(meaningSpanText);
        tooltip.appendChild(meaningSpan)
      }

      if (example.replace(/\s/g, '').length) {
        example = example.trim();
        let exampleSpan = document.createElement('span');
        exampleSpan.className = 'kz-tooltip__example-span';
        let exampleSpanText = document.createTextNode('For example: «' + example + '»');
        exampleSpan.appendChild(exampleSpanText);
        tooltip.appendChild(exampleSpan)
      }

      return tooltip;

    },

    duration: [0, 400],
    interactive: true,
    placement: "right",
    arrow: true,
    arrowTransform: "scaleX(2)",
    theme: "light",
    touch: true

  });
}
