import {lightJsTokens} from "nebula-ds-tokens"

type Size = 'M' | 'L' | 'S'

type BridgeProps = {
  size?: Size
  className?: string
}

type NodeProps = {
  fill?: string
  className?: string
  size?: Size
  hidden?: boolean
}

export type Props = {
  divider?: boolean
  vertical?: boolean
  className?: string
  size?: Size
  bridge?: BridgeProps
  firstNode?: NodeProps
  secondNode?: NodeProps
}

export const FrameConnector = (props: Props) => {
  const size = props.size || 'M'

  return (
    <div className={`flex ${props.vertical ? 'flex-col w-fit' : 'items-end flex-1'} ${props.className}`}>
      {props.firstNode?.hidden || props.divider
        ? <></>
        : <FrameConnectorNode
          size={props.firstNode?.size || size}
          fill={props.firstNode?.fill || lightJsTokens.nbFrameBackgroundPrimary}
          className={`${props.vertical ? 'rotate-90 origin-center' : ''} scale-x-[-1] ${props.firstNode?.className}`}
        />
      }

      <FrameConnectorBridge className={props.bridge?.className} vertical={!!props.vertical} size={props.bridge?.size || size}/>

      {props.secondNode?.hidden || props.divider
        ? <></>
        : <FrameConnectorNode
          size={props.secondNode?.size || size}
          fill={props.secondNode?.fill || lightJsTokens.nbFrameBackgroundPrimary}
          className={`${props.vertical ? 'rotate-90 origin-center' : ''} ${props.secondNode?.className}`}
        />}
    </div>
  )
}

export const FrameConnectorNode = (props: NodeProps) => (
  <div className={`flex items-center justify-center ` + props.className}>
    {props.size === 'M' && <svg width="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M60 3.78963C60 1.56987 58.1925 -0.257305 55.9914 0.0298035C43.1529 1.70443 32.8081 11.3131 30.0386 23.7742C30.0336 23.7966 30 23.7935 30 23.7705V23.7705V23.7705C30 23.8917 29.9864 24.0125 29.9615 24.1312C29.5844 25.9293 29.3647 27.7853 29.3174 29.6841C29.3088 30.029 29.2729 30.374 29.1934 30.7097C26.0622 43.9325 14.18 53.7705 -2.67029e-05 53.7705H0.0999985C0.0447693 53.7705 0 53.8152 0 53.8705V59.6705C0 59.7257 0.0447731 59.7705 0.0999985 59.7705H52.9C52.9013 59.7705 52.9025 59.7704 52.9037 59.7704H55C57.7614 59.7704 60 57.5318 60 54.7704V3.78963Z"
            fill={props.fill}/>
    </svg>}

    {props.size === 'S' &&
      <svg width="44" viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M43.5 1.63276C43.5 0.731013 42.769 0 41.8672 0C30.896 0 22.002 8.89396 22.002 19.8652V21.7336C22.002 22.0226 21.9614 22.3108 21.8742 22.5863C19.2457 30.8903 12.2732 37.2627 3.62405 39.0358C3.43745 39.0741 3.2468 39.0918 3.05632 39.0918H0.599918C0.544689 39.0918 0.49992 39.1366 0.49992 39.1918V42.9C0.49992 42.9553 0.544693 43 0.599918 43H35.358C35.3867 43 35.415 42.9907 35.4437 42.9907H40.5C42.1569 42.9907 43.5 41.6476 43.5 39.9907V1.63276ZM22.002 38.9958C22.002 39.0488 21.9591 39.0918 21.9061 39.0918H21.8997C21.8047 39.0918 21.7655 38.96 21.8406 38.9017C21.9048 38.8517 22.002 38.8962 22.002 38.9776V38.9958Z"
              fill={props.fill}/>
      </svg>
    }

    {props.size === 'L' &&
      <svg width="76" viewBox="0 0 76 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M75.5 3.88463C75.5 1.73921 73.7608 0 71.6154 0C51.4851 0 35.161 16.296 35.1155 36.4157V33C35.1155 49.5685 21.684 63 5.11549 63H0.600098C0.544861 63 0.500092 63.0448 0.500092 63.1V69.9C0.500092 69.9552 0.544868 70 0.600098 70H35.0155C35.0692 70 35.1131 69.9576 35.1154 69.9044C35.1154 69.9572 35.1582 70 35.211 70H70.5C73.2614 70 75.5 67.7614 75.5 65V3.88463ZM35.1154 63.0956C35.1131 63.0424 35.0692 63 35.0155 63H35.0198C35.0726 63 35.1154 63.0428 35.1154 63.0956Z"
              fill={props.fill}/>
      </svg>
    }
  </div>
);

const FrameConnectorBridge = (props: BridgeProps & { vertical?: boolean; size?: Size }) => {
  const size = props.size || 'M'
  const classesW: Record<Size, string> = {
    S: 'w-[4px]',
    M: 'w-[6px]',
    L: 'w-[7px]',
  }
  const classesH: Record<Size, string> = {
    S: 'h-[4px]',
    M: 'h-[6px]',
    L: 'h-[7px]',
  }
  return (
    <div
      className={`${props.vertical ? `h-full flex-1 ${classesW[size]}` : `w-full ${classesH[size]}`} bg-frame-background-primary ${props.className}`}
    />
  )
};
