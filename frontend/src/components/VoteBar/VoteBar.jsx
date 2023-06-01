import { useEffect } from 'react';
import './VoteBar.css';
import $ from 'jquery';

function VoteBar() {
  function dragHandle(handle) {
    var pos1 = 0,
      pos3 = 0;
    var newValue = parseInt(handle.css('marginLeft'));

    handle.on('mousedown', dragMouseDown);

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos3 = e.clientX;
      // set the element's new position:
      newValue = parseInt(handle.css('marginLeft')) - pos1;
      console.log(newValue);
      if ((newValue >= 0) & (newValue <= 196)) {
        handle.css(
          'margin-left',
          parseInt(handle.css('marginLeft')) - pos1 + 'px'
        );
      }
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  useEffect(() => {
    dragHandle($('#vote-bar-handle'));
  });

  return (
    <div className="vote-bar-container">
      <div className="vote-bar-outside">
        <div className="vote-bar-inside">
          <div className="vote-bar-handle" id="vote-bar-handle"></div>
        </div>
      </div>
    </div>
  );
}

export default VoteBar;
