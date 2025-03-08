import * as am5 from "@amcharts/amcharts5";
import { IGradientStop } from "@amcharts/amcharts5/.internal/core/render/backend/Renderer";

export interface LineChartRenderProps {
  opposite?: boolean;
  gridVisible?: boolean;
  yStroke?: am5.Color;
  strokeDasharray?: number | number[];
  strokeOpacity?: number;
  min?: number;
  max?: number;
  numberFormat?: string;
  yFill?: am5.Color;
  yFontSize?: string | number;
  yVisible?: boolean;
  boundschanged?: number;
  sName?: string;
  sStacked?: boolean;
  valueYField?: string;
  categoryXField?: string;
  sFill?: am5.Color;
  sStroke?: am5.Color;
  tooltip?: string;
  fillOpacity?: number[];
  fillVisible?: boolean;
  fillRotation?: number;
  strokeWidth?: number;
}

export interface RoundedLineSeriesProps {
  fontSize?: string | number;
  opposite?: boolean;
  gridVisible?: boolean;
  min?: number;
  max?: number;
  numberFormat?: string;
  name?: string;
  valueYField?: string;
  yStroke?: am5.Color;
  strokeDasharray?: number | number[];
  strokeOpacity?: number;
  yFill?: am5.Color;
  yVisible?: boolean;
  categoryXField?: string;
  stroke?: am5.Color;
  fill?: am5.Color;
  fillOpacity?: number[];
  strokeWidth?: number;
  rotation?: number;
  boundschanged?: number;
  tooltip?: string;
}

export interface ColumnSeriesProps {
  fontSize?: string | number;
  opposite?: boolean;
  gridVisible?: boolean;
  min?: number;
  max?: number;
  numberFormat?: string;
  name?: string;
  valueYField: string;
  yStroke?: am5.Color;
  strokeDasharray?: number | number[];
  colWidth?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowBlur?: number;
  cornerRadiusTL?: number;
  cornerRadiusTR?: number;
  cornerRadiusBL?: number;
  cornerRadiusBR?: number;
  strokeOpacity?: number;
  strokeWidth?: number;
  yFill?: am5.Color;
  yVisible?: boolean;
  categoryXField?: string;
  stroke?: am5.Color;
  fill?: am5.Color;
  fillOpacity?: number[];
  rotation?: number;
  boundschanged?: number;
  fillProps?: {
    stops?: IGradientStop[];
    rotation?: number;
    fillPattern?: am5.ILinePatternSettings;
  };
  tooltip?: string;
}

export interface ColumnLineSeriesProps {
  isLineSeries: boolean;
  isSmoothLineSeries?: boolean;
  fontSize?: string | number;
  opposite?: boolean;
  gridVisible?: boolean;
  min?: number;
  max?: number;
  numberFormat?: string;
  name?: string;
  valueYField: string;
  yStroke?: am5.Color;
  strokeDasharray?: number | number[];
  colWidth?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowBlur?: number;
  cornerRadiusTL?: number;
  cornerRadiusTR?: number;
  cornerRadiusBL?: number;
  cornerRadiusBR?: number;
  strokeOpacity?: number;
  strokeWidth?: number;
  yFill?: am5.Color;
  yVisible?: boolean;
  categoryXField?: string;
  stroke?: am5.Color;
  fill?: am5.Color;
  fillProps?: {
    stops?: IGradientStop[];
    rotation?: number;
    fillPattern?: am5.ILinePatternSettings;
  };
  rotation?: number;
  boundschanged?: number;
  tooltip?: string;
}

export interface RadarLabel {
  text: string;
  fontSize: number | string;
  fontWeight?:
    | "normal"
    | "bold"
    | "bolder"
    | "lighter"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | undefined;
  x: number;
  y: number;
}

export interface RadarBullet {
  radius: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  text: string;
  centerX: number;
}

export interface RadarChartItemValue {
  itemValue: number;
  color: string;
  visible: boolean;
  fillOpacity: number;
  cornerRadius: number;
  bullet?: RadarBullet;
}

export interface RadarChartCreator {
  startValue: number;
  endValue: number;
  color: string;
  visible: boolean;
  fillOpacity: number;
  cornerRadius: number;
  bullet?: RadarBullet;
}

export interface RadarChartProps {
  xRadius: number;
  xInnerRadius: number;
  chartCenterY: number;
  labels: RadarLabel[];
  xStrokeOpacity: number;
  xStartAngle: number;
  xEndAngle: number;
  ticksVisible: boolean;
  ticksStrokeOpacity: number;
  gridVisible: boolean;
  labelsVisible: boolean;
  itemValues: RadarChartItemValue[];
}
