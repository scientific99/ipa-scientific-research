interface langBUttonProp {
  textValue: String;
}
function LangButton(props: langBUttonProp) {
  return (
    <div>
      <div className="mx-px my-1 flex w-[100px] cursor-pointer justify-center rounded-md bg-blue-100 p-2 text-center transition-colors duration-300 hover:bg-blue-200">
        <p className="text-lg font-medium text-[#1967d2]">{props.textValue}</p>
      </div>
    </div>
  );
}

export default LangButton;
