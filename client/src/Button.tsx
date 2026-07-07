interface Props {
  buttonType: string;
  text: string;
  onClick: (item: string) => void;
}

function Button({ buttonType, text, onClick }: Props) {
  let buttonTypeMap = new Map<string, string>([
    ["Blue", "btn btn-primary"],
    ["Grey", "btn btn-secondary"],
    ["Green", "btn btn-success"],
    ["Red", "btn btn-danger"],
    ["Orange", "btn btn-warning"],
  ]);

  return (
    <button
      type="button"
      className={buttonTypeMap.get(buttonType)}
      key={text}
      onClick={() => {
        onClick(text);
      }}
    >
      {text}
    </button>
  );
}

export default Button;
