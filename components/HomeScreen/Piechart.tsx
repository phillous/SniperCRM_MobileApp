import Colors from '@/constants/Colors';
import React, { useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { Circle, Text as SvgText, TSpan } from 'react-native-svg';

type SpendingItem = {
  productName: string;
  quantitySold: number;
  color: string;
};

type PieChartProps = {
  data: SpendingItem[];
  totalOrders: {
    cost: number;
    count: number;
  };
};

const PieChart = ({ data, totalOrders }: PieChartProps) => {
  const totalAmount = useMemo(() => {
    return data!.reduce((sum, item) => sum + item.quantitySold, 0);
  }, [data]);

  const screenWidth = Dimensions.get('screen').width;

  const size = screenWidth - 150;
  const strokeWidth = 25;
  const center = size / 2;
  const radius = (size + strokeWidth * 2) / 4;
  const circum = 2 * Math.PI * radius;

  const startingAngles = useMemo(() => {
    let angle = -90;
    const result: number[] = [];
    data.forEach((value) => {
      result.push(angle);
      const percent = totalAmount ? (value.quantitySold / totalAmount) * 360 : 0;
      angle += percent;
    });
    return result;
  }, [data, totalAmount]);

  //   const textWidth = 40;
  //   const textHeight = 40;
  //   const borderRadius = 8;

  //   const toRadians = (deg: number) => (deg * Math.PI) / 180;

  return (
    <View>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((spend, index) => {
          const percentage = Math.round((spend.quantitySold / totalAmount) * 100);
          const sweepAngle = (spend.quantitySold / totalAmount) * 360;
          const angle = startingAngles[index];
          const angleForText = angle + sweepAngle / 2;

          //   const textX =
          //     center + (radius + strokeWidth / 2 + 10) * Math.cos(toRadians(angleForText));
          //   const textY =
          //     center + (radius + strokeWidth / 2 + 10) * Math.sin(toRadians(angleForText));

          const strokeDashoffset = circum * (1 - percentage / 100);

          return (
            <React.Fragment key={index}>
              <Circle
                cx={center}
                cy={center}
                r={radius}
                stroke={data[index].color}
                strokeWidth={strokeWidth}
                strokeDasharray={circum}
                strokeDashoffset={strokeDashoffset}
                fill="transparent"
                strokeLinecap="butt"
                transform={`rotate(${angle}, ${center}, ${center})`}
              />
              {/* <Rect
                fill="#fff"
                x={textX - textWidth / 2}
                y={textY - textHeight / 2}
                height={textHeight}
                width={textWidth}
                rx={borderRadius}
              />
              <SvgText fill="#000" x={textX} y={textY + 5} fontSize={8} textAnchor="middle">
                {percentage}%
              </SvgText>
              <SvgText fill="#000" x={textX} y={textY + 20} fontSize={8} textAnchor="middle">
                {spend.label}
              </SvgText> */}
            </React.Fragment>
          );
        })}
        <SvgText
          fill={Colors.dark}
          x={center}
          y={center}
          fontSize={10}
          textAnchor="middle"
          fontWeight="normal"
          fontFamily="inter"
        >
          <TSpan x={center} dy={-10}>
            Total Orders
          </TSpan>
          <TSpan x={center} dy={12}>
            (Amount)
          </TSpan>
          <TSpan x={center} dy={20}>
            {totalOrders.cost.toLocaleString()}
          </TSpan>
        </SvgText>
      </Svg>
    </View>
  );
};

export default PieChart;
