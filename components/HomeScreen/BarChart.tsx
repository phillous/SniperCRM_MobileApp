import Colors from '@/constants/Colors';
import React, { useEffect } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Line, Rect, Text as SvgText, TSpan } from 'react-native-svg';

type SpendingItem = {
  productName: string;
  quantitySold: number;
};

type BarChartProps = {
  data: SpendingItem[];
  CHART_HEIGHT: number;
  Y_AXIS_LABELS: number;
  BAR_WIDTH: number;
  typeColorsArray?: string[];
};

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const BarChart = ({ data, CHART_HEIGHT, Y_AXIS_LABELS, BAR_WIDTH }: BarChartProps) => {
  const { width: windowWidth } = useWindowDimensions();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const animatedHeights = React.useMemo(() => data.map(() => useSharedValue(0)), [data]);
  const maxValue = Math.max(...data.map((item) => item.quantitySold), 0);
  const BAR_SPACING =
    data.length === 3
      ? windowWidth * 0.16
      : data.length === 4
        ? windowWidth * 0.098
        : windowWidth * 0.06;
  const chartWidth = (BAR_WIDTH + BAR_SPACING) * data.length;

  useEffect(() => {
    // Reset all animations when data changes
    data.forEach((item, index) => {
      const targetHeight = (item.quantitySold / Math.max(maxValue, 1)) * CHART_HEIGHT;
      animatedHeights[index].value = withTiming(targetHeight, {
        duration: 1000,
      });
    });
  }, [data, maxValue, CHART_HEIGHT]); // Add all dependencies

  return (
    <View>
      <Svg height={CHART_HEIGHT + 60} width={chartWidth + 40}>
        {/* Y-axis lines and labels */}
        {[...Array(Y_AXIS_LABELS + 1)].map((_, i) => {
          const value = Math.floor(maxValue - (maxValue / Y_AXIS_LABELS) * i);
          const y = (CHART_HEIGHT / Y_AXIS_LABELS) * i;
          return (
            <React.Fragment key={i}>
              {/* Horizontal grid line */}
              <Line x1="30" y1={y} x2={chartWidth + 20} y2={y} stroke="#ccc" strokeWidth="0.5" />
              {/* Y-axis value label */}
              <SvgText x="12" y={y + 5} fontSize="10" fill="black">
                {value}
              </SvgText>
            </React.Fragment>
          );
        })}

        {/* Bars and x-axis labels */}
        {data.map((item, index) => {
          const x =
            data.length <= 3
              ? (chartWidth + 40 - BAR_WIDTH) / 2
              : 30 + index * (BAR_WIDTH + BAR_SPACING);

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const animatedProps = useAnimatedProps(() => {
            return {
              height: animatedHeights[index].value,
              y: CHART_HEIGHT - animatedHeights[index].value,
            };
          });

          return (
            <React.Fragment key={index}>
              {/* Bar */}
              <AnimatedRect
                x={x}
                width={BAR_WIDTH}
                animatedProps={animatedProps}
                fill={Colors.blue}
                rx={6}
              />
              {/* X-axis label */}
              <SvgText
                x={x + BAR_WIDTH / 2}
                y={CHART_HEIGHT + 15}
                fontSize="10"
                fill="black"
                textAnchor="middle"
              >
                {(() => {
                  const words = item.productName.split(' ');
                  if (words.length > 2) {
                    return (
                      <>
                        <TSpan x={x + BAR_WIDTH / 2} dy="0">
                          {words.slice(0, 2).join(' ')}
                        </TSpan>
                        <TSpan x={x + BAR_WIDTH / 2} dy="12">
                          {words.slice(2).join(' ')}
                        </TSpan>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <TSpan x={x + BAR_WIDTH / 2} dy="0">
                          {words.slice(0, 1).join(' ')}
                        </TSpan>
                        <TSpan x={x + BAR_WIDTH / 2} dy="12">
                          {words.slice(1).join(' ')}
                        </TSpan>
                      </>
                    );
                  }
                })()}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

export default BarChart;
