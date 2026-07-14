import useWindowStore from "#store/window.js"

const WindowControls = ({target, windowKey}) => {
  const {closeWindow} = useWindowStore();
  const key = target ?? windowKey;
  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(key) }/>
      <div className="minimize" />
      <div className="maximize" />
    </div>
  )
}

export default WindowControls;