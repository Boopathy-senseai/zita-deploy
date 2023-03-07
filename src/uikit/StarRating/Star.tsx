type Props = {
  starId: number;
  marked: boolean;
};
const Star = ({ starId, marked }: Props) => {
  return (
    <span
      data-star-id={starId}
      role="button"
      style={{ color: '#ff9933', cursor: 'pointer', fontSize: 32 }}
    >
      {marked ? '\u2605' : '\u2606'}
    </span>
  );
};

export default Star;
