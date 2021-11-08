function NextArrow(props) {
  const { className, style, onClick, top, color } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: "50px",
        height: "50px",
        right: "-50px",
        top: top,
      }}
      onClick={onClick}
    >
      <img
        src={
          color === "red"
            ? require("../images/arrowRed.png").default
            : require("../images/arrowL.png").default
        }
        alt="arrowNext"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          right: "5px",
          top: "-10px",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

export default NextArrow;
