import React, {useRef, useEffect, useState} from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

export interface AnimatedBoxProps {
  height: number;
  width: number;
  strokeWidth: number;
  strokeColor: string;
  children: React.ReactNode;
  animationDuration?: number;
  /** Defaults to false */
  hideAnimation?: boolean;
}

/**
 * Creates an animated stroke around children.
 *
 * Future improvement would be to dynamically determine the height and width of the children
 *
 * @param param0
 * @returns
 */
export const AnimatedBox = ({
  height,
  width,
  strokeWidth,
  strokeColor,
  children,
  animationDuration = 2000,
  hideAnimation = false,
}: AnimatedBoxProps) => {
  const pathRef = useRef<Path | null>(null);
  const [pathLength, setPathLength] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const pathElement = pathRef.current;
    const length = pathElement?.getTotalLength();
    if (length) {
      setPathLength(length);
    }
  }, [pathRef]);

  useEffect(() => {
    const animate = () => {
      setAnimationProgress(prevProgress => (prevProgress + 1) % 100);
    };

    const interval = setInterval(animate, animationDuration / 100);

    return () => clearInterval(interval);
  }, [animationDuration]);

  if (hideAnimation) {
    return children;
  }

  return (
    <Svg width={width} height={height}>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="transparent"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <Path
        ref={pathRef}
        d={`M 0 0 h ${width} v ${height} h -${width} v -${height} z`}
        stroke="transparent"
        strokeDasharray={`${pathLength}, ${pathLength}`}
        strokeDashoffset={pathLength * (1 - animationProgress / 100)}
      />
      {children}
    </Svg>
  );
};
