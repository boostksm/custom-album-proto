const SongCredits = ({ credits }) => {
  return (
    <ul>
      {Object.entries(credits).map(([key, value]) => (
        <li key={key}>
          {key} : {value}
        </li>
      ))}
    </ul>
  );
};

export default SongCredits;
