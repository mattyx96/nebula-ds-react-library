const displayText = 'Lorem ipsum dolor';
const headerText = 'Lorem ipsum dolor sit amet consectetur';
const text = `Lorem ipsum dolor sit amet consectetur adipiscing elit sociis himenaeos, suscipit hac cum est aptent vitae etiam egestas mi, imperdiet nunc nisi netus lectus parturient convallis orci. Dignissim dis id massa commodo odio justo ad habitasse molestie primis, cubilia et vehicula malesuada convallis sodales nec cras purus eget nisi, venenatis velit dictum orci condimentum quis tincidunt litora diam.`;

export const TypographyPage = () => {
  return (
    <div className="flex flex-col gap-20 items-start max-w-full pb-20">
      <h1>h1: {displayText}</h1>
      <h2>h2: {displayText}</h2>
      <h3>h3: {headerText}</h3>
      <h4>h4: {headerText}</h4>
      <h5>h5: {headerText}</h5>
      <h6>h6: {headerText}</h6>
      <p>p: {text}</p>
      <span>span: {text}</span>
      <p><small>p - small: {text}</small></p>
      <small>small: {text}</small>
    </div>
  );
}
