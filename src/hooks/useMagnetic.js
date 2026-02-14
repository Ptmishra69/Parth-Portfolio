export default function useMagnetic() {

  const magneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    e.currentTarget.style.transform =
      `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const resetMagnetic = (e) => {
    e.currentTarget.style.transform = "translate(0px,0px)";
  };

  return { magneticMove, resetMagnetic };
}
