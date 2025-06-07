// components/GameUI.jsx
export default function GameUI() {
    return (
      <>
        <canvas className="game" />
  
        <div id="controls" className="absolute bottom-5 w-full flex justify-center items-end">
          <div className="grid grid-cols-3 gap-2">
            <button id="forward" className="col-span-3">▲</button>
            <button id="left">◀</button>
            <button id="backward">▼</button>
            <button id="right">▶</button>
          </div>
        </div>
  
        <div id="score" className="absolute top-5 left-5 text-white text-2xl">0</div>
  
        <div id="result-container" className="absolute w-full h-full top-0 flex justify-center items-center invisible">
          <div id="result" className="flex flex-col items-center bg-white p-5">
            <h1>Game Over</h1>
            <p>Your score: <span id="final-score"></span></p>
            <button id="retry" className="bg-red-500 px-10 py-5 font-[inherit] text-[inherit] cursor-pointer">
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }
  