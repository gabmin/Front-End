function PrevArrow(props) {
  const { className, style, onClick, top, color } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: "50px",
        height: "50px",
        left: "-70px",
        top: top,
        zIndex: "999",
      }}
      onClick={onClick}
    >
      <img
        src={
          color === "red"
            ? require("../images/arrowLRed.png").default
            : require("../images/arrowL.png").default
        }
        alt="arrowNext"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0px",
          top: "-10px",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

export default PrevArrow;
