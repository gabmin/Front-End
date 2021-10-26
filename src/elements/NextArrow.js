function NextArrow(props) {
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
      }}
      onClick={onClick}
    >
      <img
        src={require("../images/arrow.png").default}
        alt="arrowNext"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          right: "5px",
          top: "-10px",
          border: "1px solid rgb(197, 197, 197)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

export default NextArrow;
