import { useContext, useEffect, useState } from 'react';
import './VoteBar.css';
import $ from 'jquery';
import {
  HomeContext,
  HomeDispatchContext,
} from '../../contexts/HomeContext.js';

function VoteBar(data) {
  const state = useContext(HomeContext);
  const dispatch = useContext(HomeDispatchContext);

  function dragHandle(handle) {
    var pos1 = 0,
      pos2 = 0;
    var newValue = parseInt(handle.css('marginLeft'));
    var lastValue = newValue;

    handle.on('mousedown', dragMouseDown);

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos2 = e.clientX;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function getGradient(pos){
      if (pos < 50){
        'linear-gradient(to right, #63050a, rgb(255,255,0))'
      }
      else if (pos < 100){
        'linear-gradient(to right, #63050a, rgb(255,255,0), rgb(0,255,0))'
      }
      else if (pos < 150){
        'linear-gradient(to right, #63050a, rgb(255,255,0))'
      }
      else {
        'linear-gradient(to right, #63050a, rgb(255,255,0), rgb(0,255,0))'
      }
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos2 - e.clientX;
      pos2 = e.clientX;
      newValue = parseInt(handle.css('marginLeft')) - pos1;
      if ((newValue >= 0) & (newValue <= 196)) {
        lastValue = newValue;
        handle.css(
          'margin-left',
          parseInt(handle.css('marginLeft')) - pos1 + 'px'
        );
        
        $("#vote-bar-inside").css(
          'background-image',
          (newValue < 50 ?
            'linear-gradient(to right, #63050a, rgb(255,255,0))'
          : (newValue < 100 ?
            'linear-gradient(to right, #63050a, rgb(255,255,0), rgb(0,255,0))'
          : (newValue < 150 ?
            'linear-gradient(to right, #63050a, rgb(255,255,0))'
          :
            'linear-gradient(to right, #63050a, rgb(150,150,0), rgb(0,100,0))'
          )))
        )

        console.log(getGradient(newValue))

        data.setLiveVote(Math.floor((lastValue / 196) * 9 + 1) / 2);
      }
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/

      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  useEffect(() => {
    if (state.movieCustomDetails.like === 0) {
      $('#vote-bar-handle').css('margin-left', '0px');
      data.setLiveVote(0.5);
    } else {
      const vote = state.movieCustomDetails.like;
      const margin = ((vote * 2 - 1) / 10) * 196 + 'px';
      $('#vote-bar-handle').css('margin-left', margin);
    }
    dragHandle($('#vote-bar-handle'));
  }, []);
  const calculatedMargin = ((data.liveVote * 2 - 1) / 10) * 196 + 'px';

  return (
    <div className="vote-bar-container">
      <div className="vote-bar-outside">
        <div id="vote-bar-inside" className="vote-bar-inside">
          <div
            className="vote-bar-handle"
            id="vote-bar-handle"
            style={{ marginLeft: { calculatedMargin } }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default VoteBar;
