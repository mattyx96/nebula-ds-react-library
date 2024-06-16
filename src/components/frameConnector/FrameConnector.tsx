import {lightJsTokens} from "nebula-ds-tokens"

type BridgeProps = {
  className?: string
}

type NodeProps = {
  fill?: string
  className?: string
  hidden?: boolean
}

export type Props = {
  divider?: boolean
  vertical?: boolean
  className?: string
  bridge?: BridgeProps
  firstNode?: NodeProps
  secondNode?: NodeProps
}

export const FrameConnector = (props: Props) => {
  return (
    <div className={`flex ${props.vertical ? 'flex-col w-fit' : 'items-end flex-1'} ${props.className}`}>
      {props.firstNode?.hidden || props.divider ? <></> :
        <Node fill={props.firstNode?.fill || lightJsTokens.nbFrameBackgroundPrimary}
              className={`${props.vertical ? 'rotate-90 origin-center' : ''} scale-x-[-1] ${props.firstNode?.className}`}/>}
      <Bridge className={props.bridge?.className} vertical={!!props.vertical}/>
      {props.secondNode?.hidden || props.divider ? <></> :
        <Node fill={props.secondNode?.fill || lightJsTokens.nbFrameBackgroundPrimary}
              className={`${props.vertical ? 'rotate-90 origin-center' : ''} ${props.secondNode?.className}`}/>}
    </div>
  )
}

const Node = (props: { fill: string; className?: string }) => (
  <div className={`flex items-center justify-center ` + props.className}>
    <svg width="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M60 3.78963C60 1.56987 58.1925 -0.257305 55.9914 0.0298035C43.1529 1.70443 32.8081 11.3131 30.0386 23.7742C30.0336 23.7966 30 23.7935 30 23.7705V23.7705V23.7705C30 23.8917 29.9864 24.0125 29.9615 24.1312C29.5844 25.9293 29.3647 27.7853 29.3174 29.6841C29.3088 30.029 29.2729 30.374 29.1934 30.7097C26.0622 43.9325 14.18 53.7705 -2.67029e-05 53.7705H0.0999985C0.0447693 53.7705 0 53.8152 0 53.8705V59.6705C0 59.7257 0.0447731 59.7705 0.0999985 59.7705H52.9C52.9013 59.7705 52.9025 59.7704 52.9037 59.7704H55C57.7614 59.7704 60 57.5318 60 54.7704V3.78963Z"
            fill={props.fill}/>
    </svg>
  </div>
);

const Bridge = (props: { className?: string, vertical: boolean }) => (
  <div
    className={`${props.vertical ? 'h-full w-[6px]' : 'w-full h-[6px]'} bg-frame-background-primaryu ${props.className}`}/>
);
