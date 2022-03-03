import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Slider from 'rn-range-slider';
import colors from '../../config/colors';
import { Block, Text } from '../AppTheme';
import Thumb from '../Slider/Thumb';
import Rail from '../Slider/Rail';
import RailSelected from '../Slider/RailSelected';
import Notch from '../Slider/Notch';
import Label from '../Slider/Label';
const PriceRangeSelector = ({ minValue, maxValue, onChange }) => {
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [min, setMin] = useState(minValue);
  const [max, setMax] = useState(maxValue);
  const [floatingLabel, setFloatingLabel] = useState(false);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
    onChange(low, high);
  }, []);
  return (
    <Block marginLeft={16} marginRight={16}>
      <Slider
        min={min}
        max={max}
        step={50}
        floatingLabel={floatingLabel}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
      <Text center bold>{`${low} - ${high}`}</Text>
    </Block>
  );
};

export default PriceRangeSelector;

const styles = StyleSheet.create({});
