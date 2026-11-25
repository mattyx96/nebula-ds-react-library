import { useEffect, useRef, useState } from 'react';

type Props = {
  /** Stroke color. Defaults to the theme's contrast color (`--nb-background-contrast-primary-500`), so lines stay visible in both themes. */
  color?: string;
  /** Number of lines. Default 15. */
  numLines?: number;
  /** Thickness of the first line in px. Default 13. */
  lineThickness?: number;
  /** Base gap between lines in px. Default 15. */
  distance?: number;
  /** Multiplier applied to the gap on each line. Default 1.2. */
  distanceGrowthFactor?: number;
  /** Multiplier applied to thickness on each line (lines get thinner). Default 0.9. */
  thicknessDecayFactor?: number;
  className?: string;
  /** Fixed height in px (defaults to the measured bounding box). */
  height?: number;
  /** Fixed width in px (defaults to the measured bounding box or container width). */
  width?: number;
  /** Draw the lines from the bottom up instead of the top down. */
  inverse?: boolean;
};

/**
 * Decorative SVG band of horizontal lines whose thickness and spacing decay,
 * evoking a receding horizon. Pure decoration — always pass
 * `aria-hidden="true"` when it carries no information. Theme-aware by
 * default; it re-fits on resize and prop changes.
 */
export const Horizon = ({
                          color = 'var(--nb-background-contrast-primary-500)',
                          numLines = 15,
                          lineThickness = 13,
                          distance = 15,
                          distanceGrowthFactor = 1.2,
                          thicknessDecayFactor = 0.9,
                          height,
                          width,
                          ...props
                        }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgWidth, setSvgWidth] = useState(1512); // default width

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
          d={`M0 ${yOffset}H${svgWidth}`}
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
        const currentSvgWidth = width || svgRef.current.clientWidth || (maxX - minX);

        if (svgRef.current) {
          svgRef.current.setAttribute('height', `${svgHeight}`);
          svgRef.current.setAttribute('width', `${currentSvgWidth}`);
        }

        setSvgWidth(currentSvgWidth); // Update state with the current SVG width
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', fitSvgPathElements);

    return () => {
      window.removeEventListener('resize', fitSvgPathElements);
    };
  }, []);

  useEffect(() => {
    fitSvgPathElements();
  }, [color, numLines, lineThickness, distance, distanceGrowthFactor, thicknessDecayFactor]);

  useEffect(() => {
    fitSvgPathElements(); // Initial call on load
  }, []);

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
