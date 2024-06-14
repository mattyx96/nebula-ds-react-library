import {useEffect, useRef} from 'react';

type Props = {
  color?: string;
  numLines?: number;
  lineThickness?: number;
  distance?: number;
  distanceGrowthFactor?: number;
  thicknessDecayFactor?: number;
  className?: string;
  height?: number;
  width?: number;
  inverse?: boolean;
};

export const Horizon = ({
                          color = '#000',
                          numLines = 55,
                          lineThickness = 10,
                          distance = 10,
                          distanceGrowthFactor = 1.05,
                          thicknessDecayFactor = 0.95,
                          height,
                          width,
                          ...props
                        }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const generatePaths = () => {
    const paths = [];
    let yOffset, currentThickness;

    if (props.inverse) {
      yOffset = (distance + distanceGrowthFactor) * (numLines - 1);
      currentThickness = lineThickness;
    } else {
      yOffset = 0;
      currentThickness = lineThickness;
    }

    for (let i = 0; i < numLines; i++) {
      paths.push(
        <path
          key={i}
          d={`M0 ${yOffset}H1512`}
          stroke={color}
          strokeWidth={currentThickness}
        />
      );

      if (props.inverse) {
        yOffset -= distance + distanceGrowthFactor; // Decrease the distance with growth factor
      } else {
        yOffset += distance + distanceGrowthFactor; // Increase the distance with growth factor
      }
      currentThickness *= thicknessDecayFactor; // Decrease the thickness
    }

    return paths;
  };

  const fitSvgPathElements = () => {
    if (svgRef.current) {
      const pathElements = svgRef.current.querySelectorAll('path');
      if (pathElements.length > 0) {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        pathElements.forEach((pathElement) => {
          const pathBox = pathElement.getBBox();
          minX = Math.min(minX, pathBox.x);
          minY = Math.min(minY, pathBox.y);
          maxX = Math.max(maxX, pathBox.x + pathBox.width);
          maxY = Math.max(maxY, pathBox.y + pathBox.height);
        });

        const svgHeight = height || (maxY - minY);
        const svgWidth = width || (maxX - minX);

        if (svgRef.current) {
          svgRef.current.setAttribute('height', `${svgHeight}`);
          svgRef.current.setAttribute('width', `${svgWidth}`);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('load', fitSvgPathElements);
    window.addEventListener('resize', fitSvgPathElements);

    return () => {
      window.removeEventListener('load', fitSvgPathElements);
      window.removeEventListener('resize', fitSvgPathElements);
    };
  }, []);

  useEffect(() => {
    fitSvgPathElements();
  }, [color, numLines, lineThickness, distance, distanceGrowthFactor, thicknessDecayFactor]);

  return (
    <svg
      ref={svgRef}
      className={props.className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {generatePaths()}
    </svg>
  );
};
