import {Paper} from "../components/panel/Panel.tsx";
import {Text} from "../components/typography/Typography.tsx";
import {lightJsTokens, tw} from 'nebula-ds-tokens'
import {CSSProperties} from "react";

type TailwindTokenKeys = keyof ReturnType<typeof tw.generateTailwindCompatibleTheme>

export const TokensPage = () => {
  return (
    <div className="flex w-full flex-col items-start gap-3">
      {Object.entries(tw.generateTailwindCompatibleTheme()).map(([containerKey, containerValue]) => (
        <>
          <Text component="h3" variant="header3">
            {containerKey}
          </Text>
          {Object.entries(containerValue).map(([tokenKey, tokenValue]) => (
            <Paper
              className="w-full"
              outline="50"
              round="xs"
              key={tokenKey}
            >
              <div className="w-full h-full items-center grid grid-cols-3">
                <Text component="h5" variant="header5" className="col-span-1">
                  {tokenKey}
                </Text>
                <Text component="p" variant="body1" className="col-span-1">
                  {tokenValue?.toString()}
                </Text>
                <TokenPreview
                  tokenType={containerKey as TailwindTokenKeys}
                  tokenKey={tokenKey as string}
                  tokenValue={tokenValue as string}
                />
              </div>
            </Paper>
          ))}
        </>
      ))}
    </div>
  )
}

const TokenPreview = (props: { tokenType: TailwindTokenKeys, tokenKey: string, tokenValue: string }) => {
  const {tokenType, tokenKey, tokenValue} = props;
  let style = {} as CSSProperties;
  const containerStyleDefault = {
    border: 'solid',
    borderWidth: lightJsTokens.nbBorder1,
    borderColor: lightJsTokens.nbBackgroundAccent200
  } as CSSProperties;
  let containerStyle = {...containerStyleDefault};
  let textStyle = {} as CSSProperties;

  switch (tokenType) {
    case 'colors':
      containerStyle = {border: 'none', padding: '2px 2px 2px 2px'};
      style = {backgroundColor: tokenValue};
      break;
    case 'spacing':
      containerStyle = {...containerStyle, padding: tokenValue};
      style = {backgroundColor: lightJsTokens.nbBackgroundAccent200};
      break;
    case 'fontFamily':
      textStyle = {fontFamily: tokenValue};
      break;
    case 'fontWeight':
      textStyle = {fontWeight: tokenValue};
      break;
    case 'lineHeight':
      textStyle = {lineHeight: tokenValue};
      break;
    case 'fontSize':
      textStyle = {fontSize: `${tokenValue}px`}; // Font sizes in pixels
      break;
    case 'letterSpacing': //todo: fix token's % value doesn't work
      textStyle = {letterSpacing: tokenValue};
      break;
    case 'borderWidth':
      containerStyle = {...containerStyle, borderWidth: `${tokenValue}`};
      break;
    case 'ringWidth':
      containerStyle = {...containerStyle, borderWidth: `${tokenValue}`};
      break;
    case 'borderRadius':
      containerStyle = {...containerStyle, borderRadius: `${tokenValue}`};
      break;
    case 'opacity':
      style = {opacity: tokenValue};
      break;
    case 'width':
      style = {width: tokenValue, backgroundColor: lightJsTokens.nbBackgroundAccent200};
      break;
    case 'height':
      style = {height: tokenValue};
      break;
    default:
      style = {};
  }

  return (
    <div className="overflow-hidden rounded-md w-full" style={containerStyle}>
      <div className="h-full w-full col-span-1 flex justify-center items-center overflow-hidden rounded-sm py-2"
           style={style}>
        <Text style={textStyle} variant="body3">{tokenType === 'letterSpacing' ? 'Token' : tokenKey}</Text>
      </div>
    </div>
  );
};
