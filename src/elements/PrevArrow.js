function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: "50px",
        height: "50px",
        right: "-27px",
        top: "120px",
        zIndex: "999",
      }}
      onClick={onClick}
    >
      <img
        src={require("../images/arrowL.png").default}
        alt="arrowNext"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0px",
          top: "-10px",
          border: "1px solid rgb(197, 197, 197)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

export default PrevArrow;
