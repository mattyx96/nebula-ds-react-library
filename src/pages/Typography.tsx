import {Text} from "../components/typography/Typography.tsx";

const displayText = 'Lorem ipsum dolor';
const headerText = 'Lorem ipsum dolor sit amet consectetur';
const text = `Lorem ipsum dolor sit amet consectetur adipiscing elit sociis himenaeos, suscipit hac cum est aptent vitae etiam egestas mi, imperdiet nunc nisi netus lectus parturient convallis orci. Dignissim dis id massa commodo odio justo ad habitasse molestie primis, cubilia et vehicula malesuada convallis sodales nec cras purus eget nisi, venenatis velit dictum orci condimentum quis tincidunt litora diam.`;

export const TypographyPage = () => {
  return (
    <div className="flex flex-col gap-20 items-start max-w-full pb-20">
      <Text component="h1" variant="display1">display1: {displayText}</Text>
      <Text component="h1" variant="display1" text={displayText}/>
      <Text component="h2" variant="display2">display2: {displayText}</Text>
      <Text component="h1" variant="header1">header1: {headerText}</Text>
      <Text component="h2" variant="header2">header2: {headerText}</Text>
      <Text component="h3" variant="header3">header3: {headerText}</Text>
      <Text component="h4" variant="header4">header4: {headerText}</Text>
      <Text component="h5" variant="header5">header5: {headerText}</Text>
      <Text component="h6" variant="header6">header6: {headerText}</Text>
      <Text component="p" variant="body1">body1: {text}</Text>
      <Text component="p" variant="body2">body2: {text}</Text>
      <Text component="p" variant="body3">body3: {text}</Text>
      <Text component="p" variant="body4">body4: {text}</Text>
      <Text component="p" variant="body5">body5: {text}</Text>
      <Text component="span" variant="caption">caption: {headerText}</Text>
      <Text component="span" variant="button">button: {displayText}</Text>
    </div>
  );
}
