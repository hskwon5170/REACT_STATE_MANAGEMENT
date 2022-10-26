export function Species(props) {
  return (
    <li>
      {props.name}
      <ul>
        <li>language: {props.language}</li>
        <li>average lifespan: {props.averageLifespan}</li>
      </ul>
    </li>
  );
}
