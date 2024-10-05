const Segmento = ({ d, index, isSelected, onClick }) => {
  return (
    <path
      d={d}
      fill={isSelected ? 'orange' : 'white'}
      stroke="black"
      strokeWidth="2"
      onClick={() => onClick(index)}
    />
  );
};